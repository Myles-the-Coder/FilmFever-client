import React from 'react';
import { Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import MovieCard from '../movie-card/movie-card';
import FilterInput from '../filter-input/filter-input';
import NoMoviesFound from '../no-movies-found/no-movies-found';
import MovieReelSpinner from '../MovieReelSpinner/MovieReelSpinner';

const MoviesList = ({ movies, addMovieToFavorites }) => {
	let filteredMovies = movies;
	const {value} = useSelector(state => state.filter);

	if (value !== '') {
		filteredMovies = movies.filter(({Title}) =>
			Title.toLowerCase().includes(value.toLowerCase())
		);
	}

	if (!movies) {
		return <div className='main-view' ></div>;
	}

	return (
		<>
			<Col md={12} className='m-2'>
				<FilterInput filter={value} />
			</Col>
			{filteredMovies.length > 0 ? (
				filteredMovies.map(movie => (
					<Col xs={10} sm={6} md={4} lg={3} key={movie._id} className='m-auto'>
          	<MovieCard
							movie={movie}
							addMovieToFavorites={addMovieToFavorites}
						/>
					</Col>
				))
			) : (
				<NoMoviesFound message={'No movie found with that title'}/>
			)}
		</>
	);
}

export default MoviesList;
