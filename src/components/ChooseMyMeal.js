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
  
   var text = (props.element.recipe.status !== "selected") ? "Select..." : "Seleted";
   var isSelected = props.element.recipe.status === "selected";
   var style = (props.element.recipe.status !== "selected") ? "green" : "red";
   var btnStyle = {
        backgroundColor: `${style}
    `};
    return(
       <li className="menu-recipe">
        <img src={props.element.recipe.image} alt= {props.element.recipe.label.replace(/[^- ':",(ñ)a-zA-Z0-9]/g,'')} />
        <h3 className="recipe-name">
             {props.element.recipe.label.replace(/[^- ':",(ñ)a-zA-Z0-9]/g,'')}
            
        </h3>
        
        <button style={btnStyle} key={props.index} disabled={isSelected} value={props.index} onClick={function(){return props.onRecipeSelected(props.index, props.element.recipe)}} >{text}</button>
      </li>





 
    )
}


//Component for list of found recipes
const RecipesFound = (props) =>{
    
    return (    
        <ul>
            { 
                
                props.recipesFound.map(function(element, index){
               


                //find in selected recipes i f there's any reicpe named like this
                Object.keys(props.recipesSelected).forEach(function(recipeUid){
                    
                if(recipeUid=== element.recipe.uri.replace(/[^- ':",(ñ)a-zA-Z0-9]/g,''))
                    {
                       
                       element.recipe.status = "selected";
                       
                    }
               });
 
                {return (<RecipeFound  isSelected= {props.recipesFound} recipesSelected = {props.recipesSelected} element = {element} index = {index} key = {index} onRecipeSelected = {props.onRecipeSelected}  />)}
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
            dontLike:[],
            
            
        }
    }

    onChangeSearchInput = (e) => {
        
        if(e.keyCode == 13){
            this.setState({ searchWord: e.target.value });
            this.setState({ recipesFound: []});
            this.onClickSearchButton()
            
        }
        this.setState({ searchWord: e.target.value });
    }

    //Once user clicks search button, keyword is passed to DataAPI's searchForRecipes function.
    onClickSearchButton = () => {
        const scope = this;
        this.setState({ recipesFound: []});
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
       var ingredients = response.map(function(recipe) {
          return recipe.recipe.ingredients;
       })
       var dontlike = this.state.dontLike;
      console.log(dontlike); 
     
var ingredientsf = response.map(function(recipe) {
          return recipe.recipe.ingredients.map(function(ingredientes){
             console.log(ingredientes.text);
             return ingredientes.text.indexOf(dontlike.map(function(dontlike){
               console.log(dontlike);
               return dontlike;

          }));
          })
       })

       console.log(ingredientsf);

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
        var recipesFound = this.state.recipesFound;

        var recipeUid = recipeData.uri.replace(/[^- ':",(ñ)a-zA-Z0-9]/g,'');
         //console.log(this.state.recipesSelected)
        if(!(recipeUid in recipesSelected))
        {
            recipeData.label = recipeData.label.replace(/[^- ':",(ñ)a-zA-Z0-9]/g,'');
            recipeData.status = "selected";
            recipesSelected[recipeUid] = recipeData;
            recipesFound[recipeUid] = recipeData;
            this.setState({recipesSelected:recipesSelected});
            this.setState({recipesFound:recipesFound});
            
            this.info2databasehandler();
        }
    }

    info2databasehandler(){
        const storeRef = base.database().ref(getUserLoginData().uid);
        
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
                   recipesSelected : data.recipesSelected,
                   })
            }
        
        });

        storeRef.child('restricitons').once('value', (snapshot) => {
            const data = snapshot.val() || {};
            
            if (data.dontlike) {
                this.setState({
                   dontLike: data.dontlike,
                })
            }
        });
}

        //Once a recipe is selected, state will be updated
    onRecipeDeselected = (index) => {
        //If recipesSelected does not contain anything, create the map
        var lis = Object.keys(this.state.recipesSelected);
        var maplist, maplist1 = new Map();
        maplist = this.state.recipesSelected;
        maplist1 = this.state.recipesFound;
        
        if(maplist1[(lis[index])] != undefined){
           maplist1[(lis[index])].status = "unselected"; 
           console.log("changing the nstateeeeeeeeeeeeeeeeeeeeeeeee");
        };
        delete maplist[(lis[index])];
        
        

         if(lis.length !== 0)
        {
            
            this.setState({recipesSelected : maplist });
            this.setState({recipesFound : maplist1 });
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
                    <RecipesFound  recipesFound={this.state.recipesFound} recipesSelected = {this.state.recipesSelected} onRecipeSelected = {this.onRecipeSelected}/>
                    
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