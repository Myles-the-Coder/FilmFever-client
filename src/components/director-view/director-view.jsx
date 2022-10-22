import React from 'react';
import { Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useNavigate, useParams } from 'react-router-dom';

import '../../styles/_button.scss';

const DirectorView = ({ movies }) => {
	const params = useParams();
	const navigate = useNavigate();
	const { Director } = movies.find(movie => movie.Director.Name === params.Name);
	const { Body, Title, Text } = Card;
	const { Name, Bio } = director;
	return (
		<Card className='text-center mt-1' style={{ backgroundColor: 'lightgray' }}>
			<Body>
				<Title>{Name}</Title>
				<Text>{Bio}</Text>
				<Button bsPrefix='card-button' onClick={() => navigate(-1)}>
					Back
				</Button>
			</Body>
		</Card>
	);
};

// const {string, func, shape} = PropTypes

// DirectorView.propTypes = {
//   director: shape({
//     Name: string.isRequired,
//     Bio: string.isRequired,
//     BirthDate: string,
//     DeathDate: string,
//   }).isRequired,
//   onBackClick: func.isRequired
// }

export default DirectorView;
