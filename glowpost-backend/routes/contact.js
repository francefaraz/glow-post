const express = require('express');
const router = express.Router();
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    console.log('Contact:', { name, email, message });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;
