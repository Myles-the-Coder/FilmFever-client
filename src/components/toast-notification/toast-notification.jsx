import React, {useState} from 'react'
import {Toast, ToastContainer} from 'react-bootstrap'
import {Col} from 'react-bootstrap'

function ToastNotification({show, setShow, currentFilmTitle}) {
  const [message, setMessage] = useState('')
  if (currentFilmTitle) {
    setMessage(`${currentFilmTitle} has been added to Favorites`)
  }
  return (
      <Col xs={6}>
        <ToastContainer style={{zIndex: '100', position: 'fixed', top: '15%', right: '0', textAlign: 'center'}}>
        <Toast onClose={setShow} show={show} delay={3000} autohide style={{backgroundColor: 'whitesmoke'}}>
          <Toast.Body>{message}</Toast.Body>
        </Toast>
        </ToastContainer>
      </Col>
  );
}

export default ToastNotification
