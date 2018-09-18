import React from 'react';
import { Link } from 'react-router-dom';
import Login from './login/Login';


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