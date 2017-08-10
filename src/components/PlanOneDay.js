import React from 'react';
import {Modal} from 'react-bootstrap'; //Can import individual features also from 3rd party libs

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
      <button style={btnStyle} key={props.index} value={props.index} onClick={function(){return props.onRecipeScheduled(props.element.label)}} >Select</button>
  </li>
);
}

const RecipesToSchedule = (props) => {
return(
  <ul>
    {Object.keys(props.recipes).map(function(recipe, index){
      return <RecipeToSchedule element = {props.recipes[recipe]}  key = {index}/>;
    })}
  </ul>
);
}