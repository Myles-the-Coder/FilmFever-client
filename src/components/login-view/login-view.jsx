import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import {Button} from 'react-bootstrap'
import PropTypes from 'prop-types'

import './login-view.scss'
import { func } from 'prop-types';

export function LoginView({onRouteChange}) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = e => {
		e.preventDefault();
		console.log(username, password);
    onRouteChange('home')
	};

  const switchToRegister = () => {
    onRouteChange('register')
  }
  const {Group, Label, Control} = Form

	return (
		<Form>
      <Group>
			<Label htmlFor='username'>Username</Label>
			<Control
				type='text'
				value={username}
				name='username'
				id='username'
				onChange={e => setUsername(e.target.value)}
			/>
      </Group>
      <Group>
			<Label htmlFor='password'>Password</Label>
			<Control
				type='password'
				value={password}
				id='password'
        name="password"
				onChange={e => setPassword(e.target.value)}
			/>
      <Button type="submit" onClick={handleSubmit}>Submit</Button>
		</Group>
    <p>Don't have an account? <Button type="button" onClick={switchToRegister}>Register</Button></p>
    </Form>
	);
}

LoginView.propTypes = {
  onRouteChange: PropTypes.func.isRequired
}