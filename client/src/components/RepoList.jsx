import React from 'react';
import RepoCard from './RepoCard.jsx';

const RepoList = (props) => {
  let repoCards = props.repos.map((repo, i) => {
    return <RepoCard repoData={repo} key={i} />
  });

  return (
    < div >
      <h4 className="text-primary"> Repo List <small>There are {props.repos.length} repos.</small></h4>
      <div className="my-5">
        {repoCards}
      </div>
    </div >
  );
}

export default RepoList;