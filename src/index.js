import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import ChooseMyMeal from './components/ChooseMyMeal';

import { BrowserRouter as Router, Route } from 'react-router-dom'


ReactDOM.render(

    <Router>
        <App>
            <Route path="/choosemymeal" component={ChooseMyMeal} />
        </App>
    </Router>
    ,
    document.getElementById('root'));
registerServiceWorker();
