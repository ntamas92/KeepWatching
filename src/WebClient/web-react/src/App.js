import React from 'react';
import SearchBar from "./components/SearchBar"
import MovieDetails from "./components/movie/MovieDetails"
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";



const App = () => {
  return (
    <div className="App">
      <Router>
        <nav className="navbar navbar-dark bg-dark">
          <Link to="/" className="navbar-brand">KeepWatching</Link>
          <SearchBar />
        </nav>

        <Switch>
          <Route path="/movie/:id" >
            <MovieDetails />
          </Route>
          <Route path="/tv/:id" >
            <div>
              TV
                </div>
          </Route>
          <Route path="/person/:id" >
            <div>
              PERSON
                </div>
          </Route>
        </Switch>
      </Router>

    </div>
  )
}

export default App;
