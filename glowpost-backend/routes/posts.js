const express = require('express');
const supabase = require('../lib/supabase');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { content, topic, tone, keywords, platform } = req.body;
    
    // Basic validation
    if (!content || content.trim().length === 0) {
      return res.status(400).json({ error: 'Content is required' });
    }
    
    const { data, error } = await supabase
      .from('posts')
      .insert([{ content, topic, tone, keywords, platform }])
      .select()
      .single();
    
    if (error) throw error;
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase.from('posts').select().order('created_at', { ascending: false });
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    
    // Check if post exists
    const { data: existingPost, error: checkError } = await supabase
      .from('posts')
      .select('id')
      .eq('id', id)
      .single();
    
    if (checkError || !existingPost) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    // Validate content if being updated
    if (updates.content !== undefined && (!updates.content || updates.content.trim().length === 0)) {
      return res.status(400).json({ error: 'Content cannot be empty' });
    }
    
    const { data, error } = await supabase
      .from('posts')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    
    // Check if post exists
    const { data: existingPost, error: checkError } = await supabase
      .from('posts')
      .select('id')
      .eq('id', id)
      .single();
    
    if (checkError || !existingPost) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    const { error } = await supabase.from('posts').delete().eq('id', id);
    if (error) throw error;
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
