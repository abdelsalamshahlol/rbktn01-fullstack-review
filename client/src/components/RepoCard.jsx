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
          $('.toast').toast('show');
          console.log('success');
        },
        () => {
          // Failure
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
        <h6 className="display-6"> Description</h6>
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