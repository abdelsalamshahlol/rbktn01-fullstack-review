import React from 'react';
import axios from 'axios';
// import debounce from 'lodash.debounce';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ''
    }
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({
      term: e.target.value
    });

    axios.post('/repos', { term: this.state.term, test: 'payload' })
      .then(({ data }) => {
        console.log(data);
      }).catch(e => {
        // Todo handle error in an elegent form
        console.error(new e);
      });
  }

  search() {
    this.props.onSearch(this.state.term);
  }

  render() {
    return (<div>
      <h4>Add more repos!</h4>
      <pre> {this.state.term}</pre>
      Enter a github username: <input value={this.state.term} onChange={this.onChange} />
      <button onClick={this.search}> Add Repos </button>
    </div>)
  }
}

export default Search;