// Manage Log In
// shows a button and introduction for Log In

import React from 'react';
import base from '../base';
import {isUserLogged} from './DataUser';
import {getUserLoginData} from './DataUser';
import {setUserData} from './DataUser';

class Login extends React.Component{
  constructor(props) {
  super(props);
  this.renderLogin = this.renderLogin.bind(this);
  this.renderHomePage = this.renderHomePage.bind(this);
  this.authenticate = this.authenticate.bind(this);
  this.authHandler = this.authHandler.bind(this);
    this.state ={
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

componentWillMount()
{
  console.log("componentWillMount:" + isUserLogged());
  if(isUserLogged())
  {
    this.setState({
      owner : getUserLoginData().displayName,
      uid : getUserLoginData().uid,
      isUserLogged : true,
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
  if(err) {
    console.error(err);
    return;
  }
  //grab the user  info 
  const storeRef = base.database().ref(authData.user.uid);
 
  // query the firebase
  storeRef.once('value',(snapshot) => {
    const data = snapshot.val() || {};
  
    setUserData(authData.user);
    console.log(authData)
    //Add some data to the user...
    if(!data.owner) {
      storeRef.set({
        owner: authData.user.displayName,
        picture: authData.user.providerData[0].uid,
        email: authData.user.email,
        mealPlan : {}
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
  return(
    <div >
      <br></br>
      <br></br>
      <br></br>
      <div >  
    <h2>LOGIN TO START YOUR ADVENTURE</h2>
    <button className='btn btn-danger'
      onClick={() => this.authenticate('facebook')}>LogIn </button>
      
      </div>
      <br></br>
      <br></br>
      <br></br>
    </div>
  )
}

getFirstName(){
  var nameString = this.state.owner;
  return nameString.split(" ")[0];
}

renderHomePage() {
  return(
    <nav className="login">
    <h2>Inventory</h2>
    <p>Realiza tu planificaion de la semana...</p>
    <button className="facebook"  
      onClick={() => this.authenticate('facebook')}>Log in with Facebook</button>
    </nav>
  )
}

render(){
//console.log("display name:" + getUserLoginData().displayName);
const logout = <button className='btn btn-danger' onClick={() =>  this.logout()}>Log Out!</button>;
// Check if they are log in...
if(this.state.isUserLogged == false) {
//if(!isUserLogged()) {
  return <div>
    {this.renderLogin()}
  </div>
}

  return(
    <div>
     <br></br>
      <br></br>
      <br></br>
     <div >
       <h1> Welcome</h1>
        <h2>{this.getFirstName()} </h2>
        {logout }
        </div>
     <h2> You can start planning by clicking on Choose My Meal </h2>

    </div>
  )
}
}

export default Login;