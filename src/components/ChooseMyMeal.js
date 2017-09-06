import React from 'react';
import base from '../base';
import { searchForRecipes } from './DataAPI';
import { isUserLogged } from './DataUser';
import { getUserLoginData } from './DataUser';
import { Link } from 'react-router-dom'
import { Tabs, Tab } from 'react-bootstrap'
import garbage from './../icons/whiteTrash.png'

//User enters keyword here
const SearchInput = (props) => {
    return (
        <div className="col-md-8 col-md-offset-2 col-xs-10 col-xs-offset-1 input-group inputIngredient">
            <input type="text" className="form-control" placeholder="Enter Recipe Name" onKeyDown={props.onChangeSearchInput} />
            <span className="input-group-btn">
                <button className="btn btn-success" type="button" onClick={props.onClickSearchButton}>Search</button>
            </span>
        </div>
    )
}

//Component for single recipe found
const RecipeFound = (props) => {

    var text = (props.element.recipe.status !== "selected") ? "SELECT" : "SELECTED";
    var isSelected = props.element.recipe.status === "selected";
    var style = (props.element.recipe.status !== "selected") ? "green" : "red";
    var btnStyle = {
        backgroundColor: `${style}
    `};
    return (

        <div className="col-md-4 col-xs-12">
            <ul className="menu-recipe" style={{ backgroundImage: `url(${props.element.recipe.image})` }}>
                <button className='btn btn-primary menu-recipe-button' style={btnStyle} key={props.index} disabled={isSelected} value={props.index} onClick={function () { return props.onRecipeSelected(props.index, props.element.recipe) }} >{text}</button>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <div className="recipe-name-gradient">
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
        <ul>
            {

                props.recipesFound.map(function (element, index) {



                    //find in selected recipes i f there's any reicpe named like this
                    Object.keys(props.recipesSelected).forEach(function (recipeUid) {

                        if (recipeUid === element.recipe.uri.replace(/[^- ':",(ñ)a-zA-Z0-9]/g, '')) {

                            element.recipe.status = "selected";

                        }
                    });

                    { return (<RecipeFound isSelected={props.recipesFound} recipesSelected={props.recipesSelected} element={element} index={index} key={index} onRecipeSelected={props.onRecipeSelected} />) }
                })}
        </ul>
    )
}

// background: -webkit-linear-gradient(rgba(0,0,0,0), rgba(0,0,0,1)); /* For Safari 5.1 to 6.0 */
//     background: -o-linear-gradient( rgba(0,0,0,0), rgba(255,0,0,1)); /* For Opera 11.1 to 12.0 */
//     background: -moz-linear-gradient( rgba(0,0,0,0), rgba(0,0,0,1)); /* For Firefox 3.6 to 15 */
//     background: linear-gradient( rgba(0,0,0,0), rgba(0,0,0,1)); /* Standard syntax (must be last) */

//Component for single selected recipe
const SelectedRecipe = props => {
    return (
        <div className="col-md-4 col-xs-12">
            <ul className="menu-recipe" style={{ backgroundImage: `url(${props.element.image})` }}>
                <button className="btn btn-danger menu-recipe-button" key={props.index} value={props.index} onClick={function () { return props.onRecipeDeselected(props.index, props.element.recipe) }} ><img style={{ width: '30px' }} src={garbage} /></button>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <div className="recipe-name-gradient">
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
        <div className="row row-no-padding">
            <ul >
                {Object.keys(props.recipesSelected).map(function (key, index) {
                    return <SelectedRecipe element={props.recipesSelected[key]} index={index} key={index} onRecipeDeselected={props.onRecipeDeselected} />
                })}
            </ul>
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
        }
    }

    onChangeSearchInput = (e) => {

        if (e.keyCode == 13) {
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
        var count = 0;
        for (var i in sizeString)
            count++;
        var textTab = "CHOSEN RECIPES " + count;
        return textTab
    }

    //api writes response here. Update state
    onSearchResponse = (response) => {
        //console.log(response);
        this.setState({ recipesFound: response });
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
        //console.log(this.state.recipesSelected)
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
    }

    //Once a recipe is selected, state will be updated
    onRecipeDeselected = (index) => {
        //If recipesSelected does not contain anything, create the map
        var lis = Object.keys(this.state.recipesSelected);
        var maplist, maplist1 = new Map();
        maplist = this.state.recipesSelected;
        maplist1 = this.state.recipesFound;

        if (maplist1[(lis[index])] != undefined) {
            maplist1[(lis[index])].status = "unselected";

        };
        delete maplist[(lis[index])];



        if (lis.length !== 0) {

            this.setState({ recipesSelected: maplist });
            this.setState({ recipesFound: maplist1 });
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
                <Tabs defaultActiveKey={1} className="firstElement choosenmeal-tab">
                    <Tab eventKey={1} title="SEARCH FOR RECIPES">
                        <div className='card'>
                            <div className='card-block'>
                                <h1 className="card-title titleH1">SEARCH FOR RECIPES</h1>
                                <div className='bodyText'>
                                    <SearchInput onChangeSearchInput={this.onChangeSearchInput} onClickSearchButton={this.onClickSearchButton} />
                                    <RecipesFound recipesFound={this.state.recipesFound} recipesSelected={this.state.recipesSelected} onRecipeSelected={this.onRecipeSelected} />
                                </div>
                            </div>
                        </div>


                    </Tab>
                    <Tab eventKey={2} title={this.getTabName()}>
                        <div className='card'>
                            <div className='card-block'>
                                <h1 className="card-title titleH1">CHOSEN RECIPES</h1>
                                <div className='bodyText'>
                                    <SelectedRecipes aling="right" recipesSelected={this.state.recipesSelected} onRecipeDeselected={this.onRecipeDeselected} />
                                </div>
                            </div>
                        </div>
                    </Tab>
                </Tabs>
            </div>
        )
    }
}

export default ChooseMyMeal;