import React from 'react'
import {Toast} from 'react-bootstrap'
import {Col, Row } from 'react-bootstrap'

function ToastNotification({show, setShow}) {
  return (
    <Row>
      <Col xs={6}>
        <Toast onClose={() => setShow(false)} position="top-start" show={show} delay={3000} autohide>
          <Toast.Header>
            <strong className="me-auto">Bootstrap</strong>
            <small>11 mins ago</small>
          </Toast.Header>
          <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
        </Toast>
      </Col>
    </Row>
  );
}

export default ToastNotification
