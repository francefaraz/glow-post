const express = require('express');
const { generateText } = require('../lib/openaiClient');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { topic = '', tone = 'Friendly', keywords = '' } = req.body;
    const prompt = `Create a short, engaging social media post. Topic: ${topic}. Tone: ${tone}. Keywords: ${keywords}. Keep it short and high-converting.`;
    const result = await generateText({ prompt });
    res.json({ result: result.text });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
