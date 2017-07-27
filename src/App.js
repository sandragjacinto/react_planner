import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import { Link } from 'react-router-dom'
import logo from './icons/home.png';
import CMMimage from './icons/chosemymeal.png';
import cooking from './icons/cooking.png';
import profile from './icons/profile.png';
import grocery from './icons/cart.png';

class App extends Component {
  render() {
    return (
      <div className="App " style={{ textAlign: "center" }}>
        <div className="row">
          <div className="col-md-1 col-xs-12" style={{ textAlign: "center", background:"#ECECEC"}}>
            <br /> <br />
            <ul style={{ paddingLeft: '30px', }} className="nav nav-pills nav-stacks">
              <a href={'/profile'} style={{ color:'white' }}><img className="img-responsive" src={profile} alt="logo"/></a>
              <a href={'/homepage'} style={{ color:'white' }}><img className="img-responsive" src={logo} alt="logo"/></a>
              <a href={'/choosemymeal'} style={{ color:'white' }}><img className="img-responsive" src={CMMimage} alt="logo" /></a>
              <a href={'/cookmymeal'} style={{ color:'white' }}><img className="img-responsive" src={cooking} alt="logo" /></a>
              <a href={'/grocerylist'} style={{ color:'white' }}><img className="img-responsive" src={grocery} alt="logo" /></a>
            </ul>
          </div>
          <div className="col-md-11 col-xs-12" style={{ paddingTop: '30px', }}>

        {this.props.children}

          </div>
          
        </div>
      </div>
    );
  }
}

export default App;
