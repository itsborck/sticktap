import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();

app.use(cors());

app.get('/schedule/now', async (req, res) => {
  try {
    const response = await axios.get('https://api-web.nhle.com/v1/schedule/now');
    res.send(response.data);
  } catch (error) {
    res.status(500).send({ error: 'An error occurred!' });
  }
});

app.get('/gamecenter/:gameId/boxscore', async (req, res) => {
  try {
    const response = await axios.get(`https://api-web.nhle.com/v1/gamecenter/${req.params.gameId}/boxscore`);
    res.send(response.data);
  } catch (error) {
    res.status(500).send({ error: 'An error occurred!' });
  }
})

app.listen(5000, () => {
  console.log('Server listening on port 5000.');
});