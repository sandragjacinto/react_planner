import React from 'react';
import { Link } from 'react-router-dom'
import "./menu.css"


const Menu = (props) => (
    <div className="menu-bar">
        <Link to = '/homepage' className="">HOME PAGE</Link>
        <Link to= '/profile' className="">PROFILE</Link>
        <Link to= '/choosemymeal' className="">CHOOSE MY MEAL</Link>
        <Link to= '/grocerylist' className="">GROCERY LIST</Link>
        <Link to= '/mealplanning' className="">MEAL PLANNING</Link>
    </div>

)

export default Menu
