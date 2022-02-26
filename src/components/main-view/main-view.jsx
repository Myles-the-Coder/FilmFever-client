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
	Route,
	Routes,
	Navigate,
	useNavigate,
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

import '../../styles/main-view.scss';

class MainView extends React.Component {
	constructor() {
		super();
		this.state = {
			show: false,
			isLoading: true,
			currentFilmTitle: '',
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

	onLoggedIn = ({ token, user }) => {
		localStorage.setItem('token', token);
		localStorage.setItem('user', user.Username);
		this.getUser(localStorage.getItem('user'), localStorage.getItem('token'));
		this.getMovies(token);
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
				axios
					.get(`${URL}/movies/${movieId}`, {
						headers: { Authorization: `Bearer ${token}` },
					})
					.then(res => {
						this.setState({ show: true });
						this.setState({ currentFilmTitle: res.data.Title });
					});
			})
			.catch(err => console.log(err));
	};

	setShow = () => this.setState({ show: false });

	checkUsername = () => {
		return (
			!this.props.user.Username && (
				<Col>
					<LoginView onLoggedIn={user => this.onLoggedIn(user)} />
				</Col>
			)
		);
	};

	checkMovieLength = () =>
		this.props.movies.length === 0 && <div className='main-view' />;

	render() {
		let { movies, user } = this.props;
		let { show, currentFilmTitle } = this.state;

		return (
			<>
				<Navigation onLoggedOut={this.onLoggedOut} user={user} />
				<Container>
					<Row className='main-view justify-content-md-center'>
						<Routes>
							<Route
								path='/'
								element={
									user.Username ? (
										<MoviesList
											movies={movies}
											addMovieToFavorites={this.addMovieToFavorites}
										/>
									) : (
										<HomeView />
                    )
                  }
							/>
                  <Route
                    path='/login'
                    element={
                      // this.checkUsername();
                      // this.checkMovieLength();
                      user.Username ? (
                        <Navigate replace to='/movies' />
                      ) : (
                        <Col>
                          <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>
                      )
                    }
                  />
    
                  <Route
                    path='/register'
                    element={
                      user.Username ? (
                        <Navigate replace to='/' />
                      ) : (
                        <Col>
                          <RegistrationView onBackClick={() => useNavigate(-1)} />
                        </Col>
                      )
                    }
                  />
                  
							<Route
								path='/movies'
								element={
                  <>
									{this.checkUsername()}
									{this.checkMovieLength()}
										{show === true && (
											<ToastNotification
												setShow={this.setShow}
												currentFilmTitle={currentFilmTitle}
											/>
										)}
										<MoviesList
											movies={movies}
											addMovieToFavorites={this.addMovieToFavorites}
										/>
									</>
								}
							/>

							<Route
								path='/movies/:movieId'
								element={
                  <Col md={8}>
                      {this.checkUsername()}
                      {this.checkMovieLength()}
											{show === true && 
												<ToastNotification
													setShow={this.setShow}
													currentFilmTitle={currentFilmTitle}
												/>
											}
											<MovieView
												movies={movies}
												onBackClick={() => useNavigate(-1)}
												addMovieToFavorites={this.addMovieToFavorites}
											/>
										</Col>
                }
							/>

							<Route
								path='/genres/:Name'
								element={
									<Col md={8}>
                    {this.checkUsername()}
									{this.checkMovieLength()}
										<GenreView movies={movies} />
									</Col>
								}
							/>

							<Route
								path='/directors/:Name'
								element={
                  <Col md={8}>
                      {this.checkUsername()}
                      {this.checkMovieLength()}
											<DirectorView movies={movies}/>
										</Col>
									}
							/>

							<Route
								path='/users/:Username'
								element={
                  <>
                  {this.checkUsername()}
									{this.checkMovieLength()}
									<ProfileView getUser={this.getUser} movies={movies} />
                  </>
								}
							/>
						</Routes>
					</Row>
				</Container>
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
