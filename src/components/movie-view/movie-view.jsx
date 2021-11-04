import React from 'react';
class MovieView extends React.Component {

  keypressCallback(e) {
    console.log(e.key)
  }

  componentDidMount() {
    document.addEventListener('keypress', this.keypressCallback)
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.keypressCallback)
  }

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
        <button className="btn" onClick={() => onBackClick(null)}>Back</button>
			</div>
		);
	}
}

export default MovieView