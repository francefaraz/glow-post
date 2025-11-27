const express = require('express');
const supabase = require('../lib/supabase');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { tone, keywords, brand_color, brand_name, brand_voice, target_audience } = req.body;
    const payload = { id: 1, tone, keywords, brand_color, brand_name, brand_voice, target_audience };
    const { data, error } = await supabase.from('brand_settings').upsert([payload], { onConflict: 'id' }).select().single();
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase.from('brand_settings').select().limit(1);
    if (error) throw error;
    res.json(data[0] || null);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
