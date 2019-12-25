const express = require('express');
const bodyParser = require('body-parser');
let helpers = require('../helpers/github');
let database = require('../database/index');
let app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  // Get repos from API
  if (req.body.username) {
    helpers.getReposByUsername(req.body.username, (err, data) => {
      if (data.body.hasOwnProperty('message')) {
        res.status(422).send(data.body.message);
        return;
      }

      let reposData = data.body.map((val) => {
        val.fetched_at = new Date();
        val.username = val.owner.login;
        return val;
      });

      database.save(reposData, (err, result) => {
        if (err) {
          res.json(err);
          return;
        }

        getRepos((err, data) => {
          if (err) {
            res.sendStatus(500);
          }
          res.json(data);
        });
      });
    });
  } else {
    // return unprocessible entity to client
    res.sendStatus(422);
  }
});

app.get('/repos', function (req, res) {
  // This route send back the top 25 repos
  getRepos((err, data) => {
    if (err) {
      res.sendStatus(500);
    }
    res.json(data);
  });
});

let getRepos = (callback) => {
  database.get((err, data) => {
    if (err) {
      callback(err, null);
    }
    callback(null, data);
  })
}

let port = process.env.PORT || 1128;

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});

