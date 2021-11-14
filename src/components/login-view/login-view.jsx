import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import LoginForm from '../form/login-form';

import '../../styles/_login-view.scss';

function LoginView({ onLoggedIn }) {
	const handleLogin = ({ username, password }) => {
		axios
			.post('https://film-fever-api.herokuapp.com/login', {
				Username: username,
				Password: password,
			})
			.then(res => onLoggedIn(res.data))
			.catch(err => console.log(err));
	};

	return (
    <LoginForm handleLogin={handleLogin}/>
	);
}
LoginView.propTypes = {
	onLoggedIn: PropTypes.func.isRequired,
};

export default LoginView;
