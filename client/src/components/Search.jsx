import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ''
    }
    this.onChange = this.onChange.bind(this);
    this.search = this.search.bind(this);
  }

  onChange(e) {
    this.setState({
      term: e.target.value
    });
  }

  search() {
    this.props.onSearch(this.state.term);
  }

  render() {
    return (<div>
      <h4 className="text-warning">Add more repos!</h4>
      <div className="form-group">
        <label> Enter a github username:</label>
        <div className="input-group">
          <input className="form-control" value={this.state.term} onChange={this.onChange} />
          <div className="input-group-reppend">
            <button className="btn btn-primary" onClick={this.search}> Add Repos </button>
          </div>
        </div>
      </div>
    </div>)
  }
}

export default Search;