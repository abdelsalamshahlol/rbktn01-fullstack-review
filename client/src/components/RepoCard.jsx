import React from 'react';
const RepoCard = ({ repoData }) => {
  return (
    <div className="card my-2">
      <div className="container-fluid">
        <div className="card-header row py-3 px-1">
          <h5 className="col">
            {repoData.name}
          </h5>
          <div className="col">
            <h6 className="card-title text-right">Username/ {repoData.username}</h6>
          </div>
        </div></div>
      <div className="card-body">
        <h6 className="display-6"> Description</h6>
        <p className="card-text">{repoData.description}.</p>
        <a href="{repoData.html_url}" target="_blank" className="btn btn-outline-primary">Visit</a>
      </div>
    </div>
  )
}

export default RepoCard;