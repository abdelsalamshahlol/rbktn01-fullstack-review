const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let ownerSchema = mongoose.Schema({
  "login": String,
  "id": Number,
  "avatar_url": String,
  "gravatar_id": String,
  "type": String
});

let repoSchema = mongoose.Schema({
  "id": Number,
  "name": String,
  "full_name": String,
  "owner": ownerSchema,
  "private": Boolean,
  "html_url": String,
  "description": String,
  "fork": Boolean,
  "created_at": Date,
  "updated_at": Date,
  "pushed_at": Date,
  "git_url": String,
  "clone_url": String,
  "stargazers_count": Number,
  "watchers_count": Number,
  "language": String,
  "fetched_at": Date, // Date of the last fetch
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (/* TODO */) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
}

module.exports.save = save;