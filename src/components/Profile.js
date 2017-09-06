import React from 'react';
import { Link } from 'react-router-dom'
import base from '../base';
import {isUserLogged} from './DataUser';
import {getUserLoginData} from './DataUser';
import {setUserData} from './DataUser';
import DontLikeIm from './../icons/dontlike.png';
import LikeIm from './../icons/like.png';
import AlergicIm from './../icons/alergic.png';
import CanNotIm from './../icons/cannot.png';



//gets user info and jsx
const UserInfo = (props) => {
    console.log('name :'+props.owner)
    return (
        <div>

            <div className='row profileInfo'>
                <div className='col-md-9 col-md-offset-0 col-xs-7 col-xs-offset-3' >
                    <h3> User Name: {props.username}</h3>
                </div>
            </div>
            <div className='row profileInfo'>
                <div className='col-md-9 col-md-offset-0 col-xs-7 col-xs-offset-3' >
                    <h5> Email: {props.userEmail}</h5>
                </div>
            </div>
            <div className='row profileInfo'>
                <div className='col-md-9 col-md-offset-0 col-xs-7 col-xs-offset-3' >
                    <h5> Tutor: {props.tutorName}</h5>
                </div>
            </div>
            
        </div>

    )
}
//loads image for profile
const LoadProfileIm = (props) => {
    var startLink = "https://graph.facebook.com/";
    var dim = "/picture?height=166"
    var IimUID = props.profileIMG;
    var imLink = startLink + IimUID +dim;
    return (
        <div>
            <img className=' profilePic' alt='profilepic' src={imLink} />
        </div>
    )
}
//reassembles image and user info
const PersonalInfo = ({ profileIMG, username, userEmail }) => {
    return (
        <div className='container userPhoto'>
            <div className='row'>
                <div className='col-md-3 col-md-offset-1 col-xs-12'>
                    <LoadProfileIm profileIMG={profileIMG} />
                </div>
                <div className='col-md-6 col-md-offset-1 col-xs-12 personalcontainer'>
                    <UserInfo username={username} userEmail={userEmail}/>
                </div>
            </div>
        </div>


    )
}
//creates buttons for i dont like etc
const CreateButtons = (props) => {
    return (
        <div className='row'>
            <div className='col-md-11 col-md-offset-1'>
                <div className='jumbotron chooseIngredientsProfile'>
                    <div className='row'>

                        <div className='col-md-3 col-xs-3'>
                            <Link to={'/dontlike'} style={{ color: 'white' }}><img className='img-circle profilebutton' src={DontLikeIm} alt="logo" /></Link>
                        </div>
                        <div className='col-md-3 col-xs-3'>
                            <Link to={'/favmeals'} style={{ color: 'white' }}><img className='img-circle profilebutton' src={LikeIm} alt="logo" /></Link>
                        </div>
                        <div className='col-md-3 col-xs-3'>
                            <Link to={'/allergic'} style={{ color: 'white' }}><img className='img-circle profilebutton' src={AlergicIm} alt="logo" /></Link>
                        </div>
                        <div className='col-md-3 col-xs-3'>
                            <Link to={'/canteat'} style={{ color: 'white' }}><img className='img-circle profilebutton' src={CanNotIm} alt="logo" /></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

class Profile extends React.Component {
     constructor(props) {
        super(props);
        this.state = {
            owner: '',
            picture: '',
            userEmail: '',
            tutorName: 'Pedro Pena'
        }
        
    }

    componentWillMount()
  {
      const storeRef = base.database().ref(getUserLoginData().uid);
       storeRef.once('value',(snapshot) => {
            const data = snapshot.val() || {};
            if (data) {
                this.setState({
                    owner:  data.owner,
                   picture : data.picture,
                   userEmail : data.email
                })
            }
            console.log(this.state.picture)
        });
  }


    render() {
        return (
            <div style={{ textAlign: "center" }}>
                <div className="row firstElement">
               
                    <div className="col-md-11 col-xs-12" style={{ paddingTop: '30px', }}>

                        <PersonalInfo profileIMG={this.state.picture} username={this.state.owner} userEmail={this.state.userEmail} />

                        <CreateButtons />

                        <div className='container'>
                            <h3> App Settings </h3>
                        </div>

                    </div>

                </div>
            </div>

        )
    }
}

export default Profile;