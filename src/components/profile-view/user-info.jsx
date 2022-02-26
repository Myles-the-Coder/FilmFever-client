import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import '../../styles/_profile-view.scss';

const UserInfo = ({ user, setShow }) => {
	const { Body, Text, Header } = Card;
	return (
		<Row className='justify-content-center'>
			<Col xs={12} sm={10} md={8}>
				<Card className='text-center m-2'>
					<Header className='h1'>Your Profile Info</Header>
					<Body style={{ backgroundColor: 'whitesmoke' }}>
						<Text>Username: {`${user.Username}`}</Text>
						<Text>Email: {`${user.Email}`}</Text>
						<Text>Birthday: {`${user.Birthday}`}</Text>
						<Button
							className='m-1'
							bsPrefix='card-button'
							onClick={() => setShow('update')}>
							Update Info
						</Button>
						<Button
							className='m-1'
							bsPrefix='warning-button'
							onClick={() => setShow('modal')}>
							Delete Account
						</Button>
					</Body>
				</Card>
			</Col>
		</Row>
	);
};

export default UserInfo;
