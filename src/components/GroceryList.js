import React from 'react';
import LateralMenu from './LateralMenu.js'


class GroceryList extends React.Component {

    render() {
        return (
            <div style={{ textAlign: "center" }}>
                <div className="row">

                    <div className="col-md-11 col-xs-12" style={{ paddingTop: '30px', }}>

                        <h2>Grocery List</h2>
                    </div>
                </div>
            </div>
        )
    }
}

export default GroceryList;