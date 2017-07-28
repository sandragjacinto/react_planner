import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import { Link } from 'react-router-dom'
import HomePage from './components/HomePage.js'
import logo from './icons/home.png';
import CMMimage from './icons/chosemymeal.png';
import cooking from './icons/cooking.png';
import profile from './icons/profile.png';
import grocery from './icons/cart.png';

class App extends Component {
  render() {
    return (
      <div className="App ">

      <HomePage />

        {this.props.children}

          
      </div>
    );
  }
}

export default App;
