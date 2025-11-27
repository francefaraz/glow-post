const fetch = require('node-fetch');

async function generateText({ prompt, model = 'gpt-4o-mini', max_tokens = 200 }) {
  // Check if OpenAI API key is configured
  if (!process.env.OPENAI_API_KEY) {
    console.warn('OPENAI_API_KEY not found in environment variables. Using mock response.');
    return { text: `Mock response for prompt: ${prompt}\n\n[Note: Add OPENAI_API_KEY to .env file to enable real AI generation]` };
  }

  try {
    const resp = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
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
  } catch (error) {
    console.error('OpenAI API Error:', error.message);
    throw error;
  }
}

module.exports = { generateText };
