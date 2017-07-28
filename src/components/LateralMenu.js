import React from 'react';
import { Link } from 'react-router-dom'
import logo from './../icons/home.png';
import CMMimage from './../icons/chosemymeal.png';
import cooking from './../icons/cooking.png';
import profile from './../icons/profile.png';
import grocery from './../icons/cart.png';

const LateralMenu = (props) => (
    <ul style={{ paddingLeft: '30px', }} className="nav nav-pills nav-stacks">
        <a href={'/profile'} style={{ color: 'white' }}><img className="img-responsive" src={profile} alt="logo" /></a>
        <a href={'/homepage'} style={{ color: 'white' }}><img className="img-responsive" src={logo} alt="logo" /></a>
        <a href={'/choosemymeal'} style={{ color: 'white' }}><img className="img-responsive" src={CMMimage} alt="logo" /></a>
        <a href={'/cookmymeal'} style={{ color: 'white' }}><img className="img-responsive" src={cooking} alt="logo" /></a>
        <a href={'/grocerylist'} style={{ color: 'white' }}><img className="img-responsive" src={grocery} alt="logo" /></a>
        <a href={'/mealplanning'} style={{ color: 'white' }}><img className="img-responsive" src={grocery} alt="logo" /></a>
    </ul>

)

export default LateralMenu