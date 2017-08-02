import React from 'react';
import {render} from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import ChooseMyMeal from './components/ChooseMyMeal';
import CookMyMeal from './components/CookMyMeal';
import Profile from './components/Profile';
import GroceryList from './components/GroceryList';
import MealPlanning from './components/MealPlanning';
import HomePage from './components/HomePage';
import DontLike from './components/DontLike';
import LateralMenu from './components/LateralMenu.js';
import logo from './icons/home.png';
import CMMimage from './icons/chosemymeal.png';
import cooking from './icons/cooking.png';
import profile from './icons/profile.png';
import grocery from './icons/cart.png';

import { Link, Route, IndexRoute, BrowserRouter as Router } from 'react-router-dom';


const router=(

    <Router>
    <App>
    <div style={{ textAlign: "center" }}>
        <ul style={{ paddingLeft: '30px', }} className="nav nav-pills nav-stacks">
        <Link to={'/profile'} style={{ color: 'white' }}><img className="img-responsive" src={profile} alt="logo" /></Link>
        <Link to={'/homepage'} style={{ color: 'white' }}><img className="img-responsive" src={logo} alt="logo" /></Link>
        <Link to={'/choosemymeal'} style={{ color: 'white' }}><img className="img-responsive" src={CMMimage} alt="logo" /></Link>
        <Link to={'/cookmymeal'} style={{ color: 'white' }}><img className="img-responsive" src={cooking} alt="logo" /></Link>
        <Link to={'/grocerylist'} style={{ color: 'white' }}><img className="img-responsive" src={grocery} alt="logo" /></Link>
        <Link to={'/mealplanning'} style={{ color: 'white' }}><img className="img-responsive" src={grocery} alt="logo" /></Link>
    </ul>
            
              <Route exact path="/" component={HomePage}></Route>
              <Route exact path="/homepage" component={HomePage}></Route>
              <Route path="/choosemymeal" component={ChooseMyMeal}></Route>
              <Route path="/cookmymeal" component={CookMyMeal} ></Route>
              <Route path="/profile" component={Profile} ></Route>
              <Route path="/grocerylist" component={GroceryList} ></Route>
              <Route path="/mealplanning" component={MealPlanning} ></Route>
              <Route path="/dontlike" component={DontLike}></Route>
            
        </div>
        </App>
    </Router>
    )
    render(router, document.getElementById('root'));
    registerServiceWorker();

