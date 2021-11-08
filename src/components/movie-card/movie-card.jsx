import React from 'react';
import PropTypes from 'prop-types'

import './movie-card.scss'

class MovieCard extends React.Component {
	render() {
		const { movie, onMovieClick } = this.props;
		return <div className='movie-card' onClick={() => onMovieClick(movie)}>{movie.Title}</div>
  }
}

const {shape, string, func, bool} = PropTypes

MovieCard.propTypes = {
key: string.isRequired,
movie: shape({
  Title: string.isRequired,
  Description: string.isRequired,
  Genre: shape({
    Name: string.isRequired,
    Description: string.isRequired
  }).isRequired,
  Director: shape({
    Name: string.isRequired,
    Bio: string.isRequired,
    BirthDate: string.isRequired,
    DeathDate: string
  }).isRequired,
  ImagePath: string.isRequired,
  Featured: bool
}).isRequired,
onMovieClick:func.isRequired
}

export default MovieCard;
