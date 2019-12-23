const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

var personSchema = mongoose.Schema({
  name: String,
  age: Number,
  nationality: String
});

let repoSchema = mongoose.Schema({
  "id": {
    type: Number,
    index: true,
    unique: true
  },
  "username": String,
  "name": String,
  "full_name": String,
  "html_url": String,
  "description": String,
  "created_at": Date,
  "clone_url": String,
  "stargazers_count": Number,
  "language": String,
  "fetched_at": Date, // Date of the last fetch
});

let save = (repoObj, callback) => {
  let Repo = mongoose.model('Repo', repoSchema);
  let _repo = new Repo(repoObj);

  _repo.save((err, res) => {
    if (err) {
      callback(err, {});
      return;
    }
    callback(null, res);
  });
}
module.exports.save = save;