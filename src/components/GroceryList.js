// feature that allows for presenting (print) the grocery list
// get the filtered list from express node

import React from 'react';
import base from '../base';
import ChooseMyMeal from './ChooseMyMeal.js';
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
                    //var ll = tempList.length
                    //console.log(tempList.length)
                    for (var ing in tempList) {
                        //  var tempNouns = wordpos.getNouns(tempList[ing]);
                        var grocerieLists = this.state.tempgrocerieList.push(tempList[ing])

                    }//

                }
            }
            //console.log (this.state.tempgrocerieList)
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
        var lis = this.state.grocerieList;
        lis = this.state.grocerieList.filter((it, indexitem) => {
            return indexitem !== Number(reactKey.target.value);
        });
        this.setState({
            grocerieList: lis
        })
        this.newIngredientListhandler();
        console.log(lis)
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
        console.log('fetch0')
        return fetch('http://localhost:3000/grocerylist')
        console.log('fetch1')
            .then((response) => response.json())
            .then((responseJson) => {
                console.log('fetch')
                // let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                //this.setState({
                // isLoading: false,
                //dataSource: ds.cloneWithRows(responseJson.movies),
                //}, function() {
                // do something with new state
                // });
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
console.log('gocerie list', this.state.grocerieList.length)
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
                        <button className="btn btn-default"  type="button" onClick = {this.onEditDontLikeButton}><img style={{ width: '25px' }} src={cart} /></button>
                            </div>
                    </div>
                    {
                        this.state.grocerieList.length > 0 ?
                        (
                            <div>
                                {this.state.grocerieList.map((item, index) => {
                                    return (
                                        <div className='row'>
                                        <div className='col-md-8 col-md-offset-2 list-group-item bodyText groceryItem' style={{ textAlign: 'left', minHeight: '100px', marginBottom:'20px' }}>
                                            <div className='row '>
                                            <br></br>
                                            <div className='col-md-8 col-md-offset-1 col-xs-8 col-xs-offset-1'>
                                                <h4 key={index}>
                                                    {item.toUpperCase()}
                                                </h4>
                                            </div>
                                            <div className='col-md-1 col-md-offset-1 col-xs-1 col-xs-offset-1' >
                                                <button key={index} className="btn btn-danger" value={index} type="button" onClick={this.onClickDelIngredient}><img style={{ width: '25px' }} src={garbage} /></button>
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