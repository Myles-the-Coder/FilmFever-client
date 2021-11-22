import React from 'react';
import { Col } from 'react-bootstrap';

function NoMoviesFound({ message }) {
	const messageStyle = {
		backgroundColor: 'whitesmoke',
		borderRadius: '10px',
		padding: '10px',
	};
	return (
		<Col className='text-center m-2'>
			<h1 style={messageStyle}>{message}</h1>
		</Col>
	);
}

export default NoMoviesFound;
