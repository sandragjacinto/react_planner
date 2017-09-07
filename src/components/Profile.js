import React from 'react';
import { Link } from 'react-router-dom'
import base from '../base';
import {isUserLogged} from './DataUser';
import {getUserLoginData} from './DataUser';
import {setUserData} from './DataUser';
import DontLike from './DontLike.js';
import DontLikeIm from './../icons/dontlike.png';
import LikeIm from './../icons/like.png';
import AlergicIm from './../icons/alergic.png';
import CanNotIm from './../icons/cannot.png';



//gets user info and jsx
const UserInfo = (props) => {
    return (
        <div className='row'>
            <h3>{props.username}</h3>
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
        <div className='card userPhoto text-center'>
            <LoadProfileIm profileIMG={profileIMG} />
            <UserInfo username={username}/>
        </div>
    )
}

const DontLikeIngredients = () => {
    return (
        <div className = 'card card-inverse card-success mb-3 text-center'>
            <div className = 'card-header'>
                Allergies  
            </div>
            <div className = 'card-block'>
                <p className = 'card-text'>Some allergies here</p>
            </div>
        </div>
    );
}

//creates buttons for i dont like etc
const CreateButtons = (props) => {
    return (
        <div className='row'>
            <div className='col-md-11 col-md-offset-1'>
                <div className='jumbotron'>
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
            isDontLikePopupShown: false
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

    onEditDontLikeButton = () =>
    {
        this.setState({isDontLikePopupShown:true});
    }

    onClosePopup = () =>
    {
        this.setState({isDontLikePopupShown:false});
    }

    render() {
        return (
            <div style={{ textAlign: "center" }}>
                <div className="row firstElement">
                    <div style={{ paddingTop: '30px', }}>
                        <PersonalInfo profileIMG={this.state.picture} username={this.state.owner} userEmail={this.state.userEmail} />
                        <CreateButtons />
                        <DontLikeIngredients />
                        <DontLike isShown = {this.state.isDontLikePopupShown} onClose = {this.state.onClosePopup}/>
                        <button onClick = {this.onEditDontLikeButton}>TEST Edit Dont Like Shit</button>

                    </div>

                </div>
            </div>

        )
    }
}

export default Profile;