import React from 'react';
import RepoCard from './RepoCard.jsx';

const RepoList = (props) => {
  let repoCards = props.repos.map((repo, i) => {
    return <RepoCard repoData={repo} key={i} />
  });

  return (
    < div >
      <h4> Repo List Component </h4>
      There are {props.repos.length} repos.
    {repoCards}
    </div >
  );
}

export default RepoList;