import React from 'react';
import {searchForRecipes} from './DataAPI';
import {isUserLogged} from './DataUser';
import {getUserLoginData} from './DataUser';
import { Link } from 'react-router-dom'
import {Tabs, Tab} from 'react-bootstrap'

//User enters keyword here
const SearchInput = (props) => {
    return (
        <div className="input-group">
            <input type="text" className="form-control" placeholder="Enter Recipe Name"  onKeyDown={props.onChangeSearchInput} />
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
           <input 
            type = "checkbox" 
            className = "form-check-input" 
            onChange = {function(){return props.onRecipeDeselected(props.index, props.element.recipe)}}
            />
        </li>

    )
}

//Component for the selected recipes list
const SelectedRecipes = (props) => {
    //As props.recipesSelected is a map object and not an array, map method can not be used here directly. Instead, Object.keys() returns an array of the keys, which can then be used to map stuff  
    return (
        <ul className = 'list-group' style={{ textAlign: "left" }}>                
            {Object.keys(props.recipesSelected).map(function(key, index){
                return <SelectedRecipe element = {props.recipesSelected[key]}  index = {index} key = {index} onRecipeDeselected = {props.onRecipeDeselected} /> 
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
        console.log(e.keyCode);
        if(e.keyCode == 13){
            this.setState({ searchWord: e.target.value });
            this.onClickSearchButton()
            console.log(`After serching the onClickSearchButton: ${(e.keyCode)}`);
        }
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
        console.log(response);
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
        if(!(recipeData.label in recipesSelected))
        {
            recipesSelected[recipeData.label] = recipeData;
            this.setState({recipesSelected :recipesSelected});
        }
    }

        //Once a recipe is selected, state will be updated
    onRecipeDeselected = (index) => {
        //If recipesSelected does not contain anything, create the map
        var lis = Object.keys(this.state.recipesSelected);
        var maplist = new Map();
        maplist = this.state.recipesSelected;
        console.log(`maplist: ${maplist}`);
        console.log(`index: ${index}`);
        delete maplist[(lis[index])];
        
        

         if(lis.length !== 0)
        {
            
            this.setState({recipesSelected : maplist });
        }
/*        {
            this.setState({recipesSelected : new Map()});
        }

        //recipeData will be added to the map. Key will be the recipe name
        var recipesSelected = this.state.recipesSelected;
        if(!(recipeData.label in recipesSelected))
        {
            recipesSelected[recipeData.label] = recipeData;
            this.setState({recipesSelected :recipesSelected});
        }*/
    }

    render() {
        return (
            <div>
 <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
    <Tab eventKey={1} title="Select your recipes">
       <div className='row'>
                <div className='col-md-6 col-xs-6'>
                    <h2>Select your recipes </h2>
                    <SearchInput onChangeSearchInput={this.onChangeSearchInput} onClickSearchButton = {this.onClickSearchButton}/>
                    <RecipesFound recipesFound={this.state.recipesFound} onRecipeSelected = {this.onRecipeSelected}/>
                </div>
    </div>
    </Tab>
    <Tab eventKey={2} title="Choosen recieps">
     <div className='row'>
                <div className='col-md-6 col-xs-6'>
                    <h2>Chosen Recipes </h2>
                    <SelectedRecipes recipesSelected = {this.state.recipesSelected} onRecipeDeselected = {this.onRecipeDeselected}/>
                    <button> accept</button>
                </div>
            </div>
    </Tab>
      </Tabs>

        

           
    </div>
        )
    }
}

export default ChooseMyMeal;