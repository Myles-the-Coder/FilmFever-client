import React from "react";
import {Button, Navbar} from "react-bootstrap";
import {Link} from 'react-router-dom'
import PropTypes from "prop-types"
import logo from '../../img/FilmFever.png'

import '../../styles/_navigation.scss'

const Navigation = ({ onLoggedOut, user }) => {
  const {Brand, Toggle, Collapse} = Navbar

  if (!user) {
  return (
      <Navbar className='navbar-styling' >
      <Brand><img src={logo} alt="FilmFever logo" width='70px'/></Brand>
    </Navbar>
		);
  } else {
    return (
    <Navbar collapseOnSelect expand='lg' className='navbar-styling'>
    <Brand><img src={logo} alt="FilmFever logo" width='70px'/></Brand>
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