import React from 'react';
import { Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import MovieCard from '../movie-card/movie-card';
import FilterInput from '../filter-input/filter-input';
import NoMoviesFound from '../no-movies-found/no-movies-found';

function MoviesList({ movies, addMovieToFavorites }) {
	let filteredMovies = movies;
	const filter = useSelector(state => state.filter.value);

	if (filter !== '') {
		filteredMovies = movies.filter(movie =>
			movie.Title.toLowerCase().includes(filter.toLowerCase())
		);
	}

	if (!movies) {
		return <div className='main-view'></div>;
	}

	return (
		<>
			<Col md={12} className='m-2'>
				<FilterInput filter={filter} />
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
