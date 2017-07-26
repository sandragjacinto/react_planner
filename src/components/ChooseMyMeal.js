import React from 'react';
import {searchForRecipes} from './DataAPI';

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

//Single recipe found component
const RecipeFound = (props) => {
    return(
        <li className = 'list-group-item' key = {props.index}>
            {props.element.recipe.label}
            <input 
            type = "checkbox" 
            className = "form-check-input" 
            onClick = {function(){return props.onRecipeSelected(props.index, props.element.recipe)}}
            />
        </li>
    )
}


//List of found recipes component
const RecipesFound = (props) =>{
    return (    
        <ul>
            {props.recipesFound.map(function(element, index){
                {return (<RecipeFound element = {element} index = {index} key = {index} onRecipeSelected = {props.onRecipeSelected}/>)}
            })}
        </ul>
    )
}

const SelectedRecipe = props => {
    return(
        <li className = 'list-group-item' key = {props.index}>
            {props.element.label}
        </li>
    )
}

const SelectedRecipes = (props) => {
    //As props.recipesSelected is a map object, not an array, map method can not be used here. Instead, Object.keys() returns an array of the keys, which can then be used to map stuff  
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
        console.log(this.state.searchWord);
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
        this.setState({recipesFound : response});
    }

    onRecipeSelected = (index, recipeData) => {
        console.log("recipe index:" + index)
        if(Object.keys(this.state.recipesSelected).length === 0)
        {
            console.log("init map");
            this.setState({recipesSelected : new Map()});
        }

        var recipesSelected = this.state.recipesSelected;
        if(!(recipeData.label in recipesSelected))
        {
            recipesSelected[recipeData.label] = recipeData;
            this.setState({recipesSelected :recipesSelected});
            console.log("added entry to map");
        }
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