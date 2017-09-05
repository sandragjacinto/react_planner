import React from 'react';
import { Link } from 'react-router-dom';
import Login from './Login';
import loginIm from './../icons/login_image.jpg';
import {isUserLogged} from './DataUser.js';



class HomePage extends React.Component  {
   

    render()
    {
        return  (
            <div>
                <section className='loginSection'>
                    <div className='row'>
                <div className='col-md-6'>
                <img className='loginIm' alt='loginIm' src={loginIm} />
                </div>
                <div className='col-md-6'>
                <Login />
                </div>
                </div>
                </section>

                <section className='explainApp'>
                    <p>dsfsdfsd</p>
                </section>
  
  
            </div>   

                
        )
    }
} 

export default HomePage;