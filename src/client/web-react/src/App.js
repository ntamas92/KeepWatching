import React from 'react';
import SearchBar from "./components/SearchBar"
import MovieDetails from "./components/movie/MovieDetails"
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from './components/login/Login';
import Signup from './components/login/Signup';
import LoginBar from "./components/login/LoginBar";

import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache()
});

if(client) {
  console.log("client started")
}

const App = () => {
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <Router>
          <nav className="navbar navbar-dark bg-dark">
            <Link to="/" className="navbar-brand">KeepWatching</Link>
            <SearchBar />
            <LoginBar />
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
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
          </Switch>
        </Router>
      </ApolloProvider>
    </div>
  )
}

export default App;
