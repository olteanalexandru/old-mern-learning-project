import React from 'react';
import { Container } from '@material-ui/core';
//react router link
import { BrowserRouter, Switch, Route,Redirect } from 'react-router-dom';
import PostDetails from './components/PostDetails/PostDetails';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Auth from './components/Auth/Auth';



//rendering everything inside index.js

//Using switch  inside browserRouter so only 1 route  may render at a time
//REDIRECT only show posts if path = "/"  and redirecto on route change
const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));

  return(
  <BrowserRouter>
    <Container maxWidth="xl">
      <Navbar />

      <Switch>
      
      <Route path="/" exact component={() => <Redirect to="/posts" />} />
          <Route path="/posts" exact component={Home} />
          <Route path="/posts/search" exact component={Home} />
          <Route path="/posts/:id" exact component={PostDetails} />
          <Route path="/auth" exact component={() => (!user ? <Auth /> : <Redirect to="/posts" />)} />
      </Switch>
    </Container>
  </BrowserRouter>
  );
}; 

export default App;
