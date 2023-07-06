const express = require('express');
const axios = require('axios');
const app = express();
const rateLimit = require('express-rate-limit');
const port = process.env.PORT || 3000;
const cors = require('cors');

app.use(cors()); 

app.use(express.json()); 

const limiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 6
});

app.use(limiter);

app.post('/api', async (req, res) => {
  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', req.body, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
