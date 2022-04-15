import React from 'react';
import { Row, Col, Button, Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import FilterInput from '../filter-input/filter-input';
import NoMoviesFound from '../no-movies-found/no-movies-found';
import '../../styles/_profile-view.scss';

const FavoriteMovies = ({ favoriteMovies, removeFromFavorites }) => {
	const filter = useSelector(state => state.filter.value);
	const movies = useSelector(state => state.movies.value);

	let filteredFavs = movies.filter(({ _id }) => favoriteMovies.includes(_id));

	if (filter !== '') {
		filteredFavs = favoriteMovies.filter(({ Title }) =>
			Title.toLowerCase().includes(filter.toLowerCase())
		);
	}

	return (
		<Row className='justify-content-center text-center'>
			<h1 className='p-2 m-4 text-light'>Your Favorite Movies</h1>
			<Col md={12} className='m-2'>
				<FilterInput filter={filter} />
			</Col>
			{filteredFavs.length > 0 ? (
				filteredFavs.map(({_id, Title, ImagePath}) => 
					(
						<Col xs={9} sm={6} md={3} key={_id}>
							<Card
								className='p-3 text-center m-1'
								style={{ backgroundColor: 'whitesmoke' }}>
								<h4>{Title}</h4>
								<img src={ImagePath} alt={Title} crossOrigin='anonymous' />
								<Link to={`/movies/${_id}`}>
									<Button bsPrefix='card-button' className='m-1'>
										See Details
									</Button>
								</Link>
								<Button
									bsPrefix='card-button'
									onClick={() => removeFromFavorites(_id)}
									className='w-75 m-auto'>
									Remove from Favorites
								</Button>
							</Card>
						</Col>
					)
        )
			) : (
				<NoMoviesFound message={'No Movies in Favorites'} />
			)}
		</Row>
	);
};

export default FavoriteMovies;
