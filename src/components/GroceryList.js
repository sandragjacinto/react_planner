// feature that allows for presenting (print) the grocery list
// get the filtered list from express node

import React from 'react';
import base from '../base';
import { getUserLoginData } from './DataUser';
import garbage from './../icons/whiteTrash.png'
import cart from './../icons/cart.png';
import OnLineShopping from './OnLineShopping.js';





class GroceryList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tempgrocerieList: [],
            grocerieList: [],
            newtemp: [],
        }

        const storeRef = base.database().ref(getUserLoginData().uid);
        storeRef.child('recipesInfo').child('recipesSelected').once('value', (snapshot) => {
            const data = snapshot.val() || {};
            if (data) {
                for (var i in data) {
                    var tempList = data[i].ingredientLines;
                    
                    for (var ing in tempList) {
                        this.state.tempgrocerieList.push(tempList[ing])

                    }//

                }
            }
            this.setState({
                grocerieList: this.state.tempgrocerieList,
            })
            const storeRef = base.database().ref(getUserLoginData().uid);
            // query the firebase
            storeRef.once('value', (snapshot) => {
                const data = snapshot.val() || {};
                //Add some data to the user...
                storeRef.update({
                    grocerieList: this.state.grocerieList
                })

            });

        });



    }

    onClickDelIngredient = (reactKey) => {
        var list = this.state.grocerieList;
        list = this.state.grocerieList.filter((it, indexitem) => {
            return indexitem !== Number(reactKey.target.value);
        });
        this.setState({
            grocerieList: list
        })
        this.newIngredientListhandler();
    }

    newIngredientListhandler() {
        //grab the user  info 
        const storeRef = base.database().ref(getUserLoginData().uid);
        // query the firebase
        storeRef.once('value', (snapshot) => {
            const data = snapshot.val() || {};
            //Add some data to the user...
            storeRef.update({
                grocerieList: this.state.grocerieList
            })

        });
    }

    componentDidMount() {
        return fetch('http://localhost:3000/grocerylist')
            .then((response) => response.json())
            .then((responseJson) => {
                console.log('fetch')   
            })
            .catch((error) => {
                console.error(error);
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
            <div className="row firstElement backgroundTest" >
                <div className="col-md-10 col-md-offset-1 col-xs-10 col-xs-offset-1 whiteBackground" >
                    <div className="row ">
                        <div className='col-md-4 col-md-offset-4'>
                    <h1 className='titleH1' >GROCERY LIST</h1>
                        </div>
                        <div className='col-md-1 col-md-offset-1'>
                        <br></br>
                        <button className="btn btn-default"  type="button" onClick = {this.onEditDontLikeButton}>
                        <img style={{ width: '25px' }} src={cart} alt="cart icon" /></button>
                            </div>
                    </div>
                    {
                        this.state.grocerieList.length > 0 ?
                        (
                            <div>
                                {this.state.grocerieList.map((item, index) => {
                                    return (
                                        <div className='row' key={index}>
                                        <div className='col-md-8 col-md-offset-2 list-group-item bodyText groceryItem' style={{ textAlign: 'left', minHeight: '100px', marginBottom:'20px' }}>
                                            <div className='row '>
                                            <br></br>
                                            <div className='col-md-8 col-md-offset-1 col-xs-8 col-xs-offset-1'>
                                                <h4 >
                                                    {item.toUpperCase()}
                                                </h4>
                                            </div>
                                            <div className='col-md-1 col-md-offset-1 col-xs-1 col-xs-offset-1' >
                                                <button className="btn btn-danger" value={index} type="button" onClick={this.onClickDelIngredient}>
                                                <img style={{ width: '25px' }} src={garbage} alt="garbage icon"/></button>
                                            </div>
                                            </div>
                                        </div>
                                        </div>
                                    )
                                })}
                                </div>
                                )

                            :
                            <div>
                            <br></br>
                            <br></br>
                                <h3 className='titleH1 errorMessage' >OOPS! YOU HAVEN'T CHOSEN ANY MEAL YET ...</h3>
                                </div>
                                }
                                <OnLineShopping isShown = {this.state.isDontLikePopupShown} onClose = {this.onClosePopup}/>
                    </div>
                </div>
            </div>
                )
    }

}

export default GroceryList;