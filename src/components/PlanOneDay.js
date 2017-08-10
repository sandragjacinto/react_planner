import React from 'react';
import {Modal} from 'react-bootstrap'; //Can import individual features also from 3rd party libs

////COMPONENTS
//Popup to schedule a day with delicious recipes :)
export const PlanOneDay = ({isShown, onClose, recipesAvailableForSchedule}) => {
    return(
  <div className="static-modal">

        <Modal show={isShown} onHide={onClose}>
          <Modal.Header closeButton>
            <Modal.Title>Schedule</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Choose recipes to be scheduled this day</h4>
              <RecipesToSchedule recipes = {recipesAvailableForSchedule}/>

            <hr />
          </Modal.Body>
          <Modal.Footer>
            {<button onClick={() => 
                {
                    onClose();
                }
                }>Close</button>}           
          </Modal.Footer>
        </Modal>

  </div>
);
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
return(
  <ul>
    {Object.keys(props.recipes).map(function(recipe, index){
      return <RecipeToSchedule element = {props.recipes[recipe]}  key = {index} onRecipeScheduled = {(recipeName) => {onRecipeScheduled(recipeName)}}/>;
    })}
  </ul>
);
}

const ScheduledRecipes = ({recipes}) => {
  return (
    <ul>
      {recipes.map(function(recipe, index){
        return <ScheduledRecipe recipe = {recipe} key = {index} onRecipeUnscheduled = {(recipeName) => {onRecipeUnscheduled(recipeName);} }/>;
      })}
    </ul>
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

////FUNCTIONS
const onRecipeScheduled = (recipeName) => {
  console.log(`onRecipeScheduled: ${recipeName}`);
}

const onRecipeUnscheduled = (recipeName) => {
  console.log(`onRecipeUnscheduled: ${recipeName}`);
}
