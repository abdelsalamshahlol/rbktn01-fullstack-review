import React from 'react';
import bootstrap from 'bootstrap';
import $ from 'jquery';

const RepoCard = ({ repoData }) => {
  const copyToBoard = (text) => {
    console.log(text)
    navigator.clipboard.writeText(text)
      .then(
        () => {
          // Success
          $('#alert-cool').fadeIn();
          setTimeout(() => {
            $('#alert-cool').fadeOut();
          }, 3000);
        },
        () => {
          // Failure
          $('#alert-problem').fadeIn();
          setTimeout(() => {
            $('#alert-problem').fadeOut();
          }, 3000);
        })
  }

  return (
    <div className="card my-2">
      <div className="container-fluid">
        <div className="card-header row py-3 px-1">
          <h5 className="col">
            {repoData.name}
          </h5>
          <div className="col">
            <h6 className="card-title text-right"><span className="text-muted">Username/</span> {repoData.username}</h6>
          </div>
        </div></div>
      <div className="card-body">
        <div className="row">
          <div className="col-10">
            <h6 className="display-6">Description</h6>
          </div>
          <div className="col">
            <div className="text-right">
              <img src="http://simpleicon.com/wp-content/uploads/star.svg" width="15" />
              <span className="ml-1 display-6">{repoData.stargazers_count}</span>
            </div>
          </div>
        </div>
        <p className="card-text">{repoData.description}.</p>
        <div className="btn-group" >
          <a href={repoData.html_url} target="_blank" className="btn btn-outline-primary">Visit</a>
          <button className="btn btn-outline-dark" onClick={(e) => { copyToBoard(repoData.html_url) }}><img src="http://cdn.onlinewebfonts.com/svg/img_420376.png" width="15" /></button>
        </div>
      </div>
    </div>
  )
}

export default RepoCard;