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
            <h3>Personal Info</h3>
            <div className='row'>
                <div className='col-md-4 col-xs-12' >
                    <h4> User Name: </h4>
                </div>
                <div className='col-md-8 col-xs-12' >
                    <h5>{userinfo.userinfo.userName}</h5>
                </div>
            </div>
            <div className='row'>
                <div className='col-md-4 col-xs-12' >
                    <h4> Email:</h4>
                </div>
                <div className='col-md-8 col-xs-12' >
                    <h5>{userinfo.userinfo.userEmail}</h5>
                </div>
            </div>
            <div className='row'>
                <div className='col-md-4 col-xs-12' >
                    <h4> Tutor: </h4>
                </div>
                <div className='col-md-8 col-xs-12' >
                    <h5>{userinfo.userinfo.tutorName}</h5>
                </div>
            </div>
        </div>

    )
}

const LoadProfileIm = (profileIMG) => {
    return (
        <div>
            <img alt='profilepic' src={profileIMG.profileIMG} style={{ maxWidth: '100%', maxHeight: '100%' }} />
        </div>
    )
}

class Profile extends React.Component {

    render() {
        return (
            <div>
                <div className='jumbotron'>
                    <div className='row'>
                        <div className='col-md-4 col-xs-12'>
                            <LoadProfileIm profileIMG={profileIMG} />
                        </div>
                        <div className='col-md-6 col-xs-12'>
                            <UserName userinfo={userID} />
                        </div>
                    </div>
                </div>
                
                    <div className='container'>
                        <div className='row'>
                            <div className='col-md-3 col-xs-4'>
                                <button type='button' className='btn btn-danger btn-lg'>I don't like</button>
                            </div>
                            <div className='col-md-3 col-xs-4'>
                                <button type='button' className="btn btn-warning btn-lg">I'm alergic</button>
                            </div>
                            <div className='col-md-4 col-xs-4'>
                                <button type='button' className="btn btn-primary btn-lg">I can not eat</button>
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