import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import $ from 'jquery';
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
    axios.post('/repos', { username: term })
      .then(({ data }) => {
        $('#alert-done').fadeIn();
        setTimeout(() => {
          $('#alert-done').fadeOut();
        }, 3000);

        // rerender the 25 repos
        this.setState({
          repos: data,
        });

      }).catch(err => {
        $('#alert-problem').html(err.message);
        $('#alert-problem').fadeIn();
        setTimeout(() => {
          $('#alert-problem').fadeOut();
        }, 3000);
      });
  }

  componentDidMount() {
    axios.get('/repos')
      .then(({ data }) => {
        this.setState({
          repos: data,
        });
      }).catch(e => {
        $('#alert-problem').html(err.message);
        $('#alert-problem').fadeIn();
        setTimeout(() => {
          $('#alert-problem').fadeOut();
        }, 3000);
      });
  }

  render() {
    return (
      <div>
        <div className="jumbotron">
          <h1 className="display-4 text-center">Github Fetcher</h1>
          <hr className="display-3" />
          <Search onSearch={this.search.bind(this)} />
          <RepoList repos={this.state.repos} />
        </div>

        {/* Alert */}
        <div className="alert alert-success" style={this.alertStyle} role="alert" id="alert-done">
          Request complete.
        </div>
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