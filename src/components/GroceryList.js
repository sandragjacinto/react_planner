// feature that allows for presenting (print) the grocery list
// get the filtered list from express node

import React from 'react';
import base from '../base';
import ChooseMyMeal from './ChooseMyMeal.js';
import { getUserLoginData } from './DataUser';

const GroceryListItems = (props) => {
    <div className='row'>
        <div className="col-md-6 col-md-offset-3 col-xs-8 col-xs-offset-2 ingredientsList">
            {props.grocerieList.map((groceryItem, index) => {
                return (
                    <div className='row list-group-item '>
                        <div className='col-md-9 col-xs-9'>
                            <h4 key={index}>
                                {groceryItem}
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
}

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

    render() {

        return (
            <div style={{ textAlign: "center" }}>
                <div className="row">
                    <div className="col-md-11 col-xs-12" style={{ paddingTop: '30px', }}>
                        <h2>Grocerie List</h2>
                        {this.state.grocerieList.map((item, index) => {
                            return (
                                <div className='row list-group-item '>
                                    <div className='col-md-9 col-xs-9'>
                                        <h4 key={index}>
                                            {item}
                                        </h4>
                                    </div>
                                    <div className='col-md-1 col-md-offset-2 col-xs-1 col-xs-offset-2' >
                                    <button key={index} className="btn btn-danger" value={index} type="button" onClick={this.onClickDelIngredient}>x</button>
                                    </div>
                                </div>
                            )
                        }
                        )}
                    </div>
                </div>
            </div>
        )
    }

}

export default GroceryList;