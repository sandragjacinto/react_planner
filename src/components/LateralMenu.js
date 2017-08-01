import React from 'react';
import { Link } from 'react-router-dom'
import logo from './../icons/home.png';
import CMMimage from './../icons/chosemymeal.png';
import cooking from './../icons/cooking.png';
import profile from './../icons/profile.png';
import grocery from './../icons/cart.png';

const LateralMenu = (props) => (
    <div className=' lateralMenu lateralmenudiv'>
         <br /> <br />
        <a href={'/profile'} className='btn btn-default btn-md menuButton'>PROFILE</a>
        <a href={'/homepage'} className='btn btn-default btn-md menuButton'>HOME PAGE</a>
        <a href={'/choosemymeal'} className='btn btn-default btn-md menuButton'>CHOOSE MY MEAL</a>
        <a href={'/cookmymeal'} className='btn btn-default btn-md menuButton'>COOK MY MEAL</a>
        <a href={'/grocerylist'} className='btn btn-default btn-md menuButton'>GROCERY LIST</a>
        <a href={'/mealplanning'} className='btn btn-default btn-md menuButton'>MEAL PLANNING</a>
    
    </div>

)

export default LateralMenu
