const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 4000;

const db = require('./queries');

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (request, response) => {
  response.json({ message: 'Ok' });
});

app.get('/foto', db.getFoto);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
