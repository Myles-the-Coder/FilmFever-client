import React from 'react';
import { Formik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import * as Yup from 'yup';

const InfoForm = ({ handleRegister, editUser, setShow, onBackClick }) => {
	const schema = Yup.object({
		username: Yup.string()
			.min(3, 'Username must be at least 3 characters in length')
			.max(15, 'Username cannot be more than 15 characters long')
			.required('Valid username is required'),
		password: Yup.string()
			.min(5, 'Password must be at least 5 characters in length')
			.required('Valid password is required'),
		email: Yup.string().email().required('Valid email is required'),
		birthday: Yup.date(),
		confirmPassword: Yup.string().oneOf(
			[Yup.ref('password'), null],
			'Passwords must match'
		),
	});

	const { Group, Label, Control } = Form;

	return (
		<Formik
			validationSchema={schema}
			onSubmit={handleRegister || editUser}
			initialValues={{
				username: '',
				password: '',
				email: '',
				birthday: '',
				confirmPassword: '',
			}}>
			{({ handleSubmit, handleChange, values, touched, errors }) => (
				<Form noValidate onSubmit={handleSubmit} className='m-auto' style={{minWidth: '65%', maxWidth: '350px'}}>
					{handleRegister ? <h1>Register Account</h1> : <h1>Update Info</h1>}
					<Group controlId='validationFormik01'>
						<Label>Username</Label>
						<Control
							type='text'
							name='username'
							value={values.username}
							onChange={handleChange}
							isValid={touched.username && !errors.username}
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
							isValid={touched.password && !errors.password}
							isInvalid={errors.password}
						/>
						<Control.Feedback type='invalid'>
							{errors.password}
						</Control.Feedback>
					</Group>
					<Group controlId='validationFormik03'>
						<Label>Email Address</Label>
						<Control
							type='email'
							placeholder='Enter email...'
							name='email'
							value={values.email}
							onChange={handleChange}
							isValid={touched.email && !errors.email}
							isInvalid={errors.email}
						/>

						<Control.Feedback type='invalid'>{errors.email}</Control.Feedback>
					</Group>

					<Group md='3' controlId='validationFormik04'>
						<Label>Birthday</Label>
						<Control
							type='date'
							placeholder='Enter birthday...'
							name='birthday'
							value={values.birthday}
							onChange={handleChange}
							isValid={touched.birthday && !errors.birthday}
							isInvalid={errors.birthday}
						/>
						<Control.Feedback type='invalid'>
							{errors.birthday}
						</Control.Feedback>
					</Group>

					<Group md='3' controlId='validationFormik05'>
						<Label>Confirm Password</Label>
						<Control
							type='password'
							placeholder='Confirm password'
							name='confirmPassword'
							value={values.confirmPassword}
							onChange={handleChange}
							isValid={touched.birthday && !errors.birthday}
							isInvalid={errors.confirmPassword}
						/>

						<Control.Feedback type='invalid'>
							{errors.confirmPassword}
						</Control.Feedback>
					</Group>
					<Button type='submit' className='m-1'>
						{handleRegister ? 'Register' : 'Update'}
					</Button>
					<Button
						type='button'
						onClick={() => {
							handleRegister ? onBackClick() : setShow('');
						}}>
						Back
					</Button>
				</Form>
			)}
		</Formik>
	);
};

Form.propTypes = {
	handleRegister: PropTypes.func,
};

export default InfoForm;
