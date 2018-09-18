import React from 'react';
import { Link } from 'react-router-dom'
import logo from './../icons/home.png';
import CMMimage from './../icons/chosemymeal.png';
import cooking from './../icons/cooking.png';
import profile from './../icons/profile.png';
import grocery from './../icons/cart.png';

const LateralMenu = (props) => (
    <div className=' lateralMenu '>
        <Link to = '/homepage' className='btn btn-default btn-md menuButton'>HOME PAGE</Link>
        <Link to= '/profile' className='btn btn-default btn-md menuButton'>PROFILE</Link>
        <Link to= '/choosemymeal' className='btn btn-default btn-md menuButton'>CHOOSE MY MEAL</Link>
        <Link to= '/grocerylist' className='btn btn-default btn-md menuButton'>GROCERY LIST</Link>
        <Link to= '/mealplanning' className='btn btn-default btn-md menuButton'>MEAL PLANNING</Link>
    
    </div>

)

export default LateralMenu
