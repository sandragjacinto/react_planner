// get the list of all ingredients from the chosen meals
// filter what is food from what is not food
// return final just food list

const express = require('express');
const app = express();
const WordPOS = require('wordpos');
const base = require ('re-base');
var React = require('react');
var fs = require('fs')

wordpos = new WordPOS();

app.get('/grocerylist', function (req, res) {
  console.log('here')
    wordpos.getNouns('The cheese angry bear 2 tomato chased ripe .', function(result){
        var test2 = result;
        console.log ( test2.length)
        
        for (var i=0; i<test2.length; i++){
            var testing = test2[i];
            console.log(testing)
            wordpos.lookup(testing, function(res){
               console.log(res[0].lexName)
                if (res[0].lexName == 'noun.food'){
                    var food = 'yes';
                    console.log( 'food :',food)
                }else{
                    var food = 'no';
                    console.log( 'food :',food)
                }
                
            })
            
        }
        
    });
   
})


app.listen(9000, function () {
  console.log('Example app listening on port 9000!')
})


module.exports = app;