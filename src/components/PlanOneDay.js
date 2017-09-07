import React from 'react';
import { Modal } from 'react-bootstrap'; //Can import individual features also from 3rd party libs
import { writeDB } from './Database';

//Popup to schedule a day with delicious recipes :)
class PlanOneDayClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mealPlanSingleDay: {}
    };
  }

  onRecipeScheduled = (recipeUid) => {
    var mealPlanSingleDay = this.props.mealPlanSingleDay;
    var keyRecipes = "recipes", keyQuantity = "quantity", keyMealPlan = "mealPlan";


    if(!(keyRecipes in mealPlanSingleDay) || !(keyQuantity in mealPlanSingleDay))
    {
      //console.log("onRecipeScheduled creating fields. mealPlanSingleDay:", mealPlanSingleDay);

      mealPlanSingleDay[keyRecipes] = [];
      mealPlanSingleDay[keyQuantity] = {};
    }

    if (!mealPlanSingleDay[keyRecipes].includes(recipeUid)) {
      mealPlanSingleDay[keyRecipes].push(recipeUid);
      mealPlanSingleDay[keyQuantity][recipeUid] = 1;
    }
    else {
      mealPlanSingleDay[keyQuantity][recipeUid]++;
    }
    var dbPath = [keyMealPlan, this.props.dateToPlan];
    writeDB(dbPath, mealPlanSingleDay);
    this.setState({ mealPlanSingleDay: mealPlanSingleDay });
  }

  onRecipeUnscheduled = (recipeUid) => {
    //Unscheduled from state
    var keyRecipes = "recipes", keyQuantity = "quantity", keyMealPlan = "mealPlan";
    var mealPlanSingleDay = this.props.mealPlanSingleDay;
    if (mealPlanSingleDay[keyQuantity][recipeUid] <= 1) {
      delete mealPlanSingleDay[keyQuantity][recipeUid];
      mealPlanSingleDay[keyRecipes].splice(mealPlanSingleDay[keyRecipes].indexOf(recipeUid), 1);
    }
    else {
      mealPlanSingleDay[keyQuantity][recipeUid]--;
    }
    this.setState({ mealPlanSingleDay: mealPlanSingleDay });

    //Unschedule on db
    var dbPath = [keyMealPlan, this.props.dateToPlan];
    writeDB(dbPath, mealPlanSingleDay);
  }

  render() {
    //console.log("planoneday render " + this.props.mealPlanSingleDay + this.props.dateToPlan);
    var scope = this;
    var dateToPlan = new Date(Number(this.props.dateToPlan));
    console.log("planoneday render date:", this.props.dateToPlan, ",string date:", dateToPlan.toDateString() );
    return (
      <div className="static-modal bodyText">

        <Modal show={this.props.isShown} onHide={function () { scope.props.onClose() }}>
          <Modal.Header closeButton>
            <Modal.Title className='titleH1' style={{textAlign:'center'}}>SCHEDULE FOR {dateToPlan.toDateString()}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4 className="bodyText" style={{textAlign:'center'}}>CHOSE RECIPES TO BE SCHEDULED : </h4>
            <RecipesToSchedule recipes={this.props.recipesAvailableForSchedule} mealPlanSingleDay={this.props.mealPlanSingleDay} onRecipeScheduled={this.onRecipeScheduled} />
            <hr />
            <ScheduledRecipes mealPlanSingleDay={this.props.mealPlanSingleDay} onRecipeUnscheduled={this.onRecipeUnscheduled} recipesAvailableForSchedule={this.props.recipesAvailableForSchedule} />
            
          </Modal.Body>
          <Modal.Footer>
            {<button className='btn btn-success bodyText' onClick={() => {
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
  return (

    <div className='row'>
      <div className='col-md-8'>
        <p className="bodyText" >{props.element.label}</p>
        <br></br>
      </div>
      <div className='col-md-4'>
        <button className="btn btn-primary bodyText" onClick={function () { return props.onRecipeScheduled(props.recipeUid) }} >Select</button>
        <br></br>
      </div>
    </div>

  );
}

const RecipesToSchedule = (props) => {

  if (props.recipes != undefined) {
    return (
      <ul>
        {Object.keys(props.recipes).map(function (recipeUid) {
          return <RecipeToSchedule element={props.recipes[recipeUid]} key={recipeUid} recipeUid={recipeUid} onRecipeScheduled={props.onRecipeScheduled} />;
        })}
      </ul>
    );
  }
  else
  {
    return(
      <h3 className='titleH1 errorMessage' >OOPS! YOU HAVEN'T CHOSEN ANY MEAL YET ...</h3>
    );
  }
}

const ScheduledRecipes = ({ mealPlanSingleDay, onRecipeUnscheduled, recipesAvailableForSchedule }) => {
  var keyRecipes = "recipes", keyQuantity = "quantity";

  return (
    <div>
      {
        (keyRecipes in mealPlanSingleDay) && (mealPlanSingleDay[keyRecipes].length > 0) ?
          (
            <div>
              <h4 className="bodyText" style={{textAlign:'center'}}>SCHEDULED RECIPES : </h4>
              {mealPlanSingleDay[keyRecipes].map(function (recipeUid) {
                return <ScheduledRecipe recipeName={recipesAvailableForSchedule[recipeUid].label} quantity={mealPlanSingleDay[keyQuantity][recipeUid]} key={recipeUid} recipeUid={recipeUid} onRecipeUnscheduled={(recipeName) => { onRecipeUnscheduled(recipeName); }} />;
              })}
            </div>
          )
          :
          <h4 className="bodyText" style={{textAlign:'center'}}>NO RECIPES SCHEDULED YET</h4>
      }
    </div>
  );
}

const ScheduledRecipe = ({ onRecipeUnscheduled, recipeName, quantity, recipeUid }) => {
  return (
    <ul>
    <div className='row'>
      <div className='col-md-7'>
        <p className="bodyText">{recipeName}</p>
        <br></br>
        </div>
      <div className='col-md-3 col-md-offset-1'>
        <button className="btn btn-danger bodyText" onClick={function () { return onRecipeUnscheduled(recipeUid) }} >Remove</button>
        <button className='btn btn-primary'>{quantity}</button>
        <br></br>
      </div>
    </div>
    </ul>
  );
}

export default PlanOneDayClass;
