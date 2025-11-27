const express = require('express');
const router = express.Router();

const templates = [
  { id: 'cap-pack-1', title: 'Instagram Captions Pack', price_inr: 99, price_usd: 0.99, description: 'Ready-made captions for Instagram' },
  { id: 'carousel-1', title: 'Carousel Templates Pack', price_inr: 149, price_usd: 1.99, description: 'Beautiful carousel designs' },
  { id: 'hashtags-1', title: 'Hashtag Bundle', price_inr: 49, price_usd: 0.49, description: 'Top-performing hashtags' }
];

router.get('/', (req, res) => res.json(templates));
router.get('/:id', (req, res) => {
  const t = templates.find(x => x.id === req.params.id);
  if (!t) return res.status(404).json({ error: 'Not found' });
  res.json(t);
});

module.exports = router;
