import React from "react";
import {Button, Navbar} from "react-bootstrap";
import {Link} from 'react-router-dom'
import PropTypes from "prop-types"
import './navigation.scss'
import logo from '../../img/FilmFever.png'

const Navigation = ({ onLoggedOut, route }) => {
  const {Brand} = Navbar

  if (route === 'login') {
  return (
      <Navbar bg="light">
      <Brand><img src={logo} alt="FilmFever logo" width='60px'/></Brand>
    </Navbar>
		);
  } else {
    return (
      <>
    <Navbar bg="light">
    <Brand><img src={logo} alt="FilmFever logo" width='60px'/></Brand>
				<Link to='/'>
        <Button className='btn' onClick={onLoggedOut}>
          Sign Out
				</Button>
        </Link>
			</Navbar>
      </>
    )
  }
};

Navigation.propTypes = {
  onLoggedOut: PropTypes.func.isRequired,
  user: PropTypes.any
}

export default Navigation