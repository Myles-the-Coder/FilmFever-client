import axios from 'axios';
import React from 'react';
import PropTypes from 'prop-types';
import InfoForm from '../form/info-form'

import './registration-view.scss';

function RegistrationView({ onBackClick }) {
	const handleRegister = ({ username, password, email, birthday }) => {
		axios
			.post('https://film-fever-api.herokuapp.com/signup', {
				Username: username,
				Password: password,
				Email: email,
				Birthday: birthday,
			})
			.then(res => window.open('/', '_self'))
			.catch(err => console.log('error registering the user'));
	};

	return (
    <InfoForm handleRegister={handleRegister} onBackClick={onBackClick}/>
	);
}

RegistrationView.propTypes = {
	onBackClick: PropTypes.func.isRequired
};

export default RegistrationView;
