import React from 'react'
import {Form, Button} from 'react-bootstrap'

const UserUpdateForm = () => {
  return (
    <Form className='update-form'>
    <h2>Update your data</h2>
    <Form.Group>
      <Form.Label>Username:</Form.Label>
      <Form.Control
        type='text'
        onChange={e => this.setUsername(e.target.value)}
        placeholder='Username'></Form.Control>
    </Form.Group>
    <Form.Group>
      <Form.Label>Password:</Form.Label>
      <Form.Control
        type='password'
        onChange={e => this.setPassword(e.target.value)}
        placeholder='Password'></Form.Control>
    </Form.Group>
    <Form.Group>
      <Form.Label>Email:</Form.Label>
      <Form.Control
        type='email'
        onChange={e => this.setEmail(e.target.value)}
        placeholder='Email'></Form.Control>
    </Form.Group>
    <Form.Group>
      <Form.Label>Birthday:</Form.Label>
      <Form.Control
        type='date'
        onChange={e => this.setBirthday(e.target.value)}
        placeholder='Birthday'></Form.Control>
    </Form.Group>

    <Button variant='outline-primary' type='submit'>
      Submit
    </Button>
  </Form>
  )
}

export default UserUpdateForm