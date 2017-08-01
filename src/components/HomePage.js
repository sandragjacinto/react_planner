import React from 'react';
import LateralMenu from './LateralMenu.js'



class HomePage extends React.Component  {
   

    render()
    {
        return  (
            <div style={{ textAlign: "center" }}>
                 <div className="row">
                    
                        <LateralMenu />
                    
                    <div className="col-md-9 col-xs-12" style={{ paddingTop: '30px', }}>

                        <h2>Home Page</h2>

                    </div>

                </div>
            </div>
        )
    }
} 

export default HomePage;