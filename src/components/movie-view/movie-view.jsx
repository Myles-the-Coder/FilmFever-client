import React from 'react';
import { Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './movie-view.scss';

class MovieView extends React.Component {
	render() {
		const { movie, onBackClick } = this.props;
    const {ImagePath, Description, Director, Genre} = movie
		const { Img, Body, Title, Text } = Card;

		return (
			<Card
				className='text-center mt-1'
				style={{ backgroundColor: 'lightgray' }}>
				<Img
					src={ImagePath}
					alt={movie.Title}
					className='w-25 m-auto pt-2'
					crossOrigin='anonymous'
				/>
				<Body>
					<Title>{movie.Title}</Title>
					<Text>{Description}</Text>
          <Link to={`/directors/${Director.Name}`}>
            <Button variant='primary'>Director</Button>
          </Link>
          <Link to={`/genres/${Genre.Name}`}>
            <Button variant='primary' className='m-2'>Genre</Button>
          </Link>
					<Button className='btn' onClick={() => onBackClick()}>
						Back
					</Button>
				</Body>
			</Card>
		);
	}
}

const { shape, string, func, bool } = PropTypes;

MovieView.propTypes = {
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
	onBackClick: func.isRequired,
};

export default MovieView;
