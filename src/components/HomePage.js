import React from 'react';
import { Link } from 'react-router-dom';
import Login from './Login';
import { isUserLogged } from './DataUser.js';



class HomePage extends React.Component {


    render() {
        return (
            <div>
                <Login />
            </div>


        )
    }
}

export default HomePage;