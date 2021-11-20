import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setMovies } from '../../redux/features/moviesSlice';
import {
	setUser,
	logoutUser,
	addToFavorites,
} from '../../redux/features/userSlice';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from 'react-router-dom';
import { URL } from '../../helpers/helpers';
import Navigation from '../navigation/navigation';
import MoviesList from '../movie-list/movie-list';
import MovieView from '../movie-view/movie-view';
import GenreView from '../genre-view/genre-view';
import DirectorView from '../director-view/director-view';
import LoginView from '../login-view/login-view';
import RegistrationView from '../registration-view/registration-view';
import ProfileView from '../profile-view/profile-view';
import HomeView from '../home-view/home-view';
import { Row, Col, Container } from 'react-bootstrap';
import ToastNotification from '../toast-notification/toast-notification';
import MovieReelSpinner from '../MovieReelSpinner/MovieReelSpinner';

import '../../styles/main-view.scss';

class MainView extends React.Component {
	constructor() {
		super();
		this.state = {
			show: false,
			isLoading: true,
		};
	}

	componentDidMount = () => {
		const accessUser = localStorage.getItem('user');
		const accessToken = localStorage.getItem('token');
		if (accessToken !== null && accessUser !== null) {
			this.getUser(accessUser, accessToken);
			this.getMovies(accessToken);
		}
	};

	getUser = (user, token) => {
		axios
			.get(`${URL}/users/${user}`, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then(res => {
				const { setUser } = this.props;
				const { Username, Password, Email, Birthday, FavoriteMovies } =
					res.data;
				setUser({
					Username,
					Password,
					Email,
					Birthday: Birthday.slice(0, 10),
					FavoriteMovies,
				});
			})
			.catch(err => console.log(err));
	};

	onLoggedIn = authData => {
		localStorage.setItem('token', authData.token);
		localStorage.setItem('user', authData.user.Username);
		this.getUser(localStorage.getItem('user'), localStorage.getItem('token'));
		this.getMovies(authData.token);
	};

	onLoggedOut = () => {
		const { logoutUser } = this.props;
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		logoutUser();
	};

	getMovies = token => {
		const { setMovies } = this.props;
		axios
			.get(`${URL}/movies`, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then(res => {
				this.setState({ isLoading: false });
				setMovies(res.data);
			})
			.catch(err => console.log(err));
	};

	addMovieToFavorites = movieId => {
		const { addToFavorites } = this.props;
		const user = localStorage.getItem('user');
		const token = localStorage.getItem('token');
		axios
			.post(
				`${URL}/users/${user}/movies/${movieId}`,
				{ FavoriteMovies: movieId },
				{ headers: { Authorization: `Bearer ${token}` } }
			)
			.then(res => {
				addToFavorites(movieId);
				alert('Added to Favorites List');
				this.setState({ show: true });
			})
			.catch(err => console.log(err));
	};

	setShow = () => this.setState({ show: true });

	render() {
		let { movies, user } = this.props;
		let { show, isLoading } = this.state;
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
										if (user.Username) return <Redirect to='/movies' />;

										return <HomeView />;
									}}
								/>

								<Route
									exact
									path='/movies'
									render={() => {
										if (!user.Username)
											return (
												<Col>
													<LoginView
														onLoggedIn={user => this.onLoggedIn(user)}
													/>
												</Col>
											);
										if (movies.length === 0)
											return <div className='main-view' />;

										return (
											<>
												{show === true ? (
													<ToastNotification
														setShow={this.setShow}
														show={this.state.show}
													/>
												) : (
													<div></div>
												)}
												{isLoading === true ? <MovieLoadingSpinner /> : <></>}
												<MoviesList
													movies={movies}
													addMovieToFavorites={this.addMovieToFavorites}
												/>
											</>
										);
									}}
								/>

								<Route
									exact
									path='/login'
									render={() => {
										if (!user.Username)
											return (
												<Col>
													<LoginView
														onLoggedIn={user => this.onLoggedIn(user)}
													/>
												</Col>
											);

										if (user.Username) return <Redirect to='/movies' />;

										if (movies.length === 0)
											return <div className='main-view' />;

										return (
											<Col>
												<LoginView onLoggedIn={user => this.onLoggedIn(user)} />
											</Col>
										);
									}}
								/>

								<Route
									exact
									path='/register'
									render={({ history }) => {
										if (user.Username) return <Redirect to='/' />;
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
										if (!user.Username)
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
										if (!user.Username)
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
										if (!user.Username)
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
									render={({ history }) => {
										if (!user.Username)
											return (
												<LoginView onLoggedIn={user => this.onLoggedIn(user)} />
											);
										if (movies.length === 0)
											return <div className='main-view' />;
										return (
											<ProfileView
												history={history}
												movies={movies}
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

let mapStateToProps = state => {
	return {
		movies: state.movies.value,
		user: state.user.value,
	};
};

let mapDispatchToProps = {
	setMovies,
	setUser,
	logoutUser,
	addToFavorites,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
