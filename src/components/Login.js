import React from 'react';
import base from '../base';
import {isUserLogged} from './DataUser';
import {getUserLoginData} from './DataUser';
import {setUserData} from './DataUser';

class Login extends React.Component{
constructor() {
 super();
 this.renderLogin = this.renderLogin.bind(this);
 this.renderHomePage = this.renderHomePage.bind(this);
 this.authenticate = this.authenticate.bind(this);
 this.authHandler = this.authHandler.bind(this);
  this.state ={
   uid: null,
   owner: null,
   isUserLogged: false
 }
}  


authenticate(provider) {
  console.log(`trying to log with ${provider}`);
  base.authWithOAuthPopup(provider, this.authHandler);
}

logout() {
  base.unauth();
  this.setState({ uid: null, owner: null })
  setUserData(null);
}

authHandler(err, authData) {
  console.log(authData);
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

    //Add some data to the user...
    if(!data.owner) {
      storeRef.set({
        owner: authData.user.displayName
      });
    }
  
  this.setState({
    uid: authData.user.uid,
    owner: data.owner || authData.user.displayName
  })
  });
}

renderLogin() {
  return(
    <nav >
    <h2>Sing in to manage your recipes</h2>
    <button 
      onClick={() => this.authenticate('facebook')}>Log in with Facebook</button>
    </nav>
  )
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
console.log("display name:" + getUserLoginData().displayName);
const logout = <button onClick={() =>  this.logout()}>Log Out!</button>;
// Check if they are log in...
if(!this.state.isUserLogged) {
//if(!isUserLogged()) {
  return <div>{this.renderLogin()}</div>
}
  return(
    <nav>
     {/*<p>Hello ... <h2>{this.state.owner}</h2></p>*/}
     <div>Hello ... <h2>{getUserLoginData().displayName}</h2></div>
     {logout }
    </nav>
  )
}
}

export default Login;