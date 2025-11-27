const fetch = require('node-fetch');

// Detect API key type
function detectApiKeyType(apiKey) {
  if (!apiKey) return null;
  if (apiKey.startsWith('sk-')) return 'openai';
  if (apiKey.startsWith('AIza')) return 'gemini';
  return 'unknown';
}

// Generate using OpenAI
async function generateWithOpenAI({ prompt, model = 'gpt-4o-mini', max_tokens = 200, apiKey }) {
  const resp = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model,
      messages: [{ role: 'user', content: prompt }],
      max_tokens
    })
  });

  if (!resp.ok) {
    const errorData = await resp.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `OpenAI API error: ${resp.status} ${resp.statusText}`);
  }

  const data = await resp.json();
  const text = data?.choices?.[0]?.message?.content || data?.choices?.[0]?.text;
  
  if (!text) {
    throw new Error('No content generated from OpenAI');
  }

  return { text, raw: data };
}

// Generate using Google Gemini
async function generateWithGemini({ prompt, apiKey }) {
  // Try different Gemini models in order
  const models = ['gemini-pro', 'gemini-1.5-pro', 'gemini-1.5-flash-latest', 'gemini-1.0-pro'];
  
  for (const model of models) {
    try {
      console.log(`Trying Gemini model: ${model}...`);
      
      // Try v1beta API first
      let url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      
      let resp = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        })
      });

      // If v1beta fails, try v1 API
      if (!resp.ok && resp.status === 404) {
        console.log(`Model ${model} not found in v1beta, trying v1...`);
        url = `https://generativelanguage.googleapis.com/v1/models/${model}:generateContent?key=${apiKey}`;
        resp = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: prompt
              }]
            }]
          })
        });
      }

      if (!resp.ok) {
        const errorData = await resp.json().catch(() => ({}));
        const errorMsg = errorData.error?.message || `Gemini API error: ${resp.status} ${resp.statusText}`;
        console.log(`Model ${model} failed: ${errorMsg}`);
        continue; // Try next model
      }

      const data = await resp.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (!text) {
        console.log(`Model ${model} returned no text`);
        continue; // Try next model
      }

      console.log(`Successfully generated with model: ${model}`);
      return { text, raw: data };
    } catch (error) {
      console.log(`Model ${model} error: ${error.message}`);
      continue; // Try next model
    }
  }
  
  // If all models fail, throw error
  throw new Error('All Gemini models failed. Please check your API key and model availability.');
}

async function generateText({ prompt, model = 'gpt-4o-mini', max_tokens = 200 }) {
  const apiKey = process.env.OPENAI_API_KEY;
  
  // Check if API key is configured
  if (!apiKey) {
    console.warn('OPENAI_API_KEY not found in environment variables. Using mock response.');
    return { text: `Mock response for prompt: ${prompt}\n\n[Note: Add OPENAI_API_KEY to .env file to enable real AI generation]` };
  }

  // Detect API key type
  const keyType = detectApiKeyType(apiKey);
  console.log(`Detected API key type: ${keyType}`);

  try {
    if (keyType === 'openai') {
      console.log('Using OpenAI API...');
      return await generateWithOpenAI({ prompt, model, max_tokens, apiKey });
    } else if (keyType === 'gemini') {
      console.log('Using Google Gemini API...');
      return await generateWithGemini({ prompt, apiKey });
    } else {
      // Try OpenAI first, then fallback to Gemini
      console.log('Unknown key type, trying OpenAI first...');
      try {
        return await generateWithOpenAI({ prompt, model, max_tokens, apiKey });
      } catch (openaiError) {
        console.log('OpenAI failed, trying Gemini...');
        return await generateWithGemini({ prompt, apiKey });
      }
    }
  } catch (error) {
    console.error(`API Error (${keyType || 'unknown'}):`, error.message);
    throw error;
  }
}

module.exports = { generateText };
