import React from 'react';
import axios from 'axios';
import Navigation from '../navigation/navigation';
import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { Row, Col, Container } from 'react-bootstrap';

import './main-view.scss';

class MainView extends React.Component {
	constructor() {
		super();
		this.state = {
			movies: [],
			selectedMovie: null,
			isSignedIn: false,
			route: 'login',
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

	onLoggedIn(user) {
		this.setState({ user });
	}

	onRouteChange = route => {
		if (route === 'signout') {
			this.setState(initialState);
		} else if (route === 'home') {
			this.setState({ isSignedIn: true });
		}
		this.setState({ route: route });
	};

	render() {
		let { movies, selectedMovie, route, isSignedIn } = this.state;

		if (selectedMovie)
			return (
				<>
					<Navigation
						isSignedIn={isSignedIn}
						onRouteChange={this.onRouteChange}
					/>
					<Container>
						<Row className='justify-content-md-center'>
							<Col md={6}>
								<MovieView
									movie={selectedMovie}
									onBackClick={movie => {
										this.setSelectedMovie(movie);
									}}
								/>
							</Col>
						</Row>
					</Container>
				</>
			);

		if (movies.length === 0) return <div className='main-view' />;

		return (
			<div className='main-view'>
				<Navigation
					isSignedIn={isSignedIn}
					onRouteChange={this.onRouteChange}
				/>
				{route === 'home' ? (
					<Container>
						<Row className='justify-content-md-center'>
							{movies.map(movie => (
								<Col xs={10} sm={6} md={3}>
									<MovieCard
										key={movie._id}
										movie={movie}
										onMovieClick={movie => this.setSelectedMovie(movie)}
									/>
								</Col>
							))}
						</Row>
					</Container>
				) : route === 'login' ? (
								<LoginView onRouteChange={this.onRouteChange} />
				) : (
					<RegistrationView onRouteChange={this.onRouteChange} />
				)}
			</div>
		);
	}
}

export default MainView;
