const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const port = 4200

app.use(cors({
  origin: process.env.frontendUri,
  methods: "GET,HEAD,OPTIONS,POST,PUT",
  allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept, Authorization"
}));

app.get("/search", async (req, res) => {
  try {
    const { q } = req.query;
    const response = await axios.get(
      `https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=${q}`,
      {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36"
        }
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get('/', (req, res) => {
  res.send(`Welcome!@`);
});

app.listen(port, () => {
  console.log(`Proxy server listening at http://localhost:${port}`);
});
