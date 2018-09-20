import React from 'react';
import base from '../base';
import { getUserLoginData } from './DataUser';
import { IngredientListComp, DontLike } from './DontLike.js';

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
    var imLink = startLink + IimUID + dim;
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
            <div className='card-header'>
                <LoadProfileIm profileIMG={profileIMG} />
            </div>
            <div  >
                <UserInfo username={username} />
            </div>
        </div>
    )
}

const DontLikeIngredients = (props) => {
    return (

        <div className='card  text-center' style={{ backgroundColor: 'white' }}>

            <div className='card-header titleH1'>
                I DON'T LIKE
                <div className='btn-toolbar pull-right'>
                    <div className='btn-group'>
                        <div>
                            <img onClick={props.onClick} style={{ width: '30px', marginBottom: '5px', marginRight: '10px' }} src={editIcon} alt="don't like icon"></img>
                        </div>
                    </div>
                </div>
            </div>


            <div className='card-block'>
            <br></br>
                <IngredientListComp listDontLike={props.listDontLike} onClickDelIngredient={function () { }} />
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
            listDontLike: [],
            isAllerLikePopupShown : false        }
    }

    componentWillMount() {
        const storeRef = base.database().ref(getUserLoginData().uid);
        storeRef.once('value', (snapshot) => {
            const data = snapshot.val() || {};
            if (data) {
                this.setState({
                    owner: data.owner,
                    picture: data.picture,
                    userEmail: data.email
                })
            }
        });

        this.updateRestrictionsData();
    }

    updateRestrictionsData = () => {
        const storeRef = base.database().ref(getUserLoginData().uid);
        storeRef.child('restricitons').once('value', (snapshot) => {
            const data = snapshot.val() || {};
            if (data.dontlike) {
                this.setState({
                    listDontLike: data.dontlike
                })
            }
            
        });
    }

    onEditDontLikeButton = () => {
        this.setState({ isDontLikePopupShown: true });
    }

    onClosePopup = () => {
        this.setState({ isDontLikePopupShown: false });
        this.updateRestrictionsData();
    }


    render() {
        return (
            <div style={{ textAlign: "center" }}>
                <div className="row firstElement backgroundTest">
                <div className="col-md-10 col-md-offset-1 col-xs-10 col-xs-offset-1">
                                <PersonalInfo profileIMG={this.state.picture} username={this.state.owner} userEmail={this.state.userEmail} />
                                <br></br>
                                </div>
                                <div className='row no-padding'>
                                
                                <div className='col-md-10 col-md-offset-1'>
                                <DontLikeIngredients listDontLike={this.state.listDontLike} onClick={this.onEditDontLikeButton} />
                                <DontLike isShown={this.state.isDontLikePopupShown} onClose={this.onClosePopup} />
                                </div>
                               
                            </div>
                        </div>
                    </div>


        )
    }
}

export default Profile;