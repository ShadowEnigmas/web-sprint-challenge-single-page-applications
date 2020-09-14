import React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import Order from './components/OrderForm';
import Home from './components/Home';
import Navigation from './components/Navigation'

const App = () => {
  return (
    <Router>
    <Navigation>
      <Route exact path='/' component={Home}/>
      <Route path='/pizza' component={Order}/>
    </Router>
  );
};
export default App;
