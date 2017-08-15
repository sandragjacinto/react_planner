import React from 'react';
import {Modal} from 'react-bootstrap'; //Can import individual features also from 3rd party libs

/////////////////////////////////////////
////COMPONENTS
/////////////////////////////////////////
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

  onRecipeScheduled(recipeName)
  {

  }

  render()
  {
    console.log("planoneday render " + this.props.mealPlan + this.props.dateToPlan);
    return(
        <div className="static-modal">

        <Modal show={this.props.isShown} onHide={this.props.onClose}>
          <Modal.Header closeButton>
            <Modal.Title>Schedule for {this.props.dateToPlan}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Choose recipes to be scheduled: </h4>
              <RecipesToSchedule recipes = {this.props.recipesAvailableForSchedule} mealPlanSingleDay = {this.props.mealPlan[this.props.dateToPlan]} onRecipeScheduled = {this.onRecipeScheduled} />
              <ScheduledRecipes mealPlanSingleDay = {this.props.mealPlan[this.props.dateToPlan]}/>
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
      <h3>{props.element.label}</h3>
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
            return <RecipeToSchedule element = {props.recipes[recipe]}  key = {index} onRecipeScheduled = {(recipeName) => {onRecipeScheduled(recipeName)}}/>;
          })}
      </ul>
    );
  }

}

const ScheduledRecipes = ({mealPlanSingleDay}) => {
  var keyRecipes = "recipes";
  return (
    <div>
        {
          keyRecipes in mealPlanSingleDay ?
          mealPlanSingleDay["recipes"].map(function(recipe, index){
            return <ScheduledRecipe recipe = {recipe} key = {index} onRecipeUnscheduled = {(recipeName) => {onRecipeUnscheduled(recipeName);} }/>;
          })
          :
          <div>No recipes scheduled yet</div>
        }
    </div>
  );
}

const ScheduledRecipe = (props) => {
  return (
    <li>
      <p>{props.recipe}</p>
      <button value={props.index} onClick={function(){return props.onRecipeUnscheduled(props.recipe)}} >Remove</button>
    </li>
  );
}

/////////////////////////////////////////
////FUNCTIONS
/////////////////////////////////////////
const onRecipeScheduled = (recipeName) => {
  console.log(`onRecipeScheduled: ${recipeName}`);

}

const onRecipeUnscheduled = (recipeName) => {
  console.log(`onRecipeUnscheduled: ${recipeName}`);
}

export default PlanOneDayClass;
