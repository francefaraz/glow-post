const express = require('express');
const supabase = require('../lib/supabase');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' });
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }
    
    // Store in database
    const { data, error } = await supabase
      .from('contact_messages')
      .insert([{ name, email, message }])
      .select()
      .single();
    
    if (error) throw error;
    
    // Log for debugging
    console.log('Contact message received:', { name, email, message: message.substring(0, 50) + '...' });
    
    res.status(201).json({ success: true, id: data.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
