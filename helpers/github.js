const request = require('request');
// const config = require('../config.js');

let getReposByUsername = (username, callback) => {
  // TODO - Use the request module to request repos for a specific
  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${process.env.GITHUB_TOKEN}`
    }
  };

  request(options, (error, response, body) => {
    if (error) {
      return callback(error, {});
    }
    callback(null, { response, body: JSON.parse(body) });
  });

}

module.exports.getReposByUsername = getReposByUsername;