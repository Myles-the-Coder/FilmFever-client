import React from 'react'
import { Formik } from 'formik'
import {Form, Button} from 'react-bootstrap'
import PropTypes from 'prop-types'
import * as Yup from 'yup'
import {Link} from 'react-router-dom'

function LoginForm({handleLogin}) {
  const loginSchema = Yup.object({
		username: Yup.string().required('Enter username'),
		password: Yup.string().required('Enter password'),
	});

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
      values,
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
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired
}

export default LoginForm
