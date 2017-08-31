const express = require('express');
const app = express();
const WordPOS = require('wordpos');
const base = require ('re-base');
var React = require('react');
var fs = require('fs')
//const GrocList = require ('./src/components/GroceryList.js')
//'../src/components/GroceryList.js'

//var grocerylist = require ('GroceryList')
wordpos = new WordPOS();

const textTemp = ['tomato']

app.get('/grocerylist', function (req, res) {
  
  //wordpos.getNouns('The angry bear chased the frightened little squirrel.', console.log)
    wordpos.getNouns('The cheese angry bear tomato chased ripe .', function(result){
        var test2 = result;
        console.log ( test2.length)
        
        for (var i=0; i<test2.length; i++){
            var testing = test2[i];
            console.log(testing)
            wordpos.lookup(testing, function(res){
               // console.log(res)
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


app.listen(3000, function () {
  console.log('Example app listening on port 9000!')
})


module.exports = app;