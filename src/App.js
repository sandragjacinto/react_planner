import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom'
import logo from './icons/home.png';
import CMMimage from './icons/chosemymeal.png';
import cooking from './icons/cooking.png';
import profile from './icons/profile.png';
import grocery from './icons/cart.png';


var FakeUser = {

}

class App extends Component {
  render() {
    return (
      <div className="App ">

        {this.props.children}

          
      </div>
    );
  }
}

export default App;