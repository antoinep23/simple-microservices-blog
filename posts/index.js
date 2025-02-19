const express = require('express');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/posts', async (req, res) => {
  try {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;

    posts[id] = {
      id,
      title,
    };

    await axios
      .post('http://localhost:4005/events', {
        type: 'PostCreated',
        data: {
          id,
          title,
        },
      })
      .catch((err) => console.log(err));

    res.status(201).send(posts[id]);
  } catch (err) {
    console.log(err);
  }
});

app.post('/events', (req, res) => {
  res.send({});
});

app.listen(4000, () => console.log('Listening on 4000'));
