import React from 'react';
import {Modal} from 'react-bootstrap'; //Can import individual features also from 3rd party libs

export const PlanOneDay = (props) => {
    return(
  <div className="static-modal">

        <Modal show={props.isShown} onHide={props.onClose}>
          <Modal.Header closeButton>
            <Modal.Title>Schedule</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Choose recipes to be scheduled this day</h4>
              <RecipesToSchedule recipes = {props.recipesAvailableForSchedule}/>

            <hr />
          </Modal.Body>
          <Modal.Footer>
            {<button onClick={() => 
                {
                    props.onClose();
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
  </li>
);
}

const RecipesToSchedule = (props) => {
return(
  <ul>
    {Object.keys(props.recipes).map(function(recipe){
      return <RecipeToSchedule element = {props.recipes[recipe]}/>;
    })}
  </ul>
);
}