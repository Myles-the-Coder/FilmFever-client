import React from 'react';
import axios from 'axios';
import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';

class MainView extends React.Component {
	constructor() {
		super();
		this.state = {
			movies: [],
			selectedMovie: null,
      user: null
		};
	}

	componentDidMount() {
		axios
			.get('https://film-fever-api.herokuapp.com/movies')
			.then(res => this.setState({ movies: res.data }))
			.catch(err => console.log(err));
	}

	setSelectedMovie(newSelectedMovie) {
		this.setState({
			selectedMovie: newSelectedMovie,
		});
	}

  onLoggedIn(user) {this.setState({user})}

	render() {
		let { movies, selectedMovie, user } = this.state;

    if(!user) {
      return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
    }

		if (selectedMovie)
			return (
				<MovieView
					movie={selectedMovie}
					onBackClick={movie => {
						this.setSelectedMovie(movie);
					}}
				/>
			);

		if (movies.length === 0) return <div className='main-view' />;

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
