import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from 'react-router-dom';
import axios from 'axios';
import Navigation from '../navigation/navigation';
import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';
import GenreView from '../genre-view/genre-view';
import DirectorView from '../director-view/director-view';
import LoginView from '../login-view/login-view';
import RegistrationView from '../registration-view/registration-view';
import ProfileView from '../profile-view/profile-view';
import { Row, Col, Container } from 'react-bootstrap';

import './main-view.scss';

class MainView extends React.Component {
	constructor() {
		super();
		this.state = {
			movies: [],
			user: null,
		};
	}

	componentDidMount = () => {
		let accessToken = localStorage.getItem('token');
		if (accessToken !== null) {
			this.setState({ user: localStorage.getItem('user') });
			this.getMovies(accessToken);
		}
    console.log(this.state.user)
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
			.then(res => this.setState({ movies: res.data }))
			.catch(err => console.log(err));
	};

  addMovieToFavorites = (movieId) => {
    const user = localStorage.getItem('user')
    const token = localStorage.getItem('token')
    axios.post(`https://film-fever-api.herokuapp.com/users/${user}/movies/${movieId}`, {
      FavoriteMovies: movieId
    } , {
      headers: { Authorization: `Bearer ${token}` },
    }).then(res => alert('Added to Favorites List'))
      .catch(err => console.log(err))
  }

	render() {
		let { movies, user } = this.state;

		return (
			<>
				<Router>
					<Navigation onLoggedOut={this.onLoggedOut} user={user} />
					<Container>
						<Row className='main-view justify-content-md-center'>
							<Switch>
								<Route
									exact
									path='/'
									render={() => {
										if (user === null)
											return (
												<Col>
													<LoginView
														onLoggedIn={user => this.onLoggedIn(user)}
													/>
												</Col>
											);

										if (movies.length === 0)
											return <div className='main-view' />;

										return movies.map(movie => (
											<Col xs={10} sm={6} md={4} lg={3} key={movie._id}>
												<MovieCard movie={movie} addMovieToFavorites={this.addMovieToFavorites}/>
											</Col>
										));
									}}
								/>

								<Route
									exact
									path='/register'
									render={({ history }) => {
										if (user) return <Redirect to='/' />;
										return (
											<Col>
												<RegistrationView
													onBackClick={() => history.goBack()}
												/>
											</Col>
										);
									}}
								/>

								<Route
									exact
									path='/movies/:movieId'
									render={({ match, history }) => {
										if (!user)
											return (
												<Col>
													<LoginView
														onLoggedIn={user => this.onLoggedIn(user)}
													/>
												</Col>
											);
										if (movies.length === 0)
											return <div className='main-view'>Loading...</div>;
										return (
											<Col md={8}>
												<MovieView
													movie={movies.find(
														movie => movie._id === match.params.movieId
													)}
													onBackClick={() => history.goBack()}
                          addMovieToFavorites={this.addMovieToFavorites}
												/>
											</Col>
										);
									}}
								/>

								<Route
									exact
									path='/genres/:Name'
									render={({ match, history }) => {
										if (!user)
											return (
												<Col>
													<LoginView
														onLoggedIn={user => this.onLoggedIn(user)}
													/>
												</Col>
											);
										if (movies.length === 0)
											return <div className='main-view'>Loading...</div>;
										return (
											<Col md={8}>
												<GenreView
													genre={
														movies.find(
															movie => movie.Genre.Name === match.params.Name
														).Genre
													}
													onBackClick={() => history.goBack()}
												/>
											</Col>
										);
									}}
								/>

								<Route
									exact
									path='/directors/:Name'
									render={({ match, history }) => {
										if (!user)
											return (
												<Col>
													<LoginView
														onLoggedIn={user => this.onLoggedIn(user)}
													/>
												</Col>
											);
										if (movies.length === 0)
											return <div className='main-view'>Loading...</div>;
										return (
											<Col md={8}>
												<DirectorView
													director={
														movies.find(
															movie => movie.Director.Name === match.params.Name
														).Director
													}
													onBackClick={() => history.goBack()}
												/>
											</Col>
										);
									}}
								/>

								<Route
									exact
									path='/users/:Username'
									render={({history}) => {
										if (!user)
											return (
												<LoginView onLoggedIn={user => this.onLoggedIn(user)} />
											);
										if (movies.length === 0)
											return <div className='main-view' />;
										return (
											<ProfileView
												history={history}
												movies={movies}
												user={user}
                        onBackClick={() => history.goBack()}
											/>
										);
									}}
								/>
							</Switch>
						</Row>
					</Container>
				</Router>
			</>
		);
	}
}

export default MainView;
