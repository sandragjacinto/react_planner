import React from 'react';
import DataAPI from './DataAPI';

const SearchInput = (props) => {
    return (
        <div className="input-group">
            <input type="text" className="form-control" placeholder="Enter Recipe Name" onChange={props.onChangeSearchInput} />
            <span className="input-group-btn">
                <button className="btn btn-default" type="button">Select</button>
            </span>
        </div>
    )
}

//SearchButton
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

//AcceptButton


class ChooseMyMeal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchWord: "",
            listRecipe:"",
        }
        this.dataApi = new DataAPI();
    }

    onChangeSearchInput = (e) => {
        this.setState({ searchWord: e.target.value });
        console.log(this.state.searchWord);
        this.dataApi.testAPI();
        SearchResultList(this.state.searchWord)
    }

    onChangeSearchButton = (e) => {

    }

    render() {
        return (

            <div className='row'>
                <div className='col-md-6 col-xs-6'>
                    <SearchInput onChangeSearchInput={this.onChangeSearchInput}/>
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