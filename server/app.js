const express = require('express')
const app = express()
const WordPOS = require('wordpos')
var fs = require('fs')
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

app.post('/', function (req, res) {
    res.send('Got a POST request')
  })

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})


module.exports = app;