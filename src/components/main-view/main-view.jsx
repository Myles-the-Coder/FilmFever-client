import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router';
import axios from 'axios';
import Navigation from '../navigation/navigation';
import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';
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
    let accessToken = localStorage.getItem('token')
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      })
      this.getMovies(accessToken)
    }
  }

	setSelectedMovie = (newSelectedMovie) => {
		this.setState({
			selectedMovie: newSelectedMovie,
		});
	}

	onLoggedIn = (authData) => {
		this.setState({ user: authData.user.Username });
		localStorage.setItem('token', authData.token);
		localStorage.setItem('user', authData.user.Username);

		this.getMovies(authData.token);
	}

  onLoggedOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    this.setState({user: null})
    this.onRouteChange('login')
  }

	getMovies = (token) => {
		axios
			.get('https://film-fever-api.herokuapp.com/movies', {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then(res => {
        this.setState({ movies: res.data })
        this.onRouteChange('home')
      })
			.catch(err => console.log(err));
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
						route={route}
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

		// if (movies.length === 0) return <div className='main-view' />;

		return (
			<div className='main-view'>
				<Navigation
          onLoggedOut={this.onLoggedOut}
          route={route}
				/>
				{route === 'home' ? (
					<Container>
						<Row className='justify-content-md-center'>
							{movies.map(movie => (
								<Col xs={10} sm={6} md={4} lg={3}>
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
					<LoginView
						onRouteChange={this.onRouteChange}
						onLoggedIn={this.onLoggedIn}
					/>
				) : (
					<RegistrationView onRouteChange={this.onRouteChange} />
				)}
			</div>
		);
	}
}

export default MainView;
