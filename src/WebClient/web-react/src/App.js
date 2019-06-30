import React, { Component } from 'react';
import './App.css';

class App extends Component{
  render() {
    return(
      <div className="App">
        <Search/>
      </div>
    )
  }
}

// Probably we don't need to create so many components..
class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      executingQuery: null,
      pendingQuery: null,
      data: null,
    };
  }

  getSearchResult = (query) => {
    var fetchResult = this.fetchSearchResult(query);
    
    fetchResult.then(x => {
        var pq = this.state.pendingQuery;
        this.setState({executingQuery:pq, pendingQuery:null, data: x}, () => {
          if(this.state.executingQuery !== null){
            this.getSearchResult(this.state.executingQuery)
        }})
      })
  }

  fetchSearchResult = (query) => {
      if(query === ''){
        return new Promise((resolve, reject) => resolve([])) 
      }
      else{
        return fetch('https://localhost:44367/api/media?title=' + query)
          .then(response => response.json())
          .then(x => { return x.map(fun => ({'title':fun.title, 'image':fun.posterPath}))})
      }
  }

  handleInputChange = (event) => {
    if(this.state.executingQuery === null){
      this.setState({executingQuery:event.target.value}, () => this.getSearchResult(this.state.executingQuery))
    }
    else{
      this.setState({pendingQuery:event.target.value})
    }
  }

  render() {
    return(
      <div className="search" style={{width:'250px'}}>
        <SearchBar onInputChanged={this.handleInputChange}/>
        <SearchResults results={this.state.data} />
      </div>
    )
  }
}

class SearchResults extends Component{
  render(){
    if(this.props.results){
      return this.props.results.filter(element => element.image !== null && element.title !== null).map(element => 
        <div className="result-row" style={{overflow:'auto'}}>
          
          <img src={element.image} alt={element.title} style={{float:'left'}} height={100}/>
          <p>{element.title}</p>
        </div>          
      )
    }
    else{
      return <div className="empty-result"/>
    }
    
  }
}

class SearchBar extends Component{
  constructor(props){
    super(props)
  }

  render(){
    return (
      <div className="search-bar">
          <form>
            <input type="text" id="filter" onChange={this.props.onInputChanged} />
          </form>
      </div>
    )
  }
}


export default App;
