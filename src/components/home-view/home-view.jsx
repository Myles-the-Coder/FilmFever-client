import React from 'react'
import logo from '../../img/FilmFever.png'
import {Col, Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'

import '../../styles/_home-view.scss'

const HomeView = () => {
  return (
      <Col className='home-view-col d-flex flex-column text-center p-2 m-auto' xs={10} md={8} lg={6}>
        <img src={logo} alt="FilmFever Logo" style={{width: '300px', margin: '-30px auto'}}/>
        <Link to='/register'>
          <Button bsPrefix='card-button'>Register Account</Button>
        </Link>
        <Link to='/login'>
          <Button bsPrefix='card-button'>Sign In</Button>
        </Link>
      </Col>
  )
}

export default HomeView
