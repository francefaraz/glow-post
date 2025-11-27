require('dotenv').config();
const express = require('express');
const cors = require('cors');

const postsRouter = require('./routes/posts');
const scheduleRouter = require('./routes/schedule');
const brandRouter = require('./routes/brand');
const templatesRouter = require('./routes/templates');
const pricingRouter = require('./routes/pricing');
const contactRouter = require('./routes/contact');
const generateRouter = require('./routes/generate');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/posts', postsRouter);
app.use('/api/schedule', scheduleRouter);
app.use('/api/brand', brandRouter);
app.use('/api/templates', templatesRouter);
app.use('/api/pricing', pricingRouter);
app.use('/api/contact', contactRouter);
app.use('/api/generate', generateRouter);

app.get('/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`GlowPost backend running on port ${PORT}`));
