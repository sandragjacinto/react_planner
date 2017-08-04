import React from 'react';
import Profile from './Profile.js'
import base from '../base';
import { getUserLoginData } from './DataUser';
import { setUserData } from './DataUser';
import { Link } from 'react-router-dom'





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

const IgredientListComp = (props) => (
    <div className='row'>
        <div className="col-md-6 col-md-offset-3 col-xs-8 col-xs-offset-2 ingredientsList">
            {props.listAllergic.map((ing, index) => {
                return (
                    <div className='row list-group-item '>
                        <div className='col-md-9 col-xs-9'>
                            <h4 key={index}>
                                {ing}
                            </h4>
                        </div>
                        <div className='col-md-1 col-md-offset-2 col-xs-1 col-xs-offset-2' >
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

class Allergic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newIngredientAllergic: '',
            listAllergic: [],
            ItemIndex: '',
            listDelAllergic: '',
            allergic: [],
        }
    }

    onChangIngrdientInput = (e) => {
        this.setState({ newIngredientAllergic: e.target.value });
        //    console.log(this.state.newIngredientAllergic);
    }

    onClickAddIngredient = () => {

        var listAllergic = this.state.listAllergic.concat(this.state.newIngredientAllergic)
        this.setState({
            listAllergic: listAllergic
        });
        this.newallergichandler();
        //      console.log(this.state.listAllergic)
    }

    onClickDelIngredient = (reactKey) => {
        var lis = this.state.listAllergic;
        lis = this.state.listAllergic.filter((it, indexitem) => {
            return indexitem !== Number(reactKey.target.value);
        });
        this.setState({
            listAllergic: lis
        })
        this.newallergichandler();
        console.log(lis)
    }

    newallergichandler() {
        //grab the user  info 
        const storeRef = base.database().ref(getUserLoginData().uid);
        console.log('test ' + storeRef)
        // query the firebase
        storeRef.once('value', (snapshot) => {
            const data = snapshot.val() || {};
            //Add some data to the user...
            storeRef.child('restricitons').update({
                allergic: this.state.listAllergic
            })

        });
    }
componentWillMount()
{
        const storeRef = base.database().ref(getUserLoginData().uid);
        storeRef.child('restricitons').once('value', (snapshot) => {
            const data = snapshot.val() || {};
            console.log(data)
            if (data.allergic) {
                this.setState({
                   listAllergic : data.allergic
                })
            }
        });
}

    render() {
        return (
            <div className='card'>
                <div className='card-block'>
                    <h1 className="card-title">My Allergies</h1>
                    <IngredientInput onChangIngrdientInput={this.onChangIngrdientInput} onClickAddIngredient={this.onClickAddIngredient} />
                    <IgredientListComp listAllergic={this.state.listAllergic} onClickDelIngredient={this.onClickDelIngredient} />
                    <SaveButton />
                </div>
            </div>
        )
    }
}

export default Allergic;