const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

// Connection instance
let db = mongoose.connection;

// Connection error handler
db.on('error', () => {
  console.error.bind(console, 'MongoDB connection error:');
});

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
  "html_url": String,
  "description": String,
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

let save = (callback) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  db.once('open', () => {
    let repo = new Repo({});
    repo.save((error, book) => {
      if (error) {
        return callback(error, {});
      }
      callback(null, repo);
    });
  });

}

module.exports.save = save;