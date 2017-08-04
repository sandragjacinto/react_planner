import React from 'react';
import base from '../base';
import {searchForRecipes} from './DataAPI';
import {isUserLogged} from './DataUser';
import {getUserLoginData} from './DataUser';

//User enters keyword here
const SearchInput = (props) => {
    return (
        <div className="input-group">
            <input type="text" className="form-control" placeholder="Enter Recipe Name" onChange={props.onChangeSearchInput} />
            <span className="input-group-btn">
                <button className="btn btn-default" type="button" onClick = {props.onClickSearchButton}>Search</button>
            </span>
        </div>
    )
}

//Component for single recipe found
const RecipeFound = (props) => {
    return(
        <li className = 'list-group-item' key = {props.index}>
            {props.element.recipe.label}
            <input 
            type = "checkbox" 
            className = "form-check-input" 
            onChange = {function(){return props.onRecipeSelected(props.index, props.element.recipe)}}
            />
        </li>
    )
}


//Component for list of found recipes
const RecipesFound = (props) =>{
    return (    
        <ul>
            {props.recipesFound.map(function(element, index){
                {return (<RecipeFound element = {element} index = {index} key = {index} onRecipeSelected = {props.onRecipeSelected}/>)}
            })}
        </ul>
    )
}

//Component for single selected recipe
const SelectedRecipe = props => {
    return(
        <li className = 'list-group-item' key = {props.index}>
            {props.element.label}
        </li>
    )
}

//Component for the selected recipes list
const SelectedRecipes = (props) => {
    //As props.recipesSelected is a map object and not an array, map method can not be used here directly. Instead, Object.keys() returns an array of the keys, which can then be used to map stuff  
    return (
        <ul className = 'list-group' style={{ textAlign: "left" }}>                
            {Object.keys(props.recipesSelected).map(function(key, index){
                return <SelectedRecipe element = {props.recipesSelected[key]} /> 
            })}
        </ul>
    )
}

class ChooseMyMeal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchWord: "",
            recipesFound:[],
            recipesSelected:{}
        }
    }

    onChangeSearchInput = (e) => {
        this.setState({ searchWord: e.target.value });
    }

    //Once user clicks search button, keyword is passed to DataAPI's searchForRecipes function.
    onClickSearchButton = () => {
        const scope = this;
        searchForRecipes(this.state.searchWord)
            .then((response) => {
                 scope.onSearchResponse(response)
            })
            .catch((error) => {
                console.error(error);
            })
    }

    //api writes response here. Update state
    onSearchResponse = (response) => {
        //console.log(response);
        this.setState({recipesFound : response});
    }

    //Once a recipe is selected, state will be updated
    onRecipeSelected = (index, recipeData) => {
        //If recipesSelected does not contain anything, create the map
        if(Object.keys(this.state.recipesSelected).length === 0)
        {
            this.setState({recipesSelected : new Map()});
        }
        
        //recipeData will be added to the map. Key will be the recipe name
        var recipesSelected = this.state.recipesSelected;
         //console.log(this.state.recipesSelected)
        if(!(recipeData.label in recipesSelected))
        {
            recipesSelected[recipeData.label] = recipeData;
            this.setState({recipesSelected:recipesSelected});
            console.log(this.state.recipesSelected)
            this.info2databasehandler();
        }
    }

    info2databasehandler(){
        const storeRef = base.database().ref(getUserLoginData().uid);
        console.log('test ' + storeRef)
        // query the firebase
        storeRef.once('value', (snapshot) => {
            const data = snapshot.val() || {};
            //Add some data to the user...
            storeRef.child('recipesInfo').update({
                recipesSelected : this.state.recipesSelected,
                })
        });
    }

    componentWillMount(){
        const storeRef = base.database().ref(getUserLoginData().uid);
        storeRef.child('recipesInfo').once('value', (snapshot) => {
            const data = snapshot.val() || {};
            if (data.recipesSelected) {
                this.setState({
                   recipesSelected : data.recipesSelected
                })
            }
        });
}


    render() {
        return (
            <div className='row'>
                <div className='col-md-6 col-xs-6'>
                    <SearchInput onChangeSearchInput={this.onChangeSearchInput} onClickSearchButton = {this.onClickSearchButton}/>
                    <RecipesFound recipesFound={this.state.recipesFound} onRecipeSelected = {this.onRecipeSelected}/>
                </div>
                <div className='col-md-6 col-xs-6'>
                    <h2>Chosen Recipes </h2>
                    <SelectedRecipes recipesSelected = {this.state.recipesSelected}/>
                    <button> accept</button>
                </div>
            </div>
        )
    }
}

export default ChooseMyMeal;