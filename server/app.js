const express = require('express')
const app = express()
const WordPOS = require('wordpos')
const base = require ('re-base')
var fs = require('fs')

const rebase = base.createClass({
    apiKey: "AIzaSyBkMy_KH0GVV_PHPWvjCz1axpLcI88xopU",
    authDomain: "meal-planner-10fa6.firebaseapp.com",
    databaseURL: "https://meal-planner-10fa6.firebaseio.com",
  });
  

//var grocerylist = require ('GroceryList')
wordpos = new WordPOS();

const textTemp = ['tomato']

app.get('/grocerylist', function (req, res) {
  
  wordpos.getNouns('The angry bear chased the frightened little squirrel.', console.log)
    wordpos.getNouns('2 ripe tomato.', function(result){
        var test2 = result;
        console.log ( test2)
        wordpos.lookup(test2[0], function(total){
            if (total[0].lexName == 'noun.food'){
                var food = 'yes';
            }
            console.log(food)
        })
    });
   
})


app.listen(9000, function () {
  console.log('Example app listening on port 9000!')
})


module.exports = app;