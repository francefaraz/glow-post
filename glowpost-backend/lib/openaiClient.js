const fetch = require('node-fetch');

async function generateText({ prompt, model = 'gpt-4o-mini', max_tokens = 200 }) {
  if (!process.env.OPENAI_API_KEY) {
    return { text: `Mock response for prompt: ${prompt}` };
  }
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
  const data = await resp.json();
  const text = data?.choices?.[0]?.message?.content || data?.choices?.[0]?.text || JSON.stringify(data);
  return { text, raw: data };
}

module.exports = { generateText };
