import React from 'react';
import base from '../base';
import LateralMenu from './LateralMenu.js';
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
                            <button key={index} className="btn btn-danger" value={index} type="button" >x</button>
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
                    var ll = tempList.length
                    console.log(tempList.length)
                    for (var ing in tempList) {
                        var grocerieLists = this.state.tempgrocerieList.push(tempList[ing])

                    }//

                }
            }
            //console.log (this.state.tempgrocerieList)
            this.setState({
                grocerieList: this.state.tempgrocerieList,
            })
            // console.log(this.state.grocerieList)
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
                                        <button key={index} className="btn btn-danger" value={index} type="button" >x</button>
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