import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserInfo from './user-info';
import { Container, Row, Col } from 'react-bootstrap';
import InfoForm from '../form/info-form';
import FavoriteMovies from './favorite-movies';
import DeleteModal from './delete-modal';
import { URL } from '../../helpers/helpers';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../redux/features/userSlice';

import '../../styles/_profile-view.scss';

const ProfileView = ({ movies, onBackClick }) => {
	// const [username, setUsername] = useState('');
	// const [email, setEmail] = useState('');
	// const [password, setPassword] = useState('');
	// const [birthday, setBirthday] = useState('');
	const [favoriteMovies, setFavoriteMovies] = useState([]);
	const [show, setShow] = useState('');

	const token = localStorage.getItem('token');
	const user = localStorage.getItem('user');

	const favoriteMoviesList = movies.filter(movie =>
		favoriteMovies.includes(movie._id)
	);

	const userValues = useSelector(state => state.user.value);
	console.log(userValues);

	const dispatch = useDispatch();

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
			.get(`${URL}/users/${user}`, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then(res => {
				const { Username, Password, Email, Birthday, FavoriteMovies } =
					res.data;
				dispatch(setUser({ Username, Password, Email, Birthday: Birthday.slice(0, 10)}));
				console.log(userValues.Birthday.slice(0, 10));
			})
			.catch(err => console.log(err));
	};

	editUser = ({ username, password, email, birthday }) => {
		axios
			.put(
				`${URL}/users/update/${user}`,
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
				dispatch(
					setUser({
						Username: username,
						Password: password,
						Email: email,
						Birthday: birthday,
					})
				);
				alert(`${username} has been updated!`);
			})
			.catch(err => console.log(err));
	};

	removeFromFavorites = id => {
		axios
			.delete(`${URL}/users/${user}/movies/${id}`, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then(res => setFavoriteMovies(res.data.FavoriteMovies))
			.catch(err => console.log(err));
	};

	deleteUser = () => {
		axios
			.delete(`${URL}/users/${user}`, {
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
						<InfoForm editUser={editUser} setShow={setShow} />
					</Col>
				</Row>
			</Container>
		);
	}

	return (
		<Container>
			<UserInfo
				user={userValues.Username}
				email={userValues.Email}
				birthday={userValues.Birthday}
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
