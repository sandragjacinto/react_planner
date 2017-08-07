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
            <p>bla bla.</p>

            <hr />
          </Modal.Body>
          <Modal.Footer>
            {<button onClick={() => 
                {
                    //console.log("trying to close popup");
                    props.onClose();
                }
                }>Close</button>}
            {<button onClick={() => {console.log("close test")}}>whatever</button>}
          </Modal.Footer>
        </Modal>

  </div>
);
}