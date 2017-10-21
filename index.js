const express = require('express'),
  bodyParser = require('body-parser'),
  port = 3001,
  app = express(),
  axios = require('axios'),
  config = require('./config'),
  md5 = require('./md5');

app.use(bodyParser.json());

app.get('/api/comics', (req, res) => {
  const ts = new Date().toString();
  axios
    .get(
      `http://gateway.marvel.com/v1/public/comics?ts=${ts}&apikey=${config.publicKey}&hash=${md5(
        ts + config.privateKey + config.publicKey
      )}`
    )
    .then(response => res.send(response.data.data.results))
    .catch(console.log);
});

app.listen(port, function() {
  console.log('Server listening on port', port);
});
