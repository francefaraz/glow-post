const express = require('express');
const supabase = require('../lib/supabase');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { post_id, scheduled_time, platform } = req.body;
    const { data, error } = await supabase.from('schedule').insert([{ post_id, scheduled_time, platform }]).select().single();
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase.from('schedule').select().order('scheduled_time', { ascending: true });
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = await supabase.from('schedule').delete().eq('id', id);
    if (error) throw error;
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
