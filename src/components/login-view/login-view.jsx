import React, {useState} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import LoginForm from '../form/login-form';
import { URL } from '../../helpers/helpers';
import ErrorMessage from '../error-message/error-message';
import '../../styles/_login-view.scss';

function LoginView({ onLoggedIn }) {
  const [error, setError] = useState(false))
	const handleLogin = ({ username, password }) => {
		axios
			.post(`${URL}/login`, {
				Username: username,
				Password: password,
			})
			.then(res => onLoggedIn(res.data))
			.catch(err => {
        setTimeout(() => {
          setError(false)
        }, 5000);
        setError(true)
      });
	};

	return (
    <>
    <LoginForm handleLogin={handleLogin}/>
    {error ? <ErrorMessage message='Incorrect username or password'/> : <></>}
    </>
	);
}
LoginView.propTypes = {
	onLoggedIn: PropTypes.func.isRequired,
};

export default LoginView;
