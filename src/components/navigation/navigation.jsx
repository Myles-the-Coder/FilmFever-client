import React from "react";
import {Button, Nav} from "react-bootstrap";
import PropTypes from "prop-types"
import './navigation.scss'

const Navigation = ({ onRouteChange, isSignedIn }) => {
	if (isSignedIn) {
		return (
			<Nav>
				<Button className='btn' onClick={() => onRouteChange('login')}>
					Sign Out
				</Button>
			</Nav>
		);
	} else {
		return (
			<Nav>
				<Button className='btn' onClick={() => onRouteChange('login')}>
					Sign In
				</Button>
				<Button className='btn' onClick={() => onRouteChange('register')}>
					Register
				</Button>
			</Nav>
		);
	}
};

Navigation.propTypes = {
  onRouteChange = PropTypes.func.isRequired,
  isSignedIn = PropTypes.bool.isRequired
}

export default Navigation