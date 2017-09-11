import React from 'react';
import Profile from './Profile.js'
import base from '../base';
import { getUserLoginData } from './DataUser';
import { setUserData } from './DataUser';
import { Link } from 'react-router-dom'
import { Modal } from 'react-bootstrap';

const IngredientInput = (props) => {
    return (
        <div className="col-md-8 col-md-offset-2 col-xs-10 col-xs-offset-1 input-group inputIngredient">
            <input type="text" className="form-control" placeholder="Enter Ingredients" onChange={props.onChangIngrdientInput} />
            <span className="input-group-btn">
                <button className="btn btn-success" type="button" onClick={props.onClickAddIngredient}>ADD</button>
            </span>
        </div>
    )
}

export const AIngredientListComp = (props) => (
    <div className='row'>
        <div className="col-md-10 col-md-offset-1 col-xs-8 col-xs-offset-2 ingredientsList">
            {props.listDontLike.map((ing, index) => {
                return (
                    <div className='row list-group-item bodyText'>
                        <div className = 'col-md-9 col-xs-9'>
                            <h4 key={index}>
                                {ing}
                            </h4>
                        </div>
                        <div className='col-md-1 col-md-offset-2 col-xs-1 col-xs-offset-2'>
                            <button key={index} className="btn btn-danger" value={index} type="button" onClick={props.onClickDelIngredient}>x</button>
                        </div>
                    </div>
                )
            })
            }
        </div>
    </div>
)

const SaveButton = (props) => (
    <div className='row'>
        <div className="col-md-8 col-md-offset-2 col-xs-10 col-xs-offset-1">
            <Link to={'/profile'} className="btn btn-danger">SAVE MY CHOICE</Link>
        </div>
    </div>
)

export class ADontLike extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newIngredientDontLike: '',
            listDontLike: [],
            ItemIndex: '',
            listDelDontLike: '',
            dontlike: [],
        }
    }

    onChangIngrdientInput = (e) => {
        this.setState({ newIngredientDontLike: e.target.value });
        //    console.log(this.state.newIngredientDontLike);
    }

    onClickAddIngredient = () => {

        var listDontLike = this.state.listDontLike.concat(this.state.newIngredientDontLike)
        this.setState({
            listDontLike: listDontLike
        });
        this.newdontLikehandler();
        //      console.log(this.state.listDontLike)
    }

    onClickDelIngredient = (reactKey) => {
        var lis = this.state.listDontLike;
        lis = this.state.listDontLike.filter((it, indexitem) => {
            return indexitem !== Number(reactKey.target.value);
        });
        this.setState({
            listDontLike: lis
        })
        this.newdontLikehandler();
        console.log(lis)
    }

    newdontLikehandler() {
        //grab the user  info 
        const storeRef = base.database().ref(getUserLoginData().uid);
        console.log('test ' + storeRef)
        // query the firebase
        storeRef.once('value', (snapshot) => {
            const data = snapshot.val() || {};
            //Add some data to the user...
            storeRef.child('restricitons').update({
                dontlike: this.state.listDontLike
            })

        });
    }
    
    componentWillMount()
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

    render() {
        var scope = this;
        return (
          
        <div className="static-modal bodyText">

            <Modal show={this.props.isShown} onHide={function () { scope.props.onClose() }}>
            
            <Modal.Header closeButton>
                <Modal.Title className='titleH1' style={{textAlign:'center'}}>EDIT INGREDIENTS</Modal.Title>
            </Modal.Header>
            
            <Modal.Body>
                <IngredientInput onChangIngrdientInput={this.onChangIngrdientInput} onClickAddIngredient={this.onClickAddIngredient} />
                <AIngredientListComp listDontLike={this.state.listDontLike} onClickDelIngredient={this.onClickDelIngredient} />
                <SaveButton />
            </Modal.Body>
            
            <Modal.Footer>
                {<button className='btn btn-success bodyText' onClick={() => {
                this.props.onClose();
                }
                }>Close</button>}
            </Modal.Footer>
            
            </Modal>

        </div>




        )
    }
}

export default ADontLike;