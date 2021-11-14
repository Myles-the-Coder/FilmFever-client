import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserInfo from './user-info';
import { Container, Row, Col } from 'react-bootstrap';
import InfoForm from '../form/info-form';
import FavoriteMovies from './favorite-movies';
import DeleteModal from './delete-modal';

const ProfileView = ({ movies, onBackClick }) => {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [birthday, setBirthday] = useState('');
	const [favoriteMovies, setFavoriteMovies] = useState([]);
	const [show, setShow] = useState('');

	const token = localStorage.getItem('token');
	const user = localStorage.getItem('user');

	const favoriteMoviesList = movies.filter(movie =>
		favoriteMovies.includes(movie._id)
	);

	useEffect(() => {
		let isMounted = true;
		let accessToken = localStorage.getItem('token');
		if (isMounted) {
			getUser(accessToken);
		}
		return () => {
			isMounted = false;
		};
	}, []);

	getUser = token => {
		axios
			.get(`https://film-fever-api.herokuapp.com/users/${user}`, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then(res => {
				const { Username, Password, Email, Birthday, FavoriteMovies } =
					res.data;
				setUsername(Username);
				setPassword(Password);
				setEmail(Email);
				setBirthday(Birthday);
				setFavoriteMovies(FavoriteMovies);
			})
			.catch(err => console.log(err));
	};

	editUser = ({ username, password, email, birthday }) => {
		axios
			.put(
				`https://film-fever-api.herokuapp.com/users/update/${user}`,
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
				localStorage.setItem('user', username);
				alert(username + ' has been updated!');
			})
			.catch(err => console.log(err));
	};

	removeFromFavorites = id => {
		axios
			.delete(
				`https://film-fever-api.herokuapp.com/users/${user}/movies/${id}`,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			)
			.then(res => setFavoriteMovies(res.data.FavoriteMovies))
			.catch(err => console.log(err));
	};

	deleteUser = () => {
		axios
			.delete(`https://film-fever-api.herokuapp.com/users/${user}`, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then(res => {
				alert(`${user} has been deleted`);
				localStorage.removeItem('user');
				localStorage.removeItem('token');
				window.open('/', '_self');
			});
		setShow('');
	};

	if (show === 'update') {
		return (
			<Container>
				<Row className='justify-content-center'>
					<Col xs={10}>
						<InfoForm editUser={editUser} onBackClick={onBackClick} />
					</Col>
				</Row>
			</Container>
		);
	}

	return (
		<Container>
			<UserInfo
				user={username}
				email={email}
				birthday={birthday.slice(0, 10)}
				setShow={setShow}
			/>
			<DeleteModal show={show} setShow={setShow} deleteUser={deleteUser} />
			{favoriteMovies.length > 0 && (
				<FavoriteMovies
					favoriteMoviesList={favoriteMoviesList}
					removeFromFavorites={removeFromFavorites}
				/>
			)}
		</Container>
	);
};

export default ProfileView;
