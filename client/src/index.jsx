import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import 'bootstrap/dist/css/bootstrap.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }

    this.alertStyle = {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      display: 'none'
    }
  }

  search(term) {
    console.log(`${term} was searched`);
    axios.post('/repos', { username: term })
      .then(({ data }) => {
        console.log(data);
      }).catch(err => {
        // Todo handle error in an elegent form
        console.error(err);
      });
  }

  componentDidMount() {
    axios.get('/repos')
      .then(({ data }) => {
        console.log(data);
        this.setState({
          repos: data,
        })
      }).catch(e => console.err(err));
  }

  render() {
    return (
      <div>
        <div className="jumbotron">
          <h1 className="display-4 text-center">Github Fetcher</h1>
          <hr className="display-3" />
          <RepoList repos={this.state.repos} />
          <Search onSearch={this.search.bind(this)} />
        </div>

        {/* Alert */}
        <div className="alert alert-primary" style={this.alertStyle} role="alert" id="alert-cool">
          Copied to clipboard.
        </div>
        <div className="alert alert-danger" style={this.alertStyle} role="alert" id="alert-problem">
          Failed to copy to clipboard.
        </div>
      </div >
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));