
const baseUrlSearch = "https://api.edamam.com/search?app_id=b03b6d4c&app_key=a9ca3cc36a6e430922d27f05642b6c4c&q=";

//Dictionary of found recipes by keyword
const recipesFound = {};

export function searchForRecipes(keyword) {
    //If keyword is already there, return data as a promise
    
    var urlSearch = baseUrlSearch + keyword;
    return fetch(urlSearch)
        .then(function (response) {
            if(response.ok)
            {
                return response.json();
            }
            throw new Error("Network response was not ok");
        })
        .then(function (data) {
            recipesFound[keyword] = data.hits;
            console.log (data.hits)
            return recipesFound[keyword];
        })
        .catch(function(error){
            console.log(`There has been a problem with the http request: ${error}`);
        });
        
}


//Another way of exporting the function
// export {searchForRecipes};