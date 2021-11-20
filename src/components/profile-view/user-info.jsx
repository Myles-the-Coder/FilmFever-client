import React from 'react'
import {Card, Button, Row, Col} from 'react-bootstrap'
import '../../styles/_profile-view.scss'

const UserInfo = ({user, email, birthday, setShow}) => {
  const { Body, Text, Header } = Card;
  return (
    <Row className='justify-content-center'>
        <Col xs={12} sm={10} md={8}>
    <Card className='text-center m-1'>
      <Header className='h1'>Profile Info</Header>
      <Body style={{backgroundColor: 'lightgray'}}>
    <Text>Username: {`${user}`}</Text>
    <Text>Email: {`${email}`}</Text>
    <Text>Birthday: {`${birthday}`}</Text>
    <Button className='w-25 m-1' bsPrefix='card-button' onClick={() => setShow('update')}>Update Info</Button>
			<Button className='w-25 m-1' bsPrefix='warning-button'  onClick={() => setShow('modal')}>Delete Account</Button>
    </Body>
    </Card>
    </Col>
    </Row>
  )
}

export default UserInfo