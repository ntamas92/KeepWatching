import React, { Component } from 'react';
import './App.css';

class App extends Component{

  constructor(props) {
    super(props);

    this.state = {
      data: null,
      query: '',
    };
  }

  componentDidMount() {
    // this.handleInputChange()
  }


  getNames = () => {
    if(this.state.query === ''){
      this.setState({data:[]})
    }
    else{
      fetch('https://localhost:44367/api/media?title=' + this.state.query)
      .then(response => response.json())
      .then(x => this.setState({data: x.map(fun => ({'title':fun.title, 'image':fun.posterPath}))}));
    }
  }

  handleInputChange = () => {
    this.setState({query: this.search.value}, () => {
      this.getNames()
    });
  }

  handleChange = (event) => {
    this.setState({query: event.target.value}, () => {
      this.getNames()
    });
  }

  render() {
    return(
      <div className="App">
        <SearchBar onInputChanged={this.handleChange}/>
        <SearchResults results={this.state.data} />
      </div>
    )
  }
}

class SearchResults extends Component{
  render(){
    if(this.props.results){
      return this.props.results.filter(element => element.image !== null && element.title !== null).map(element => 
        <div className="resultRow">
          <img src={element.image} alt={element.title}/>
          <p>{element.title}</p>
        </div>          
      )
    }
    else{
      return <div className="emptyResult"/>
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
