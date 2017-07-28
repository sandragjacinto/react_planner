import React from 'react';
import { Link } from 'react-router-dom'
import LateralMenu from './LateralMenu.js'
import DontLikeIm from './../icons/dontlike.png';
import LikeIm from './../icons/like.png';
import AlergicIm from './../icons/alergic.png';
import CanNotIm from './../icons/cannot.png';

const profileIMG = 'http://en.cubadebate.cu/files/2012/10/chavez3.jpg';
const userID = {
    userName: 'Chavez2017',
    userEmail: 'yosoychavez2017@gmail.com',
    tutorName: 'Pedro Pena'
}
//gets user info and jsx
const UserInfo = (userinfo) => {
    return (
        <div>

            <div className='row profileInfo'>
                <div className='col-md-12 col-md-offset-0 col-xs-7 col-xs-offset-3' >
                    <h3> User Name: {userinfo.userinfo.userName}</h3>
                </div>
            </div>
            <div className='row profileInfo'>
                <div className='col-md-12 col-md-offset-0 col-xs-7 col-xs-offset-3' >
                    <h4> Email: {userinfo.userinfo.userEmail}</h4>
                </div>
            </div>
            <div className='row profileInfo'>
                <div className='col-md-12 col-md-offset-0 col-xs-7 col-xs-offset-3' >
                    <h4> Tutor: {userinfo.userinfo.tutorName}</h4>
                </div>
            </div>
        </div>

    )
}
//loads image for profile
const LoadProfileIm = (profileIMG) => {
    return (
        <div>
            <img className='img-thumbnail profilePic' alt='profilepic' src={profileIMG.profileIMG} />
        </div>
    )
}
//reassembles image and user info
const PersonalInfo = ({ profileIMG, userinfo }) => {
    return (
        <div className='container Personalcontainer'>
            <div className='row'>
                <div className='col-md-4 col-xs-12'>
                    <LoadProfileIm profileIMG={profileIMG} />
                </div>
                <div className='col-md-6 col-xs-12'>
                    <UserInfo userinfo={userID} />
                </div>
            </div>
        </div>


    )
}
//creates buttons for i dont like etc
const CreateButtons = (props) => {
    return (
        <div className='row'>
            <div className='col-md-10 col-md-offset-1'>
                <div className='jumbotron chooseIngredientsProfile'>
                    <div className='row'>

                        <div className='col-md-3 col-xs-3'>
                            <a href={'/dontlike'} style={{ color: 'white' }}><img className='img-circle profilebutton' src={DontLikeIm} alt="logo" /></a>
                        </div>
                        <div className='col-md-3 col-xs-3'>
                            <a href={'/profile'} style={{ color: 'white' }}><img className='img-circle profilebutton' src={LikeIm} alt="logo" /></a>
                        </div>
                        <div className='col-md-3 col-xs-3'>
                            <a href={'/profile'} style={{ color: 'white' }}><img className='img-circle profilebutton' src={AlergicIm} alt="logo" /></a>
                        </div>
                        <div className='col-md-3 col-xs-3'>
                            <a href={'/profile'} style={{ color: 'white' }}><img className='img-circle profilebutton' src={CanNotIm} alt="logo" /></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

class Profile extends React.Component {

    render() {
        return (
            <div style={{ textAlign: "center" }}>
                <div className="row">
                    <div className="col-md-1 col-xs-12" style={{ textAlign: "center", background: "#ECECEC" }}>
                        <br /> <br />
                        <LateralMenu />
                    </div>
                    <div className="col-md-11 col-xs-12" style={{ paddingTop: '30px', }}>

                        <PersonalInfo profileIMG={profileIMG} userinfo={userID} />

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