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
              <li role="presentation"> <Link to='/cookmymeal' className="btn btn-lg"> cook my meal</Link> </li>
              <li role="presentation"> <Link to='/profile' className="btn btn-lg"> profile</Link> </li>
              <li role="presentation"> <Link to='/grocerylist' className="btn btn-lg"> grocery list</Link> </li>
              
            </ul>

            {this.props.children}


          </div>
        </div>
      </div>
    );
  }
}

export default App;
