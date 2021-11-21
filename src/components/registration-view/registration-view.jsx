import axios from 'axios';
import React from 'react';
import PropTypes from 'prop-types';
import InfoForm from '../form/info-form'

import '../../styles/_registration-view.scss';
import { setUser } from '../../redux/features/userSlice';
import { useDispatch } from 'react-redux';

function RegistrationView({ onBackClick }) {
  const dispatch = useDispatch()
  
	const handleRegister = ({ username, password, email, birthday }) => {
    axios
    .post('https://film-fever-api.herokuapp.com/signup', {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    })
    .then(res => { 
      dispatch(setUser({Username: username, Password: password, Email: email, Birthday: birthday}))
      window.open('/', '_self')}
        )
			.catch(err => console.log('error registering the user'));
	};

	return (
    <InfoForm handleRegister={handleRegister} onBackClick={onBackClick}/>
	);
}

RegistrationView.propTypes = {
	onBackClick: PropTypes.func.isRequired
};

export default RegistrationView;
