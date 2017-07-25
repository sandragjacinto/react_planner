import React from 'react';


const profileIMG = 'http://en.cubadebate.cu/files/2012/10/chavez3.jpg';
const userID = {
    userName: 'Chavez2017',
    userEmail: 'yosoychavez2017@gmail.com',
    tutorName: 'Pedro Pena'
}

const UserName = (userinfo) => {
    return (
        <div>
            <div className='row'>
                    <div className='col-md-3 col-xs-3' style={{textAlign:'right'}}>
                        <p> User Name:</p>
                    </div>
                    <div className='col-md-4 col-xs-4' style={{textAlign:'left'}}>
                        <p>{userinfo.userinfo.userName}</p>
                    </div>
            </div>
            <div className='row'>
                <div className='col-md-3 col-xs-3' style={{textAlign:'right'}}>
                    <p>  Email :</p>
                </div>
                <div className='col-md-4 col-xs-4' style={{textAlign:'left'}}>
                    <p>{userinfo.userinfo.userEmail}</p>
                </div>
            </div>
            <div className='row'>
                <div className='col-md-3 col-xs-3' style={{textAlign:'right'}}>
                    <p> Tutor Name :</p>
                </div>
                <div className='col-md-4 col-xs-4' style={{textAlign:'left'}}>
                    <p>{userinfo.userinfo.tutorName}</p>
                </div>
            </div>
        </div>

    )
}

const LoadProfileIm =(profileIMG) =>{
return(
<img alt='profilepic' src={profileIMG.profileIMG} style={{ maxWidth: '100%', maxHeight:'100%' }} />
)}

class Profile extends React.Component {

    render() {
        return (
            <div>
                <div className='jumbotron'>
                    <div className='row'>
                        <div className='col-md-5 col-xs-5'>
                            <h2>Profile</h2>
                            <LoadProfileIm profileIMG={profileIMG} />
                        </div>
                        <div className='col-md-7 col-xs-7'>
                            <h3>Personal Info</h3>
                            <UserName userinfo={userID} />
                        </div>
                    </div>
                </div>
                <div className='card'>
                    <div className='card-block'>
                <div className='row'>
                    <div className='col-md-4 col-xs-4'>
                        <button type='button' className='btn btn-danger btn-lg'>I don't like</button>
                        </div>
                        <div className='col-md-4 col-xs-4'>
                        <button type='button' className="btn btn-warning btn-lg">I'm alergic</button>
                        </div>
                        <div className='col-md-4 col-xs-4'>
                        <button type='button' className="btn btn-primary btn-lg">I can not eat</button>
                        </div>
                </div>
                </div>
                </div>
                <div className='jumbotron'>
                    <h3> App Settings </h3>
                    </div>
            </div>
        )
    }
}

export default Profile;