
const baseUrlSearch = "https://api.edamam.com/search?app_id=b03b6d4c&app_key=a9ca3cc36a6e430922d27f05642b6c4c&q=";

//Dictionary of found recipes by keyword
const recipesFound = {};

export function searchForRecipes(keyword) {
    //If keyword is already there, return data as a promise
    
    var urlSearch = baseUrlSearch + keyword;
    return fetch(urlSearch)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            recipesFound[keyword] = data.hits;
            return recipesFound[keyword];
            console.log (data.hits)
        })
}


//Another way of exporting the function
// export {searchForRecipes};