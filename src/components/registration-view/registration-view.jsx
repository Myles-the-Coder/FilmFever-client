import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

import './registration-view.scss';

export function RegistrationView({ onRouteChange }) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const [birthday, setBirthday] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const { Group, Label, Control } = Form;

  const	handleRegister = e => {
		e.preventDefault()
    if (password !== confirmPassword) {
      alert('Passwords do not match')
    } else {
			onRouteChange('login')
    }
	};

	return (
		<Form className='mt-2'>
			<Group>
				<Label>Username</Label>
				<Control
					type='text'
					value={username}
					name='username'
					placeholder='Enter username...'
					onChange={e => setUsername(e.target.value)}
          required
				/>
			</Group>

			<Group>
				<Label>Email</Label>
				<Control
					type='email'
					value={email}
					name='email'
					placeholder='Enter email...'
					onChange={e => setEmail(e.target.value)}
          required
				/>
			</Group>

			<Group>
				<Label htmlFor='birthday'>Birthday</Label>
				<Control
					type='date'
					value={birthday}
					id='birthday'
					name='birthday'
					onChange={e => setBirthday(e.target.value)}
				/>
			</Group>

			<Group>
				<Label htmlFor='password'>Password</Label>
				<Control
					type='password'
					value={password}
					id='password'
					name='password'
          minLength='8'
					placeholder='Enter password...'
					onChange={e => setPassword(e.target.value)}
          required
				/>
			</Group>

			<Group>
				<Label htmlFor='confirm-password'>Confirm Password</Label>
				<Control
					type='password'
					value={confirmPassword}
					id='confirm-password'
					name='confirm-password'
					placeholder='Enter password again...'
					onChange={e => setConfirmPassword(e.target.value)}
				/>
			</Group>
			<Button type='submit' className='m-2' onClick={handleRegister}>
				Register
			</Button>
		</Form>
	);
}

RegistrationView.propTypes = {
	onRouteChange: PropTypes.func.isRequired,
};
