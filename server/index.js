const express = require('express');
const bodyParser = require('body-parser');
let app = express();

app.use(bodyParser.json());

let getReposByUsername = require('../helpers/github');

app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  res.json(req.body)
  return;
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  if (req.body.username) {
    let tmp = getReposByUsername(req.body.username);
    res.json(tmp);
  } else {
    // return unprocessible entity to client
    res.sendStatus(422);
  }
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});

