import React from 'react';
import { Link } from 'react-router-dom'
import base from '../base';
import {isUserLogged} from './DataUser';
import {getUserLoginData} from './DataUser';
import {setUserData} from './DataUser';
import {IngredientListComp, DontLike} from './DontLike.js';
import DontLikeIm from './../icons/dontlike.png';
import LikeIm from './../icons/like.png';
import AlergicIm from './../icons/alergic.png';
import CanNotIm from './../icons/cannot.png';
import editIcon from './../icons/edit.png';

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
            <img className='profilePic img-circle' alt='profilepic' src={imLink} />
        </div>
    )
}
//reassembles image and user info
const PersonalInfo = ({ profileIMG, username, userEmail }) => {
    return (
        <div className='card userPhoto text-center'>
            <div className = 'card-header'>
                <LoadProfileIm profileIMG={profileIMG} />
            </div>
            <UserInfo username={username}/>
        </div>
    )
}

const DontLikeIngredients = (props) => {
    console.log("Profile DontLikeIngredients props.listDontLike:", props.listDontLike)
    return (
        <div className = 'card card-inverse card-success mb-3 text-center'>
            <div className = 'card-header'>
                I dont't like
                <div className = 'btn-toolbar pull-right'>
                    <div className = 'btn-group'>
                        <div>
                            <button className = 'btn btn-primary menu-recipe-button' onClick = {props.onClick}><img style = {{width : '20px'}} src = {editIcon}></img></button>                  
                        </div>
                    </div>
                </div>
            </div>


            <div className = 'card-block'>
                <IngredientListComp listDontLike={props.listDontLike} onClickDelIngredient={function(){}}/>
            </div>
        </div>
    );
}

class Profile extends React.Component {
     constructor(props) {
        super(props);
        this.state = {
            owner: '',
            picture: '',
            userEmail: '',
            isDontLikePopupShown: false,
            listDontLike:[]
        } 
    }

    componentWillMount()
    {
        console.log("Profile componentWillMount");
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

        this.updateRestrictionsData();
    }

    updateRestrictionsData = () =>    
    {
        const storeRef = base.database().ref(getUserLoginData().uid);
        storeRef.child('restricitons').once('value', (snapshot) => {
            const data = snapshot.val() || {};
            if (data.dontlike) {
                this.setState({
                listDontLike : data.dontlike
                })
            }
        });
    }

    onEditDontLikeButton = () =>
    {
        this.setState({isDontLikePopupShown:true});
    }

    onClosePopup = () =>
    {
        this.setState({isDontLikePopupShown:false});
        this.updateRestrictionsData();
    }

    render() {
        return (
            <div style={{ textAlign: "center" }} className = 'backgroundTest'>
                <div className="row firstElement">
                    <div style={{ paddingTop: '30px', }}>
                        <PersonalInfo profileIMG={this.state.picture} username={this.state.owner} userEmail={this.state.userEmail} />
                        <br></br>
                        <DontLikeIngredients listDontLike = {this.state.listDontLike} onClick = {this.onEditDontLikeButton}/>
                        <DontLike isShown = {this.state.isDontLikePopupShown} onClose = {this.onClosePopup}/>                        
                    </div>

                </div>
            </div>

        )
    }
}

export default Profile;