import React from 'react';
import base from '../base';
import {searchForRecipes} from './DataAPI';
import {isUserLogged} from './DataUser';
import {getUserLoginData} from './DataUser';
import { Link } from 'react-router-dom'
import {Tabs, Tab} from 'react-bootstrap'

//User enters keyword here
const SearchInput = (props) => {
    return (
         <div className="col-md-8 col-md-offset-2 col-xs-10 col-xs-offset-1 input-group inputIngredient">
            <input type="text" className="form-control" placeholder="Enter Recipe Name"  onKeyDown={props.onChangeSearchInput} />
            <span className="input-group-btn">
                <button className="btn btn-success" type="button" onClick = {props.onClickSearchButton}>Search</button>
            </span>
        </div>
    )
}
 
//Component for single recipe found
const RecipeFound = (props) => {
  console.log(`props.bgColor: ${props.bgColor}`);
   var btnStyle = {
        backgroundColor: `${props.bgColor}
    `};
    return(
       <li className="menu-recipe">
        <img src={props.element.recipe.image} alt= {props.element.recipe.label.replace(/[^- ':",(ñ)a-zA-Z0-9]/g,'')} />
        <h3 className="recipe-name">
             {props.element.recipe.label.replace(/[^- ':",(ñ)a-zA-Z0-9]/g,'')}
            
        </h3>
        
        <button style={btnStyle} key={props.index} value={props.index} onClick={function(){return props.onRecipeSelected(props.index, props.element.recipe)}} >Select ...</button>
      </li>





 
    )
}


//Component for list of found recipes
const RecipesFound = (props) =>{
    console.log(`RecipesFound props.bgColor: ${props.bgColor}`)
    return (    
        <ul>
            {props.recipesFound.map(function(element, index){
                {return (<RecipeFound element = {element} index = {index} key = {index} onRecipeSelected = {props.onRecipeSelected} bgColor = {props.bgColor} />)}
            })}
        </ul>
    )
}

//Component for single selected recipe
const SelectedRecipe = props => {
    return(
        <li className = "menu-recipe" >
        <img src={props.element.image} alt= {props.element.label.replace(/[^- ':",(ñ)a-zA-Z0-9]/g,'')} />
        <h3 className="recipe-name">
             {props.element.label.replace(/[^- ':",(ñ)a-zA-Z0-9]/g,'')}
         </h3>
           
            <button key={props.index} value={props.index} onClick={function(){return props.onRecipeDeselected(props.index, props.element.recipe)}} >Remove ...</button>
           </li>

    )
}

//Component for the selected recipes list
const SelectedRecipes = (props) => {
    //As props.recipesSelected is a map object and not an array, map method can not be used here directly. Instead, Object.keys() returns an array of the keys, which can then be used to map stuff  
    return (
        <ul >                
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
            recipesSelected:{},
            color_black: true,
            bgColor: "green"
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
        //console.log(response);
        this.setState({recipesFound : response});
    }

    //Once a recipe is selected, state will be updated
    onRecipeSelected = (index, recipeData) => {
        //If recipesSelected does not contain anything, create the map
       console.log(this);
        if(Object.keys(this.state.recipesSelected).length === 0)
        {
            this.setState({recipesSelected : new Map()});
        }
        
        //recipeData will be added to the map. Key will be the recipe name
        var recipesSelected = this.state.recipesSelected;
         //console.log(this.state.recipesSelected)
        if(!(recipeData.label in recipesSelected))
        {
            recipeData.label = recipeData.label.replace(/[^- ':",(ñ)a-zA-Z0-9]/g,'');
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
        this.info2databasehandler();
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
            <div className='card'>
                <div className='card-block'>
                    <h1 className="card-title">Select your recipes</h1>
                    <SearchInput onChangeSearchInput={this.onChangeSearchInput} onClickSearchButton = {this.onClickSearchButton}/>
                    <RecipesFound bgColor={this.state.bgColor} recipesFound={this.state.recipesFound} onRecipeSelected = {this.onRecipeSelected}/>
                    
                </div>
            </div>


    </Tab>
    <Tab eventKey={2} title="Choosen recieps">
     <div className='card'>
                <div className='card-block'>
                    <h1 className="card-title">Chosen Recipes </h1>
                    <SelectedRecipes aling="right" recipesSelected = {this.state.recipesSelected} onRecipeDeselected = {this.onRecipeDeselected}/>
                   
                </div>
            </div>
    </Tab>
      </Tabs>

        

           
    </div>
        )
    }
}

export default ChooseMyMeal;