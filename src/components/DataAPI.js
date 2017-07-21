class DataAPI
{
    constructor()
    {
        this.baseUrlSearch = "https://api.edamam.com/search?app_id=b03b6d4c&app_key=a9ca3cc36a6e430922d27f05642b6c4c&q=";
    }

    searchForRecipes(keyword, onSearchResponse)
    {
        var urlSearch = this.baseUrlSearch + keyword;
        fetch(urlSearch)
            .then(function (response) { return response.json(); })
            .then(function (data) {
                onSearchResponse(data);
            }
            );
    }
}

export default DataAPI;