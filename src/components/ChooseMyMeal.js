//the button for selection needs to go back to select when the item is deleted from the chosen list
import React from 'react';
import base from '../base';
import { searchForRecipes } from './DataAPI';
import { getUserLoginData } from './DataUser';
import garbage from './../icons/whiteTrash.png';

//User enters keyword here
const SearchInput = (props) => {
    return (
        <div className="col-md-8 col-md-offset-2 col-xs-10 col-xs-offset-1 input-group inputIngredient">
            <input type="text" className="form-control" placeholder="Enter Recipe Name" onKeyDown={props.onChangeSearchInput} />
            <span className="input-group-btn">
                <button className="btn btn-primary" type="button" onClick={props.onClickSearchButton}>Search</button>
            </span>
        </div>
    )
}

//Component for single recipe found
const RecipeFound = (props) => {

    var text = (props.element.recipe.status !== "selected") ? "SELECT" : "SELECTED";
    var isSelected = props.element.recipe.status === "selected";
    var style = (props.element.recipe.status !== "selected") ? "btn btn-primary menu-recipe-button" : "btn btn-warning menu-recipe-button";
    var btnStyle = `${style}`;
    return (

        <div className="col-md-4 col-xs-12 no-padding">
            <ul className="menu-recipe" style={{ backgroundImage: `url(${props.element.recipe.image})` }}>
                <button className={btnStyle} key={props.index} disabled={isSelected} value={props.index} onClick={function () { return props.onRecipeSelected(props.index, props.element.recipe) }} >{text}</button>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <div className="recipe-name-gradient">
                    <br></br>

                    <br></br>
                    <h5 className="recipe-name">
                        {props.element.recipe.label.replace(/[^- ':",(ñ)a-zA-Z0-9]/g, '')}

                    </h5>
                </div>
            </ul>
        </div>
    )
}


//Component for list of found recipes
const RecipesFound = (props) => {

    return (
        <div>
            {
                props.recipesFound.map(function (element, index) {
                    //find in selected recipes i f there's any reicpe named like this
                    Object.keys(props.recipesSelected).forEach(function (recipeUid) {
                        if (recipeUid === element.recipe.uri.replace(/[^- ':",(ñ)a-zA-Z0-9]/g, '')) {
                            element.recipe.status = "selected";
                        }
                    });
                    
                    return ( 
                        <RecipeFound isSelected={props.recipesFound} recipesSelected={props.recipesSelected} element={element} index={index} key={index} onRecipeSelected={props.onRecipeSelected} />
                    )
                    
                })}
        </div>
    )
}

//Component for single selected recipe
const SelectedRecipe = props => {
    return (
        <div className="col-md-4 col-xs-12 no-padding">
            <ul className="menu-recipe" style={{ backgroundImage: `url(${props.element.image})` }}>
                <button className="btn btn-danger menu-recipe-button" key={props.index} value={props.index} onClick={function () { return props.onRecipeDeselected(props.index, props.element.recipe) }} >
                <img style={{ width: '35px' }} src={garbage} alt="delete button"/>
                </button>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <div className="recipe-name-gradient">
                    <br></br>
                    <br></br>
                    <h5 className="recipe-name">
                        {props.element.label.replace(/[^- ':",(ñ)a-zA-Z0-9]/g, '')}
                    </h5>
                </div>
            </ul>
        </div>
    )
}

//Component for the selected recipes list
const SelectedRecipes = (props) => {
    //As props.recipesSelected is a map object and not an array, map method can not be used here directly. Instead, Object.keys() returns an array of the keys, which can then be used to map stuff  
    return (
        
        <div className="row no-padding">
                {Object.keys(props.recipesSelected).map(function (key, index) {
                    return <SelectedRecipe element={props.recipesSelected[key]} index={index} key={index} onRecipeDeselected={props.onRecipeDeselected} />
                })}
           
        </div>
    )
}

class ChooseMyMeal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchWord: "",
            recipesFound: [],
            recipesSelected: {},
            dontLike:[],
        }
    }

    onChangeSearchInput = (e) => {

        if (e.keyCode === 13) {
            this.setState({ searchWord: e.target.value });
            this.setState({ recipesFound: [] });
            this.onClickSearchButton()

        }
        this.setState({ searchWord: e.target.value });
    }

    //Once user clicks search button, keyword is passed to DataAPI's searchForRecipes function.
    onClickSearchButton = () => {
        const scope = this;
        this.setState({ recipesFound: [] });
        searchForRecipes(this.state.searchWord)
            .then((response) => {
                scope.onSearchResponse(response)
            })
            .catch((error) => {
                console.error(error);
            })
    }

    //trying to put the number of chosen recipes
    getTabName() {
        var sizeString = this.state.recipesSelected;
        for (var i = 0; i < sizeString; i++)
        var textTab = `CHOSEN RECIPES ${i}`;
        return textTab
    }

    //api writes response here. Update state
    onSearchResponse = (response) => {
        
       response.map(function(recipe) {
          return recipe.recipe.ingredients;
       })
       var dontlike = this.state.dontLike;
     
     
var ingredientsf = response.filter(function(recipe) {
          return !recipe.recipe.ingredients.map(function(ingredientes){
             
             return dontlike.map(function(dontlike){
                
                return ingredientes.text.indexOf(dontlike);

             }).reduce(function (previous, current) {
    
   if(current > -1){
    

    return  true
   }else{
    
    return previous

   }

}, false);;
               
               

          }).reduce(function (previous, current) {
  
   if(current === true){
    
    
    return true
   }else{
    
    return previous

   }

}, false);;
          })
        this.setState({ recipesFound: ingredientsf });
    }

    //Once a recipe is selected, state will be updated
    onRecipeSelected = (index, recipeData) => {
        //If recipesSelected does not contain anything, create the map

        if (Object.keys(this.state.recipesSelected).length === 0) {
            this.setState({ recipesSelected: new Map() });
        }

        //recipeData will be added to the map. Key will be the recipe name
        var recipesSelected = this.state.recipesSelected;
        var recipesFound = this.state.recipesFound;
        var recipeUid = recipeData.uri.replace(/[^- ':",(ñ)a-zA-Z0-9]/g, '');
        if (!(recipeUid in recipesSelected)) {
            recipeData.label = recipeData.label.replace(/[^- ':",(ñ)a-zA-Z0-9]/g, '');
            recipeData.status = "selected";
            recipesSelected[recipeUid] = recipeData;
            recipesFound[recipeUid] = recipeData;
            this.setState({ recipesSelected: recipesSelected });
            this.setState({ recipesFound: recipesFound });

            this.info2databasehandler();
        }
    }

    info2databasehandler() {
        const storeRef = base.database().ref(getUserLoginData().uid);

        // query the firebase
        storeRef.once('value', (snapshot) => {
            const data = snapshot.val() || {};
            //Add some data to the user...
            storeRef.child('recipesInfo').update({
                recipesSelected: this.state.recipesSelected,
            })
        });
    }

    componentWillMount() {
        const storeRef = base.database().ref(getUserLoginData().uid);
        storeRef.child('recipesInfo').once('value', (snapshot) => {
            const data = snapshot.val() || {};
            if (data.recipesSelected) {
                this.setState({
                    recipesSelected: data.recipesSelected

                })
            }
        });
        storeRef.child('restricitons').once('value', (snapshot) => {
            const data = snapshot.val() || {};
            if (data.dontlike) {
                this.setState({
                    dontLike: data.dontlike
                    
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

        if (maplist1[(lis[index])] !== undefined) {
            maplist1[(lis[index])].status = "unselected";

        };
        delete maplist[(lis[index])];



        if (lis.length !== 0) {

            this.setState({ recipesSelected: maplist });
            this.setState({ recipesFound: maplist1 });
        }
        this.info2databasehandler();
        
    }

    render() {
        return (
            <div className='row firstElement backgroundTest' >
                <div className='col-md-10 col-md-offset-1 col-xs-10 col-xs-offset-1'>
                    <section defaultActiveKey={1} className=" choosenmeal-tab whiteBackground bodyText">

                        <div className='no-padding ' eventKey={1} title="SEARCH FOR RECIPES">
                            <div className=' no-padding'>
                                <div className=' no-padding'>
                                    <h1 className=" titleH1 no-padding">SEARCH FOR RECIPES</h1>
                                    <SearchInput onChangeSearchInput={this.onChangeSearchInput} onClickSearchButton={this.onClickSearchButton} />
                                    <div className='bodyText'>
                                        <RecipesFound recipesFound={this.state.recipesFound} recipesSelected={this.state.recipesSelected} onRecipeSelected={this.onRecipeSelected} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='no-padding' eventKey={2} title={this.getTabName()}>
                            <div className=' no-padding'>
                                <div className='no-padding'>
                                    <h1 className="titleH1 no-padding">CHOSEN RECIPES</h1>
                                    <div className='bodyText'>
                                        <SelectedRecipes aling="right" recipesSelected={this.state.recipesSelected} onRecipeDeselected={this.onRecipeDeselected} />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </section>
                </div>
            </div>
        )
    }
}

export default ChooseMyMeal;