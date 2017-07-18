import React from 'react';
import testAPI from './testAPI';

/*const SearchInput =  (props ) => {
    return  (
            <input type='text' onChange={this.props.onChangeSearchInput} placeholder='Recipe Name'/>
    )
}*/

//SearchButton

//SearchResultList

//AcceptButton


class ChooseMyMeal extends React.Component  {
    constructor(props)  {
        super(props);
        this.state = {
                searchWord: "",
        }
    }

    onChangeSearchInput   = (e)  => {
        this.setState({  searchWord : e.target.value });
        console.log (this.state.searchWord);
        testAPI();
    }

    render()
    {
        var self = this;
        return  (
            <div>
                <input type='text' placeholder='Enter Recipe' onChange = {this.onChangeSearchInput}/>
                <p>hi there</p>
            </div> 
        )
    }
} 

export default ChooseMyMeal;