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

  onRecipeScheduled = (recipeUid) =>
  {
    var mealPlanSingleDay = this.props.mealPlanSingleDay;
    var keyRecipes = "recipes", keyQuantity = "quantity", keyMealPlan = "mealPlan";

    if(!(keyRecipes in mealPlanSingleDay) || !(keyQuantity in mealPlanSingleDay))
    {
      //console.log("onRecipeScheduled creating fields. mealPlanSingleDay:", mealPlanSingleDay);
      mealPlanSingleDay[keyRecipes] = [];
      mealPlanSingleDay[keyQuantity] = {};
    }

    if(!mealPlanSingleDay[keyRecipes].includes(recipeUid))
    {
      mealPlanSingleDay[keyRecipes].push(recipeUid);
      mealPlanSingleDay[keyQuantity][recipeUid] = 1;
    }
    else
    {
      mealPlanSingleDay[keyQuantity][recipeUid]++;
    }
    var dbPath = [keyMealPlan, this.props.dateToPlan];
    writeDB(dbPath, mealPlanSingleDay);
    this.setState({mealPlanSingleDay : mealPlanSingleDay});
  }

  onRecipeUnscheduled = (recipeUid) => {
    //Unscheduled from state
    var keyRecipes = "recipes", keyQuantity = "quantity", keyMealPlan = "mealPlan";
    var mealPlanSingleDay = this.props.mealPlanSingleDay;
    if(mealPlanSingleDay[keyQuantity][recipeUid] <= 1)
    {
      delete mealPlanSingleDay[keyQuantity][recipeUid];
      mealPlanSingleDay[keyRecipes].splice(mealPlanSingleDay[keyRecipes].indexOf(recipeUid), 1); 
    }
    else
    {
      mealPlanSingleDay[keyQuantity][recipeUid]--;
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
    var dateToPlan = new Date(this.props.dateToPlan);
    return(
        <div className="static-modal">

          <Modal show={this.props.isShown} onHide={function(){scope.props.onClose()}}>
            <Modal.Header closeButton>
              <Modal.Title>Schedule for {dateToPlan.toDateString()}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4>Choose recipes to be scheduled: </h4>
                <RecipesToSchedule recipes = {this.props.recipesAvailableForSchedule} mealPlanSingleDay = {this.props.mealPlanSingleDay} onRecipeScheduled = {this.onRecipeScheduled} />
                <ScheduledRecipes mealPlanSingleDay = {this.props.mealPlanSingleDay} onRecipeUnscheduled = {this.onRecipeUnscheduled} recipesAvailableForSchedule = {this.props.recipesAvailableForSchedule}/>
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
      <button onClick={function(){return props.onRecipeScheduled(props.recipeUid)}} >Select</button>
  </li>
);
}

const RecipesToSchedule = (props) => {

  if(props.recipes != undefined)
  {
    return(
      <ul>
          {Object.keys(props.recipes).map(function(recipeUid){            
              return <RecipeToSchedule element = {props.recipes[recipeUid]}  key = {recipeUid} recipeUid = {recipeUid} onRecipeScheduled = {props.onRecipeScheduled}/>;
          })}
      </ul>
    );
  }

}

const ScheduledRecipes = ({mealPlanSingleDay, onRecipeUnscheduled, recipesAvailableForSchedule}) => {
  var keyRecipes = "recipes", keyQuantity = "quantity";

  return (
    <ul>
        {
          (keyRecipes in mealPlanSingleDay) && (mealPlanSingleDay[keyRecipes].length > 0) ?
          (
            <div>
                <h4>Scheduled recipes: </h4>
                {mealPlanSingleDay[keyRecipes].map(function(recipeUid){
                  return <ScheduledRecipe recipeName = {recipesAvailableForSchedule[recipeUid].label} quantity = {mealPlanSingleDay[keyQuantity][recipeUid]} key = {recipeUid} recipeUid = {recipeUid} onRecipeUnscheduled = {(recipeName) => {onRecipeUnscheduled(recipeName);} }/>;
                })}
            </div>
          )
          :
          <h4>No recipes scheduled yet </h4>
        }
    </ul>
  );
}

const ScheduledRecipe = ({onRecipeUnscheduled, recipeName, quantity, recipeUid}) => {
  return (
    <li>
      <p>{recipeName} quantity:{quantity}</p>
      <button onClick={function(){return onRecipeUnscheduled(recipeUid)}} >Remove</button>
    </li>
  );
}

export default PlanOneDayClass;
