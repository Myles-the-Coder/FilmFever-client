import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik } from 'formik';

import './login-view.scss';

function LoginView({ onLoggedIn }) {
	const loginSchema = Yup.object({
		username: Yup.string().required('Valid username is required'),
		password: Yup.string().required('Valid password is required'),
	});

	const handleLogin = ({ username, password }) => {
		axios
			.post('https://film-fever-api.herokuapp.com/login', {
				Username: username,
				Password: password,
			})
			.then(res => onLoggedIn(res.data))
			.catch(err => console.log(err));
	};

	const { Group, Label, Control } = Form;

	return (
		<Formik
			validationSchema={loginSchema}
			onSubmit={handleLogin}
			initialValues={{
				username: '',
				password: '',
			}}>
			{({
				handleSubmit,
				handleChange,
				handleBlur,
				values,
				touched,
				isValid,
				errors,
			}) => (
				<Form noValidate onSubmit={handleSubmit}>
					<h1>Login</h1>
					<Group controlId='validationFormik01'>
						<Label>Username</Label>
						<Control
							type='text'
							name='username'
							value={values.username}
							onChange={handleChange}
							isInvalid={errors.username}
						/>
						<Control.Feedback type='invalid'>
							{errors.username}
						</Control.Feedback>
					</Group>

					<Group controlId='validationFormik02'>
						<Label>Password</Label>
						<Control
							type='password'
							name='password'
							value={values.password}
							onChange={handleChange}
							isInvalid={errors.password}
						/>
						<Control.Feedback type='invalid'>
							{errors.password}
						</Control.Feedback>
					</Group>
					<Button type='submit' className='m-1'>
						Login
					</Button>
					<p>
						Don't have an account?
						<Link to='/register'>
							<Button variant='link'>Sign Up</Button>
						</Link>
					</p>
				</Form>
			)}
		</Formik>
	);
}
LoginView.propTypes = {
	onLoggedIn: PropTypes.func.isRequired,
};

export default LoginView;
