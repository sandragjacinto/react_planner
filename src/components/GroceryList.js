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
    /*
    constructor(props) {
        super(props);
        this.state = {
            tempgrocerieList: [],
            grocerieList: [],
        }
        
    }

    componentWillMount() {
        const storeRef = base.database().ref(getUserLoginData().uid);
        storeRef.child('recipesInfo').child('recipesSelected').once('value', (snapshot) => {
            const data = snapshot.val() || {};
            //console.log(data)
            if (data) {
            for (var i in data) {
                var grocerieList = this.state.grocerieList.concat(data[i].ingredientLines)
                //console.log(data[i].ingredientLines);
            }
            }
            this.setState({
                grocerieList: grocerieList,
            })
        });
    }
    thi



    render() {
        console.log(this.state.grocerieList)
        return (
            <div style={{ textAlign: "center" }}>
                <div className="row">
                    <div className="col-md-11 col-xs-12" style={{ paddingTop: '30px', }}>
                        <GroceryListItems grocerieList={this.state.grocerieList} />
                    </div>
                </div>
            </div>
        )
    }
*/

    render() {
        
        return (
            <div style={{ textAlign: "center" }}>
                <div className="row">
                    <div className="col-md-11 col-xs-12" style={{ paddingTop: '30px', }}>
                        <h2>Working in progress...</h2>
                    </div>
                </div>
            </div>
        )
    }
}

export default GroceryList;