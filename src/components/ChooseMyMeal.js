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

//SearchButton - TODO: delete this?
const SearchResultList = (props) =>{
    console.log('H')
    return(<h4 style={{ textAlign: "left" }}> list : {props.searchWord}</h4>)
}

const ListChosenRecipes = (props) => {
    return (
        <ul className = 'list-group' style={{ textAlign: "left" }}>
            <li className = 'list-group-item'>list</li>
            <li className = 'list-group-item'>goes</li>
            <li className = 'list-group-item'>here</li>
        </ul>
    )
}

class ChooseMyMeal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchWord: "",
            listRecipe:"",
        }
    }

    onChangeSearchInput = (e) => {
        this.setState({ searchWord: e.target.value });
        console.log(this.state.searchWord);
        SearchResultList(this.state.searchWord)
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

    //api writes response here
    onSearchResponse = (response) => {
        console.log(response);
    }

    render() {
        return (

            <div className='row'>
                <div className='col-md-6 col-xs-6'>
                    <SearchInput onChangeSearchInput={this.onChangeSearchInput} onClickSearchButton = {this.onClickSearchButton}/>
                    <SearchResultList searchWord={this.state.searchWord} />
                </div>
                <div className='col-md-6 col-xs-6'>
                    <ListChosenRecipes />
                </div>
            </div>
        )
    }
}

export default ChooseMyMeal;