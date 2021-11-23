import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserInfo from './user-info';
import { Container, Row, Col } from 'react-bootstrap';
import MovieReelSpinner from '../MovieReelSpinner/MovieReelSpinner';
import InfoForm from '../form/info-form';
import FavoriteMovies from './favorite-movies';
import DeleteModal from './delete-modal';
import { URL } from '../../helpers/helpers';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, removeFromFavs } from '../../redux/features/userSlice';
import { useDispatch } from 'react-redux';

import '../../styles/_profile-view.scss';

const ProfileView = ({ movies }) => {
	const favoriteMovies = useSelector(state => state.user.value.FavoriteMovies);
	const userValues = useSelector(state => state.user.value);
	const [show, setShow] = useState('');

	const token = localStorage.getItem('token');
	const user = localStorage.getItem('user');
	const dispatch = useDispatch();

	useEffect(() => {
		axios
			.get(`${URL}/users/${user}`, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then(res => {
				const { Username, Password, Email, Birthday, FavoriteMovies } =
					res.data;
				dispatch(
					setUser({
						Username,
						Password,
						Email,
						Birthday: Birthday.slice(0, 10),
						FavoriteMovies: movies.filter(movie =>
							FavoriteMovies.includes(movie._id)
						),
					})
				);
			})
			.catch(err => console.log(err));
	}, [token]);

	// getUserInfo = token => {
	// 	axios
	// 		.get(`${URL}/users/${user}`, {
	// 			headers: { Authorization: `Bearer ${token}` },
	// 		})
	// 		.then(res => {
	// 			const { Username, Password, Email, Birthday, FavoriteMovies } =
	// 				res.data;
	// 			dispatch(
	// 				setUser({
	// 					Username,
	// 					Password,
	// 					Email,
	// 					Birthday: Birthday.slice(0, 10),
	// 					FavoriteMovies: movies.filter(movie =>
	// 						FavoriteMovies.includes(movie._id)
	// 					),
	// 				})
	// 			);
	// 		})
	// 		.catch(err => console.log(err));
	// };

	editUserAccount = ({ username, password, email, birthday }) => {
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
			.then(res => dispatch(removeFromFavs(favoriteMovies.indexOf(id))))
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

	if (show === 'update')
		return <InfoForm editUser={editUserInfo} setShow={setShow} />;

	return (
		<Col>
			<UserInfo
				user={userValues.Username}
				email={userValues.Email}
				birthday={userValues.Birthday}
				setShow={setShow}
			/>
			<DeleteModal show={show} setShow={setShow} deleteUser={deleteUser} />
			{favoriteMovies ? (
				<FavoriteMovies
					favoriteMovies={favoriteMovies}
					removeFromFavorites={removeFromFavorites}
				/>
			) : (
				<MovieReelSpinner />
			)}
		</Col>
	);
};

export default ProfileView;
