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
      `http://gateway.marvel.com/v1/public/comics?ts=${ts /*
          this is a time stamp string, it will always be a new value, which is
          why it is required, they want unique values each time;
        */}&apikey=${config.publicKey}&hash=${/*below is the invokation of the md5 hashing function. You don't need
        to know what its doing (i don't), just know it's making a hash values
        for you.*/
      md5(
        ts + // timestamp comes first
        config.privateKey + // Then your privateKey from the config file.
          config.publicKey // Then your publicKey from the config file.
      )}`
    )
    .then(response => res.send(response.data.data.results))
    .catch(console.log);
});

app.listen(port, function() {
  console.log('Server listening on port', port);
});
