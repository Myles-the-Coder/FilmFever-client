import React, { useEffect, useState } from 'react';
import {request} from '../../requestMethods'
import UserInfo from './user-info';
import { Col } from 'react-bootstrap';
import MovieReelSpinner from '../MovieReelSpinner/MovieReelSpinner';
import InfoForm from '../form/info-form';
import FavoriteMovies from './favorite-movies';
import DeleteModal from './delete-modal';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, removeFromFavs } from '../../redux/features/userSlice';
import '../../styles/_profile-view.scss';

const ProfileView = ({ getUser }) => {
	const favoriteMovies = useSelector(state => state.user.value.FavoriteMovies);
	const userValues = useSelector(state => state.user.value);
	const [show, setShow] = useState('');
	const token = localStorage.getItem('token');
	const user = localStorage.getItem('user');
	const dispatch = useDispatch();

	useEffect(() => getUser(user, token), []);

	const editUserInfo = ({ username, password, email, birthday }) => {
		request
			.put(
				`/users/update/${user}`,
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

	const removeFromFavorites = id => {
		request
			.delete(`/users/${user}/movies/${id}`, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then(res => dispatch(removeFromFavs(favoriteMovies.indexOf(id))))
			.catch(err => console.log(err));
	};

	const deleteUser = () => {
		request
			.delete(`/users/${user}`, {
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
		return <InfoForm editUserInfo={editUserInfo} setShow={setShow} />;

	return (
		<Col>
			<UserInfo user={userValues} setShow={setShow} />
			<DeleteModal show={show} setShow={setShow} deleteUser={deleteUser} />
				<FavoriteMovies
					favoriteMovies={userValues.FavoriteMovies}
					removeFromFavorites={removeFromFavorites}
				/>
		</Col>
	);
};

export default ProfileView;
