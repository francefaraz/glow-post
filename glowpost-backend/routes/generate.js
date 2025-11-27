const express = require('express');
const { generateText } = require('../lib/openaiClient');
const supabase = require('../lib/supabase');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { topic = '', tone = '', keywords = '' } = req.body;
    
    // Fetch brand settings to enhance the prompt
    let brandSettings = null;
    try {
      const { data } = await supabase.from('brand_settings').select().limit(1).single();
      brandSettings = data;
    } catch (e) {
      // Brand settings not found, continue without them
    }
    
    // Use brand settings if available, otherwise use provided values
    const finalTone = tone || brandSettings?.tone || 'Friendly';
    const finalKeywords = keywords || brandSettings?.keywords || '';
    const brandVoice = brandSettings?.brand_voice ? ` Brand voice: ${brandSettings.brand_voice}.` : '';
    const targetAudience = brandSettings?.target_audience ? ` Target audience: ${brandSettings.target_audience}.` : '';
    
    const prompt = `Create a short, engaging social media post.${brandVoice}${targetAudience} Topic: ${topic}. Tone: ${finalTone}. Keywords: ${finalKeywords}. Keep it short, high-converting, and authentic.`;
    
    const result = await generateText({ prompt });
    res.json({ result: result.text });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
