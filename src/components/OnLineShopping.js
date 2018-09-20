import React from 'react';
import Profile from './Profile.js'
import base from '../base';
import { getUserLoginData } from './DataUser';
import { setUserData } from './DataUser';
import { Link } from 'react-router-dom'
import { Modal } from 'react-bootstrap';
import mail from './../icons/mailSent2.png';





export class OnLineShopping extends React.Component {



    render() {
        var scope = this;
        return (

            <div className="static-modal bodyText">

                <Modal show={this.props.isShown} onHide={function () { scope.props.onClose() }}>
                    <div className='backgroundPopUp' >

                        <div  style={{ backgroundColor: 'white', margin: '15px', marginBottom: '10px', marginTop: '10px' }}>
                            <Modal.Header closeButton>
                                <Modal.Title className='titleH1' style={{ textAlign: 'center' }}>
                                ORDER SENT
                                </Modal.Title>
                            </Modal.Header>

                            <Modal.Body style={{textAlign:'center'}}>
                                <p className='bodyText' style={{fontSize:'12pt'}}>YOUR GROCERY LIST HAS BEEN SENT ! </p>
                                <br></br>
                                <img style={{ width: '20%' }} src={mail} />
                            </Modal.Body>


                        </div>
                    </div>
                </Modal>

            </div>




        )
    }
}

export default OnLineShopping;