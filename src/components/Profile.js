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
            <h1 className='titleH1'>{props.username}</h1>
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
        <div className='card userPhoto text-center whiteBackground'>
            <div className = 'card-header'>
                <LoadProfileIm profileIMG={profileIMG} />
            </div>
            <div  >
            <UserInfo username={username}/>
            </div>
        </div>
    )
}

const DontLikeIngredients = (props) => {
    console.log("Profile DontLikeIngredients props.listDontLike:", props.listDontLike)
    return (
        <div className='row'>
            <div className='col-md-10 col-md-offset-1 col-xs-10 col col-xs-offset-1'>
        <div className = 'card card-inverse card-success mb-3 text-center' style={{backgroundColor:'white'}}>
            <div className = 'card-header'>
                I dont't like
                <div className = 'btn-toolbar pull-right'>
                    <div className = 'btn-group'>
                        <div>
                            <img onClick = {props.onClick}  style = {{width : '30px', marginBottom:'5px', marginRight:'10px'}} src = {editIcon}></img>
                        </div>
                    </div>
                </div>
            </div>


            <div className = 'card-block'>
                <IngredientListComp listDontLike={props.listDontLike} onClickDelIngredient={function(){}}/>
            </div>
            </div>
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
                    <div >
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