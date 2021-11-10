import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import Navigation from '../navigation/navigation';
import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';
import GenreView from '../genre-view/genre-view';
import DirectorView from '../director-view/director-view';
import LoginView from '../login-view/login-view';
import RegistrationView from '../registration-view/registration-view';
import { Row, Col, Container } from 'react-bootstrap';

import './main-view.scss';

class MainView extends React.Component {
	constructor() {
		super();
		this.state = {
			movies: [],
			selectedMovie: null,
			user: null,
			route: 'login',
		};
	}

	componentDidMount = () => {
		let accessToken = localStorage.getItem('token');
		if (accessToken !== null) {
			this.setState({ user: localStorage.getItem('user') });
			this.getMovies(accessToken);
		}
	};

	setSelectedMovie = newSelectedMovie => {
		this.setState({ selectedMovie: newSelectedMovie });
	};

	onLoggedIn = authData => {
		this.setState({ user: authData.user.Username });
		localStorage.setItem('token', authData.token);
		localStorage.setItem('user', authData.user.Username);

		this.getMovies(authData.token);
	};

	onLoggedOut = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		this.setState({ user: null });
	};

	getMovies = token => {
		axios
			.get('https://film-fever-api.herokuapp.com/movies', {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then(res => {
				this.setState({ movies: res.data });
				this.onRouteChange('home');
			})
			.catch(err => console.log(err));
	};

	onRouteChange = route => {
		this.setState({ route });
	};

	render() {
		let { movies, user, route } = this.state;

		return (
			<>
				<Router>
					<Navigation onLoggedOut={this.onLoggedOut} route={route} />
				</Router>
				<Container>
					<Router>
						<Row className='main-view justify-content-md-center'>
							<Route
								exact
								path='/'
								render={() => {
									if (user === null)
										return (
											<Col>
												<LoginView onLoggedIn={user => this.onLoggedIn(user)} />
											</Col>
										);

									// if (movies.length === 0) return <div className='main-view' />;

									return movies.map(movie => (
										<Col xs={10} sm={6} md={4} lg={3} key={movie._id}>
											<MovieCard
												movie={movie}
												onMovieClick={movie => this.setSelectedMovie(movie)}
											/>
										</Col>
									));
								}}
							/>

							<Route
								exact
								path='/register'
								render={() => {
									if (user) return <Redirect to='/' />;
									return (
										<Col>
											<RegistrationView />
										</Col>
									);
								}}
							/>

							<Route
								exact
								path='/movies/:movieId'
								render={({ match, history }) => {
									return (
										<Col md={8}>
											<MovieView
												movie={movies.find(
													movie => movie._id === match.params.movieId
												)}
												onBackClick={() => history.goBack()}
											/>
										</Col>
									);
								}}
							/>

							<Route
								exact
								path='genres/:name'
								render={({ match, history }) => {
									if (!movies) return <div className='main-view' />;
									<GenreView
										genre={
											movies.find(
												movie => movie.Genre.Name === match.params.name
											).Genre
										}
										onBackClick={() => history.goBack()}
									/>;
								}}
							/>

							<Route
								exact
								path='directors/:name'
								render={({ match, history }) => {
									if (!movies) return <div className='main-view' />;
									return (
										<Col md={8}>
											<DirectorView
												director={
													movies.find(
														movie => movie.Director.Name === match.params.name
													).Director
												}
												onBackClick={() => history.goBack()}
											/>
										</Col>
									);
								}}
							/>
						</Row>
					</Router>
				</Container>
			</>
		);
	}
}

export default MainView;
