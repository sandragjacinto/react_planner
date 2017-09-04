import React from 'react';
import {Modal} from 'react-bootstrap'; //Can import individual features also from 3rd party libs
import {writeDB} from './Database';

//Popup to schedule a day with delicious recipes :)
class PlanOneDayClass extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      mealPlanSingleDay : {}
    };
  }

  onRecipeScheduled = (recipeName) =>
  {
    //console.log("PlanOneDayClass.onRecipeScheduled: " + recipeName);
    var mealPlanSingleDay = this.props.mealPlanSingleDay;
    var keyRecipes = "recipes", keyQuantity = "quantity", keyMealPlan = "mealPlan";

    if(!(keyRecipes in mealPlanSingleDay))
    {
      mealPlanSingleDay[keyRecipes] = [];
      mealPlanSingleDay[keyQuantity] = {};
    }

    if(!mealPlanSingleDay[keyRecipes].includes(recipeName))
    {
      mealPlanSingleDay[keyRecipes].push(recipeName);
      mealPlanSingleDay[keyQuantity][recipeName] = 1;
    }
    else
    {
      mealPlanSingleDay[keyQuantity][recipeName]++;
    }
    var dbPath = [keyMealPlan, this.props.dateToPlan];
    writeDB(dbPath, mealPlanSingleDay);
    this.setState({mealPlanSingleDay : mealPlanSingleDay});
  }

  onRecipeUnscheduled = (recipeName) => {
    console.log("onRecipeUnscheduled:" + recipeName);
    
    //Unscheduled from state
    var keyRecipes = "recipes", keyQuantity = "quantity", keyMealPlan = "mealPlan";
    var mealPlanSingleDay = this.props.mealPlanSingleDay;
    if(mealPlanSingleDay[keyQuantity][recipeName] <= 1)
    {
      delete mealPlanSingleDay[keyQuantity][recipeName];
      mealPlanSingleDay[keyRecipes].splice(mealPlanSingleDay[keyRecipes].indexOf(recipeName), 1); 
    }
    else
    {
      mealPlanSingleDay[keyQuantity][recipeName]--;
    }
    this.setState({mealPlanSingleDay : mealPlanSingleDay});

    //Unschedule on db
    var dbPath = [keyMealPlan, this.props.dateToPlan];
    writeDB(dbPath, mealPlanSingleDay);
  }

  render()
  {
    //console.log("planoneday render " + this.props.mealPlanSingleDay + this.props.dateToPlan);
    var scope = this;
    return(
        <div className="static-modal">

        <Modal show={this.props.isShown} onHide={function(){scope.props.onClose()}}>
          <Modal.Header closeButton>
            <Modal.Title>Schedule for {this.props.dateToPlan}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Choose recipes to be scheduled: </h4>
              <RecipesToSchedule recipes = {this.props.recipesAvailableForSchedule} mealPlanSingleDay = {this.props.mealPlanSingleDay} onRecipeScheduled = {this.onRecipeScheduled} />
              <ScheduledRecipes mealPlanSingleDay = {this.props.mealPlanSingleDay} onRecipeUnscheduled = {this.onRecipeUnscheduled}/>
            <hr />
          </Modal.Body>
          <Modal.Footer>
            {<button onClick={() => 
                {
                    this.props.onClose();
                }
                }>Close</button>}           
          </Modal.Footer>
        </Modal>

  </div>
    );
  }
}

const RecipeToSchedule = (props) => {
return(
  <li>
      <p>{props.element.label}</p>
      <button value={props.index} onClick={function(){return props.onRecipeScheduled(props.element.label)}} >Select</button>
  </li>
);
}

const RecipesToSchedule = (props) => {

  if(props.recipes != undefined)
  {
    return(
      <ul>
          {Object.keys(props.recipes).map(function(recipe, index){            
              return <RecipeToSchedule element = {props.recipes[recipe]}  key = {index} onRecipeScheduled = {props.onRecipeScheduled}/>;
          })}
      </ul>
    );
  }

}

const ScheduledRecipes = ({mealPlanSingleDay, onRecipeUnscheduled}) => {
  var keyRecipes = "recipes", keyQuantity = "quantity";
  return (
    <ul>
        {
          keyRecipes in mealPlanSingleDay ?
          (
            <div>
                <h4>Scheduled recipes: </h4>
                {mealPlanSingleDay[keyRecipes].map(function(recipeName, index){
                  return <ScheduledRecipe recipeName = {recipeName} quantity = {mealPlanSingleDay[keyQuantity][recipeName]} key = {index} onRecipeUnscheduled = {(recipeName) => {onRecipeUnscheduled(recipeName);} }/>;
                })}
            </div>
          )
          :
          <h4>No recipes scheduled yet </h4>
        }
    </ul>
  );
}

const ScheduledRecipe = ({onRecipeUnscheduled, recipeName, quantity}) => {
  return (
    <li>
      <p>{recipeName} quantity:{quantity}</p>
      <button onClick={function(){return onRecipeUnscheduled(recipeName)}} >Remove</button>
    </li>
  );
}

export default PlanOneDayClass;
