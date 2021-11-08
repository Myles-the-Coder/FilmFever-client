import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import PropTypes from 'prop-types'

import './registration-view.scss'

export function RegistrationView(props) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [birthday, setBirthday] = useState('')

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
			<Label htmlFor='email'>Email</Label>
			<Control
				type='email'
				value={email}
				id='email'
        name="email"
				onChange={e => setEmail(e.target.value)}
			/>
		</Group>

    <Group>
			<Label htmlFor='birthday'>Birthday</Label>
			<Control
				type='date'
				value={birthday}
				id='birthday'
        name="birthday"
				onChange={e => setBirthday(e.target.value)}
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
		</Group>
      <Button type="submit">Register</Button>
    </Form>
  )
}

RegistrationView.propTypes = {
  onRouteChange: PropTypes.func.isRequired
}