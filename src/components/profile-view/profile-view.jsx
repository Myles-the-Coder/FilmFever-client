import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import {Link} from 'react-router-dom'
import UserInfo from './user-info';

const ProfileView = ({ history, movies, user }) => {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [birthday, setBirthday] = useState('');
	const [favoriteMovies, setFavoriteMovies] = useState('');

	useEffect(() => {
      let isMounted = true
      let accessToken = localStorage.getItem('token');
      if (isMounted) {
        console.log('is Mounted')
        getUser(accessToken);
      }
      return () => {isMounted = false}
	}, [])

	getUser = token => {
		axios
			.get(`https://film-fever-api.herokuapp.com/users/${user}`, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then(res => {
				const { Username, Password, Email, Birthday, FavoriteMovies } = res.data;
				setUsername(Username);
				setPassword(Password);
				setEmail(Email);
				setBirthday(Birthday);
				setFavoriteMovies(FavoriteMovies);
			})
			.catch(err => console.log(err));
	};

	editUser = e => {
		e.preventDefault();
		const username = localStorage.getItem('user');
		const token = localStorage.getItem('token');

		axios
			.put(
				`https://moviebased.herokuapp.com/users/${user}`,
				{
					Username: username,
					Password: password,
					Email: email,
					Birthday: birthday,
				},
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			)
			.then(res => {
				console.log(res);
				// setUsername(Username);
				// setPassword(Password);
				// setEmail(Email);
				// setBirthday(Birthday);
				// setFavoriteMovies(FavoriteMovies);
				localStorage.setItem('user', username);
				const data = response.data;
				console.log('this.state.Username', this.state.Username);
				alert(username + ' has been updated!');
			})
			.catch(err => console.log(err));
	};

	removeFromFavorites = id => {
		const token = localStorage.getItem('token');

		axios
			.delete(`https://moviebased.herokuapp.com/users/${user}/movies/` + id, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then(res => {
				console.log(res);
				this.useEffect();
			})
			.catch(err => console.log(error));
	};

	return (
		<div>
			<UserInfo
				user={username}
				email={email}
				birthday={birthday.slice(0, 10)}
			/>
      <Link to={`/users/update/${user}`}>
			<Button>Update Info</Button>
      </Link>
			<Button variant='danger'>Delete Account</Button>
		</div>
	);
};

export default ProfileView;
