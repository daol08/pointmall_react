import React from 'react';
import './App.css';
import Home from './point_mall/Home'
import Header from './point_mall/Header';
import Footer from './point_mall/Footer';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom' 
import Login from './point_mall/Login';
import ItemDetail from './point_mall/ItemDetail';
import Myitems from './point_mall/Myitems';
import Category from './point_mall/Category';
import Cartitems from './point_mall/Cartitems';
import Register from './point_mall/Register';
import PromiseTest from './Promise/PromiseTest';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
            <Route exact path= '/' component = {Home} /> 
            <Route exact path='/login' component = {Login} />
            <Route exact path= '/items/:itemId' component = {ItemDetail} />
            <Route exact path='/me/items' component = {Myitems} />
            <Route exact path='/categories/:categoryId' component = {Category} />
            <Route exact path='/cart/items' component = {Cartitems} />
            <Route exact path='/promisetest' component = {PromiseTest} />
            
            <Route exact path= '/register' component = {Register} /> 
        </Switch>
        <Footer />
        </div>
        </Router>
  );
}

export default App;
