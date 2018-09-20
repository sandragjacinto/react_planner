import React from 'react';
import base from '../base';
import { getUserLoginData } from './DataUser';
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
            {props.listFavoutiteMeals.map((ing, index) => {
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

class FavouriteMeals extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newFavouriteMeals: '',
            listFavoutiteMeals: [],
            ItemIndex: '',
            listDelFavouriteMeal: '',
            favouriteMeals: [],
            
        }
    }

    onChangIngrdientInput = (e) => {
        this.setState({ newFavouriteMeals: e.target.value });
    }

    onClickAddIngredient = () => {

        var listFavoutiteMeals = this.state.listFavoutiteMeals.concat(this.state.newFavouriteMeals)
        this.setState({
            listFavoutiteMeals: listFavoutiteMeals
        });
        this.newFavouriteMealshandler();
    }

    onClickDelIngredient = (reactKey) => {
        var lis = this.state.listFavoutiteMeals;
        lis = this.state.listFavoutiteMeals.filter((it, indexitem) => {
            return indexitem !== Number(reactKey.target.value);
        });
        this.setState({
            listFavoutiteMeals: lis
        })
        this.newFavouriteMealshandler();
    }

    newFavouriteMealshandler() {
        //grab the user  info 
        const storeRef = base.database().ref(getUserLoginData().uid);
        // query the firebase
        storeRef.once('value', (snapshot) => {
            const data = snapshot.val() || {};
            //Add some data to the user...
            storeRef.child('restricitons').update({
                favouriteMeals: this.state.listFavoutiteMeals
            })

        });
    }
componentWillMount()
{
        const storeRef = base.database().ref(getUserLoginData().uid);
       storeRef.child('restricitons').once('value', (snapshot) => {
            const data = snapshot.val() || {};
            if (data.favouriteMeals) {
                this.setState({
                   listFavoutiteMeals : data.favouriteMeals
                })
            }
        });
}

    render() {
        return (
            <div className='card'>
                <div className='card-block'>
                    <h1 className="card-title">My Favourite Meals</h1>
                    <IngredientInput onChangIngrdientInput={this.onChangIngrdientInput} onClickAddIngredient={this.onClickAddIngredient} />
                    <IgredientListComp listFavoutiteMeals={this.state.listFavoutiteMeals} onClickDelIngredient={this.onClickDelIngredient} />
                    <SaveButton />
                </div>
            </div>
        )
    }
}

export default FavouriteMeals;