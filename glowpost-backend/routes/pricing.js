const express = require('express');
const router = express.Router();
router.get('/', (req, res) => {
  res.json({
    inr: { pro: 199, agency: 799 },
    usd: { pro: 2.99, agency: 9.99 }
  });
});
module.exports = router;
