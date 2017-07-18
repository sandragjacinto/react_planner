import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Link } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className="App " style={{ textAlign: "left" }}>
        <div className="row">




          <div className="col-md-8 col-md-offset-2">
            <br /> <br />
            <ul style={{ textAlign: "left" }} className="nav nav-tabs">
              <li role="presentation"> <Link to='/choosemymeal' className="btn btn-lg"> choose my meal</Link> </li>
              
            </ul>

            {this.props.children}


          </div>
        </div>
      </div>
    );
  }
}

export default App;
