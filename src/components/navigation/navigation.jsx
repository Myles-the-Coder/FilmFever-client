import React from "react";
import {Button, Navbar} from "react-bootstrap";
import {Link} from 'react-router-dom'
import PropTypes from "prop-types"
import logo from '../../img/FilmFever.png'
import '../../styles/_navigation.scss'

const Navigation = ({ onLoggedOut, user }) => {
  const {Brand, Toggle, Collapse} = Navbar
  const buttonStyling = {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#000'
  }

  if (!user.Username) {
  return (
      <Navbar>
      <Brand><img src={logo} alt="FilmFever logo" width='70px'/></Brand>
    </Navbar>
		);
  } else {
    return (
    <Navbar collapseOnSelect expand='lg' sticky='top' className='navbar-styling'>
    <Brand><img src={logo} alt="FilmFever logo" width='70px'/></Brand>
    <Toggle aria-controls="responsive-navbar-nav"/>
    <Collapse id='responsive-navbar-nav' className='justify-content-end'>
				<Link to='/'>
        <Button bg='custom-button' onClick={onLoggedOut}>
          Sign Out
				</Button>
        </Link>
        <Link to={`/users/${user.Username}`}>
        <Button className='m-2' style={buttonStyling}>Profile</Button>
        </Link>
        <Link to='/movies'>
        <Button style={buttonStyling}>Movies</Button>
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