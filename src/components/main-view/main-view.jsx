import React from 'react';
import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movieView';
import img1 from '../../img/inception.jpg'
import img2 from '../../img/shawshank_redemption.jpeg'
import img3 from '../../img/gladiator.jpeg'

class MainView extends React.Component {
	constructor() {
		super();
		this.state = {
			movies: [
				{
					_id: 1,
					Title: 'Inception',
					Description: 'A man named Dom Cobb wakes up on a shore and is dragged into a house belonging to a wealthy Japanese businessman named Mr. Saito.',
					ImagePath: img1,
				},
				{
					_id: 2,
					Title: 'The Shawshank Redemption',
					Description: 'Bank Merchant Andy Dufresne is convicted of the murder of his wife and her lover, and sentenced to life imprisonment at Shawshank prison.',
					ImagePath: img2,
				},
				{
					_id: 3,
					Title: 'Gladiator',
					Description: 'A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.',
					ImagePath: img3,
				},
			],
			selectedMovie: null,
		};
	}

	setSelectedMovie(newSelectedMovie) {
		this.setState({
			selectedMovie: newSelectedMovie,
		});
	}

	render() {
		let { movies, selectedMovie } = this.state;

		if (selectedMovie)
			return (
				<MovieView
					movie={selectedMovie}
					onBackClick={movie => {
						this.setSelectedMovie(movie);
					}}
				/>
			);

		if (movies.length === 0) {
			return <div className='main-view'>This list is empty!</div>;
		}

		return (
			<div className='main-view'>
				{selectedMovie ? (
					<MovieView
						movie={selectedMovie}
						onBackClick={movie => {
							this.setSelectedMovie(movie);
						}}
					/>
				) : (
					movies.map(movie => (
						<MovieCard
							key={movie._id}
							movie={movie}
							onMovieClick={movie => this.setSelectedMovie(movie)}
						/>
					))
				)}
			</div>
		);
	}
}

export default MainView;
