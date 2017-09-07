import React from 'react';
import Profile from './Profile.js'
import base from '../base';
import { getUserLoginData } from './DataUser';
import { setUserData } from './DataUser';
import { Link } from 'react-router-dom'
import { Modal } from 'react-bootstrap';




export class OnLineShopping extends React.Component {

    

    render() {
        var scope = this;
        return (



        <div className="static-modal bodyText">

            <Modal show={this.props.isShown} onHide={function () { scope.props.onClose() }}>
            
            <Modal.Header closeButton>
                <Modal.Title className='titleH1' style={{textAlign:'center'}}>DONE</Modal.Title>
            </Modal.Header>
            
            <Modal.Body>
                <p className='bodyText'>YOUR GROCERY LIST HAS BEEN SENT ! </p>

            </Modal.Body>
            
            <Modal.Footer>
                {<button className='btn btn-success bodyText' onClick={() => {
                this.props.onClose();
                }
                }>Close</button>}
            </Modal.Footer>
            
            </Modal>

        </div>




        )
    }
}

export default OnLineShopping;