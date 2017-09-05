import React from 'react';
import { Link } from 'react-router-dom';
import Login from './Login';
import hp1 from './../icons/hp1.jpg';
import hp2 from './../icons/hp2.jpg';
import hp3 from './../icons/hp3.jpg';
import hp4 from './../icons/hp4.jpg';
import {isUserLogged} from './DataUser.js';



class HomePage extends React.Component  {
   

    render()
    {
        return  (
            <div>
    
                <Login />
  
  
            </div>   

                
        )
    }
} 

export default HomePage;