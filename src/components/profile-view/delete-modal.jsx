import React from 'react'
import {Modal, Button} from 'react-bootstrap'

const DeleteModal = ({show, setShow, deleteUser}) =>  {

  const {Header, Body, Footer, Title} = Modal
  return (
    <Modal className='text-center' show={show} onHide={() => setShow('')}>
    <Header closeButton>
      <Title>Warning!</Title>
    </Header>
    <Body>This action will delete all account information.</Body>
    <Footer>
      <Button variant="secondary" onClick={() => setShow('')}>
        Close
      </Button>
      <Button variant="danger" onClick={deleteUser}>
        Delete Account
      </Button>
    </Footer>
  </Modal>
  )
}

export default DeleteModal
