const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://root:${process.env.DB_PASS}@cluster0-cekdo.mongodb.net/test?retryWrites=true&w=majority`);

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

let Repo = mongoose.model('Repo', repoSchema);

let save = (repoObj, callback) => {
  // Mass insert objects into the database
  Repo.insertMany(repoObj,
    {
      // continure writing on upon finding duplicate documents
      ordered: false,
    }
    , (err, res) => {
      if (err) {
        callback(err, {});
        return;
      }
      callback(null, res);
    });
}

let get = (callback) => {
  Repo.find({}, null, {
    limit: 25,
    sort: {
      stargazers_count: -1
    }
  }, (err, data) => {
    if (err) {
      callback(err, null);
      return;
    }
    callback(null, data);
  });
}
module.exports.save = save;
module.exports.get = get;