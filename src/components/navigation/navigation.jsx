import React from "react";
import {Button, Navbar} from "react-bootstrap";
import {Link} from 'react-router-dom'
import PropTypes from "prop-types"
import './navigation.scss'
import logo from '../../img/FilmFever.png'

const Navigation = ({ onLoggedOut, user }) => {
  const {Brand, Toggle, Collapse} = Navbar

  if (!user) {
  return (
      <Navbar bg="light">
      <Brand><img src={logo} alt="FilmFever logo" width='60px'/></Brand>
    </Navbar>
		);
  } else {
    return (
    <Navbar collapseOnSelect expand='lg' bg="light">
    <Brand><img src={logo} alt="FilmFever logo" width='60px'/></Brand>
    <Toggle aria-controls="responsive-navbar-nav"/>
    <Collapse id='responsive-navbar-nav' className='justify-content-end'>
				<Link to='/'>
        <Button className='btn' onClick={onLoggedOut} className='m-2'>
          Sign Out
				</Button>
        </Link>
        <Link to={`/users/${user}`}>
        <Button>Profile</Button>
        </Link>
    </Collapse>
			</Navbar>
    )
  }
};

Navigation.propTypes = {
  onLoggedOut: PropTypes.func.isRequired,
  user: PropTypes.any
}

export default Navigation