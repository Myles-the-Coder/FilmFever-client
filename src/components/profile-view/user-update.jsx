import React from 'react';
import { Form, Button } from 'react-bootstrap';

const UserUpdate = ({
	setShow,
	editUser,
	setUsername,
	setPassword,
	setBirthday,
	setEmail,
}) => {
	const { Group, Label, Control } = Form;
	return (
		<Form className='update-form' style={{width: '80%', marginTop: '10px'}}>
			<h2>Update your data</h2>
			<Group>
				<Label>Username:</Label>
				<Control
					type='text'
					onChange={e => {
            console.log(e.target.value)
            setUsername(e.target.value)
          }}
					placeholder='Username'></Control>
			</Group>
			<Group>
				<Label>Password:</Label>
				<Control
					type='password'
					onChange={e => setPassword(e.target.value)}
					placeholder='Password'></Control>
			</Group>
			<Group>
				<Label>Email:</Label>
				<Control
					type='email'
					onChange={e => setEmail(e.target.value)}
					placeholder='Email'></Control>
			</Group>
			<Group>
				<Label>Birthday:</Label>
				<Control
					type='date'
					onChange={e => setBirthday(e.target.value)}
					placeholder='Birthday'></Control>
			</Group>

			<Button variant='outline-primary' type='submit' onClick={editUser}>
				Submit
			</Button>

			<Button className='m-1' onClick={() => setShow('')}>
				Close
			</Button>
		</Form>
	);
};

export default UserUpdate;
