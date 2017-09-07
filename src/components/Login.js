// Manage Log In
// shows a button and introduction for Log In

import React from 'react';
import base from '../base';
import { Link } from 'react-router-dom';
import { isUserLogged } from './DataUser';
import { getUserLoginData } from './DataUser';
import { setUserData } from './DataUser';
import list from './../icons/list.png';
import schedule from './../icons/schedule.png';
import cart from './../icons/cart.png';
import loginIm from './../icons/login_image.jpg';
import arrow from './../icons/arrow.png';



class Login extends React.Component {
  constructor(props) {
    super(props);
    this.renderLogin = this.renderLogin.bind(this);
    this.renderHomePage = this.renderHomePage.bind(this);
    this.authenticate = this.authenticate.bind(this);
    this.authHandler = this.authHandler.bind(this);
    this.state = {
      uid: null,
      owner: null,
      isUserLogged: false
    }

    console.log("creating, constructor, isUserLogged:" + isUserLogged());
    console.log("creating, constructor, getUserLoginData:" + getUserLoginData());

    // if(isUserLogged())
    // {
    //   this.setState({
    //     owner : getUserLoginData().displayName,
    //     uid : getUserLoginData().uid,
    //     isUserLogged : true
    //   });
    // }


  }

  componentWillMount() {
    console.log("componentWillMount:" + isUserLogged());
    if (isUserLogged()) {
      this.setState({
        owner: getUserLoginData().displayName,
        uid: getUserLoginData().uid,
        isUserLogged: true,
      });
    }
  }

  authenticate(provider) {
    //console.log(`trying to log with ${provider}`);
    base.authWithOAuthPopup(provider, this.authHandler);
  }

  logout() {
    base.unauth();
    this.setState({ uid: null, owner: null, isUserLogged: false })
    setUserData(null);
  }

  authHandler(err, authData) {
    //console.log(authData);
    if (err) {
      console.error(err);
      return;
    }
    //grab the user  info 
    const storeRef = base.database().ref(authData.user.uid);

    // query the firebase
    storeRef.once('value', (snapshot) => {
      const data = snapshot.val() || {};

      setUserData(authData.user);
      console.log(authData)
      //Add some data to the user...
      if (!data.owner) {
        storeRef.set({
          owner: authData.user.displayName,
          picture: authData.user.providerData[0].uid,
          email: authData.user.email,
          mealPlan: {}
        });
      }

      this.setState({
        uid: authData.user.uid,
        owner: data.owner || authData.user.displayName,
        isUserLogged: true
      })
    });
  }

  renderLogin() {
    return (
      <div>
        <section className='loginSection'>
          <div className='row'>
            <br></br>
            <br></br>
            <br></br>
            <div className='col-md-5 col-md-offset-1 col-sx-10 col-sx-offset-1'>
              <img className='loginIm' alt='loginIm' src={loginIm} />
            </div>
            <div className='col-md-6'>
              <br></br>
              <br></br>
              <br></br>
              <div >
                <h2>LOGIN TO START YOUR ADVENTURE</h2>
                <button className='btn btn-primary btn-login'
                  onClick={() => this.authenticate('facebook')}>Login </button>

              </div>
              <br></br>
              <br></br>
              <br></br>
            </div>
          </div>

        </section>
        <section>
         <a href='#explainSection'>
            <img className='arrowIm' alt='loginIm' src={arrow} />
        </a>
         
          <h1 className='titleH1 explainApp' id='explainSection'>THE MEAL PLANNER</h1>
          <div className='row explainAppbodysection'>
            <div className='col-md-5 col-md-offset-1 explainAppbody'>
              <h2>CHOOSE YOUR MEALS</h2>

              <h4>Access a database of recipes and choose your favorite meals</h4>
              <p className='explainAppbodyp'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pharetra est ex, ut vehicula justo porttitor eget. Nulla eleifend dolor ut neque ultricies ornare. Aliquam maximus, neque et dapibus feugiat, mauris odio vulputate odio, nec sagittis magna ante eu dui. Vivamus suscipit nulla lacus, congue sollicitudin turpis condimentum vel. Sed at orci augue. Nulla iaculis, justo vitae bibendum rutrum, quam massa aliquam eros, sit amet interdum libero ex vel lacus. In vulputate libero a interdum pharetra. Mauris viverra bibendum tristique.</p>
            </div>
            <div className='col-md-5'>
              <br></br>
              <img className='listIm' alt='list' src={list} />
            </div>
          </div>
          <div className='row explainAppbodysection planMeal'>
            <div className='col-md-5 col-md-offset-1'>
              <img className='scheduleIm' alt='schedule' src={schedule} />

            </div>
            <div className='col-md-5 explainAppbody '>
              <h2>PLAN YOUR MEALS AHEAD</h2>

              <h4>Access a database of recipes and choose your favorite meals</h4>
              <p className='explainAppbodyp'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pharetra est ex, ut vehicula justo porttitor eget. Nulla eleifend dolor ut neque ultricies ornare. Aliquam maximus, neque et dapibus feugiat, mauris odio vulputate odio, nec sagittis magna ante eu dui. Vivamus suscipit nulla lacus, congue sollicitudin turpis condimentum vel. Sed at orci augue. Nulla iaculis, justo vitae bibendum rutrum, quam massa aliquam eros, sit amet interdum libero ex vel lacus. In vulputate libero a interdum pharetra. Mauris viverra bibendum tristique.</p>
            </div>
          </div>
          <div className='row explainAppbodysection'>
            <div className='col-md-5 col-md-offset-1 explainAppbody'>
              <h2>BUY YOUR GROCERIES</h2>

              <h4>Access a database of recipes and choose your favorite meals</h4>
              <p className='explainAppbodyp'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pharetra est ex, ut vehicula justo porttitor eget. Nulla eleifend dolor ut neque ultricies ornare. Aliquam maximus, neque et dapibus feugiat, mauris odio vulputate odio, nec sagittis magna ante eu dui. Vivamus suscipit nulla lacus, congue sollicitudin turpis condimentum vel. Sed at orci augue. Nulla iaculis, justo vitae bibendum rutrum, quam massa aliquam eros, sit amet interdum libero ex vel lacus. In vulputate libero a interdum pharetra. Mauris viverra bibendum tristique.</p>
            </div>
            <div className='col-md-5'>
              <br></br>
              <img className='cartIm' alt='list' src={cart} />
            </div>
          </div>
        </section>
      </div>
    )
  }

  getFirstName() {
    var nameString = this.state.owner;
    nameString = nameString.split(" ")[0];
    return nameString.toUpperCase();
  }

  renderHomePage() {
    return (
      <nav className="login">
        <h2>Inventory</h2>
        <p>Realiza tu planificaion de la semana...</p>
        <button className="facebook"
          onClick={() => this.authenticate('facebook')}>Log in with Facebook</button>
      </nav>
    )
  }

  render() {
    //console.log("display name:" + getUserLoginData().displayName);
    const logout = <button className='btn btn-primary btn-login' onClick={() => this.logout()}>Log Out!</button>;
    // Check if they are log in...
    if (this.state.isUserLogged == false) {
      //if(!isUserLogged()) {
      return <div>
        {this.renderLogin()}
      </div>
    }

    return (
      <div>
        <section className='loginSection'>
          <div className='row'>
            <br></br>
            <br></br>
            <br></br>
            <div className='col-md-5 col-md-offset-1 col-sx-10 col-sx-offset-1'>
              <img className='loginIm' alt='loginIm' src={loginIm} />
            </div>
            <div className='col-md-6'>
              <br></br>
              <br></br>
              <br></br>
              <div >
                <h2> WELCOME {this.getFirstName()} !</h2>
                {logout}

              </div>
              <br></br>
              <br></br>
              <br></br>
            </div>
          </div>
        </section>
        <section className='explainApp'>
          <h1 className='titleH1'>To start planning click on CHOOSE MY MEAL</h1>
        </section>
      </div>
    )
  }
}

export default Login;