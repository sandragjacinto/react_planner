import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import ChooseMyMeal from './components/ChooseMyMeal';
import CookMyMeal from './components/CookMyMeal';
import Profile from './components/Profile';
import GroceryList from './components/GroceryList';
import MealPlanning from './components/MealPlanning';
import Login from './components/login/Login';
import DontLike from './components/DontLike';
import Allergic from './components/Allergic';
import CantEat from './components/CantEat';
import FavouriteMeals from './components/FavouriteMeals';
import LateralMenu from './components/LateralMenu.js';
import logo from './icons/home.png';
import CMMimage from './icons/chosemymeal.png';
import cooking from './icons/cooking.png';
import profile from './icons/profile.png';
import grocery from './icons/cart.png';

import { Link, Route, IndexRoute, BrowserRouter as Router } from 'react-router-dom';


const router = (

    <Router>
        <App>
                <div className='index-container'>
                    <div className="app-menu">
                        <LateralMenu />
                    </div>
                    <div className="appBody">
                        <Route exact path="/" component={Login}></Route>
                        <Route exact path="/homepage" component={Login}></Route>
                        <Route path="/choosemymeal" component={ChooseMyMeal}></Route>
                        <Route path="/cookmymeal" component={CookMyMeal} ></Route>
                        <Route path="/profile" component={Profile} ></Route>
                        <Route path="/grocerylist" component={GroceryList} ></Route>
                        <Route path="/mealplanning" component={MealPlanning} ></Route>
                        <Route path="/dontlike" component={DontLike}></Route>
                        <Route path="/allergic" component={Allergic}></Route>
                        <Route path="/canteat" component={CantEat}></Route>
                        <Route path="/favmeals" component={FavouriteMeals}></Route>

                    </div>
                </div>
        </App>
    </Router>
)
render(router, document.getElementById('root'));
registerServiceWorker();

