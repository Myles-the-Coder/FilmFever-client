import React from "react";
import {Button, Navbar} from "react-bootstrap";
import PropTypes from "prop-types"
import './navigation.scss'
import logo from '../../img/FilmFever.png'

const Navigation = ({ onRouteChange, isSignedIn }) => {
  const {Brand} = Navbar

	if (isSignedIn) {
		return (
			<Navbar bg="light" className=''>
        <Brand><img src={logo} alt="FilmFever logo" width='60px'/></Brand>
				<Button className='btn' onClick={() => onRouteChange('login')} >
					Sign Out
				</Button>
			</Navbar>
		);
	} else {
		return (
			<Navbar bg="light">
        <Brand><img src={logo} alt="FilmFever logo" width='60px'/></Brand>
			</Navbar>
		);
	}
};

Navigation.propTypes = {
  onRouteChange: PropTypes.func.isRequired,
  isSignedIn: PropTypes.bool.isRequired
}

export default Navigation