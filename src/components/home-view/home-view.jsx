import React from 'react'
import logo from '../../img/FilmFever.png'
import {Col, Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'

function HomeView() {
  return (
      <Col style={{backgroundColor: 'lightgray', borderRadius: '5px'}} className='justify-content-center text-center p-5'>
        <h1>Welcome to</h1>
        <img src={logo} alt="FilmFever Logo" />
        <Link to='/register'>
          <Button>Create Account</Button>
        </Link>
        <Link to='/login'>
          <Button>Sign In</Button>
        </Link>
      </Col>
  )
}

export default HomeView
