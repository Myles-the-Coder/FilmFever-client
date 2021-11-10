import React, { useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

import './login-view.scss';

function LoginView({ onRouteChange, onLoggedIn}) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = e => {
		e.preventDefault();
		axios
			.post('https://film-fever-api.herokuapp.com/login', {
				Username: username,
				Password: password,
			})
			.then(res => {
        onLoggedIn(res.data)
        onRouteChange('login')
      })
			.catch(err => console.log(err));
	};

	const switchToSignup = () => {
		onRouteChange('register');
	};

	const { Group, Label, Control } = Form;

	return (
		<Form className='mt-2'>
			<Group controlId='formUsername'>
				<Label>Username:</Label>
				<Control
					type='text'
					value={username}
					name='username'
					placeholder='Enter Username...'
					onChange={e => setUsername(e.target.value)}
				/>
			</Group>
			<Group controlId='formPassword'>
				<Label>Password:</Label>
				<Control
					type='password'
					value={password}
					name='password'
					placeholder='Enter Password...'
					onChange={e => setPassword(e.target.value)}
				/>
				<Button type='submit' onClick={handleSubmit} className='m-2'>
					Submit
				</Button>
			</Group>
			<p>
				Don't have an account?
        <Link to='/register'>
				<Button variant='primary'>
					Sign Up
				</Button>
        </Link>
			</p>
		</Form>
	);
}

LoginView.propTypes = {
	onRouteChange: PropTypes.func,
	onLoggedIn: PropTypes.func.isRequired,
};

export default LoginView