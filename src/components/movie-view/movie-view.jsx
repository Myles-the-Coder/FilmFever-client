import React from 'react';
import {Button} from 'react-bootstrap'
import PropTypes from 'prop-types'
import './movie-view.scss'

class MovieView extends React.Component {
	render() {
		const { movie, onBackClick } = this.props;
		return (
			<div className='movie-view'>
				<div className='movie-poster'>
					<img className="movie-card" src={movie.ImagePath} alt={movie.Title} crossOrigin="anonymous" />
				</div>
				<div className='movie-title'>
					<span className='label'>Title: </span>
					<span className='value'>{movie.Title}</span>
				</div>
				<div className='movie-description'>
					<span className='label'>Description: </span>
					<span className='value'>{movie.Description}</span>
				</div>
        <Button className="btn" onClick={() => onBackClick(null)}>Back</Button>
			</div>
		);
	}
}

const {shape, string, func, bool} = PropTypes

MovieView.propTypes = {
    _id: string,
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
    onBackClick:func.isRequired
}

export default MovieView