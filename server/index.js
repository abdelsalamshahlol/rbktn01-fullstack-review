const express = require('express');
const bodyParser = require('body-parser');
let helpers = require('../helpers/github');
let database = require('../database/index');
let app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database

  // Look for user data on database first
  // IF found and fetched_at is not older than one day
  //  return data
  // Else
  //  get data from API and update data on DB

  // Get repo from API
  if (req.body.username) {
    helpers.getReposByUsername(req.body.username, (err, data) => {
      //   Save to DB
      // Todo fix the duplicate issue on save

      //   database.save(data.body, (err, result) => {
      //     if (err) {
      //       res.sendStatus(500);
      //       return;
      //     }
      //     res.json(result);
      //   });
      // });
      // console.log(data.body)
      // return;

      // let d = {
      //   "id": 18221276,
      //   "username": "octocat",
      //   "name": "git-consortium",
      //   "full_name": "octocat/git-consortium",
      //   "html_url": "https://github.com/octocat/git-consortium",
      //   "description": "This repo is for demonstration purposes only.",
      //   "created_at": "2014-03-28T17:55:38Z",
      //   "clone_url": "https://github.com/octocat/git-consortium.git",
      //   "stargazers_count": 7,
      //   "language": "HTML",
      //   "fetched_at": new Date()
      // }

      // for (let repoObj of JSON.parse(data.body)) {
      let reposData = JSON.parse(data.body).map((val) => {
        val.fetched_at = new Date();
        val.username = val.owner.login;
        return val;
      });

      // console.log({ repoObj });
      database.save(reposData, (err, result) => {
        if (err) {
          res.json(err);
          return;
        }
        res.json(result);
      });
      // }

    });
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

