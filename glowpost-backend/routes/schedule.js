const express = require('express');
const supabase = require('../lib/supabase');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { post_id, scheduled_time, platform } = req.body;
    
    // Basic validation
    if (!post_id) {
      return res.status(400).json({ error: 'post_id is required' });
    }
    if (!scheduled_time) {
      return res.status(400).json({ error: 'scheduled_time is required' });
    }
    
    // Verify post exists
    const { data: post, error: postError } = await supabase
      .from('posts')
      .select('id')
      .eq('id', post_id)
      .single();
    
    if (postError || !post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    const { data, error } = await supabase
      .from('schedule')
      .insert([{ post_id, scheduled_time, platform }])
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
    // Get schedules and join with posts table to include post content
    const { data: schedules, error } = await supabase
      .from('schedule')
      .select('*')
      .order('scheduled_time', { ascending: true });
    
    if (error) throw error;
    
    // Fetch post details for each schedule
    const schedulesWithPosts = await Promise.all(
      schedules.map(async (schedule) => {
        if (schedule.post_id) {
          const { data: post } = await supabase
            .from('posts')
            .select('id, content, topic, tone, keywords, platform')
            .eq('id', schedule.post_id)
            .single();
          return { ...schedule, post };
        }
        return schedule;
      })
    );
    
    res.json(schedulesWithPosts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if schedule exists
    const { data: existingSchedule, error: checkError } = await supabase
      .from('schedule')
      .select('id')
      .eq('id', id)
      .single();
    
    if (checkError || !existingSchedule) {
      return res.status(404).json({ error: 'Schedule not found' });
    }
    
    const { error } = await supabase.from('schedule').delete().eq('id', id);
    if (error) throw error;
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
