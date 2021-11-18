import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import {Link} from 'react-router-dom'

import '../../styles/_movie-card.scss';

class MovieCard extends React.Component {
	render() {
		const { movie, addMovieToFavorites } = this.props;
		const { Title, ImagePath, Description, _id } = movie;
		const { Img, Body, Text, Header } = Card;

		return (
			<Card className='text-center'>
				<Header as='h5'>{Title}</Header>
				<Img
					variant='top'
					src={ImagePath}
					alt={Title}
					crossOrigin='anonymous'
          className='p-1 w-75 m-auto'
				/>
				<Body className='card-styling'>
					<Text>{Description}</Text>
          <Link to={`/movies/${_id}`}>
					<Button variant='primary' className="m-2">See Details</Button>
          </Link>
          <Button onClick={() => addMovieToFavorites(_id)}>Add to Favorites</Button>
				</Body>
			</Card>
		);
	}
}

const { shape, string, bool } = PropTypes;

MovieCard.propTypes = {
	_id: string,
	movie: shape({
		Title: string.isRequired,
		Description: string.isRequired,
		Genre: shape({
			Name: string.isRequired,
			Description: string.isRequired,
		}).isRequired,
		Director: shape({
			Name: string.isRequired,
			Bio: string.isRequired,
			BirthDate: string.isRequired,
			DeathDate: string,
		}).isRequired,
		ImagePath: string.isRequired,
		Featured: bool,
	}).isRequired,
};

export default MovieCard;
