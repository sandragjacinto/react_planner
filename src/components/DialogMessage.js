import React from 'react';
import {Modal} from 'react-bootstrap';

const DialogMessage = ({isShown, content, style}) =>
{
    return(
        <div className="static-modal">

          <Modal show={isShown} onHide={function(){}}>
            <Modal.Header closeButton>
              <Modal.Title>Message</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4>{content}</h4>
            </Modal.Body>
            <Modal.Footer>
              {<button>Close</button>}           
            </Modal.Footer>
          </Modal>

        </div>
    );
}

export default DialogMessage;
