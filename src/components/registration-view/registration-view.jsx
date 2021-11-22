import axios from 'axios';
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import InfoForm from '../form/info-form'
import { setUser } from '../../redux/features/userSlice';
import { useDispatch } from 'react-redux';
import { URL } from '../../helpers/helpers';
import '../../styles/_registration-view.scss';
import ErrorMessage from '../error-message/error-message';

function RegistrationView({ onBackClick }) {
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  
	const handleRegister = ({ username, password, email, birthday }) => {
    axios
    .post(`${URL}/signup`, {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    })
    .then(res => { 
      dispatch(setUser({Username: username, Password: password, Email: email, Birthday: birthday}))
      window.open('/', '_self')}
        )
			.catch(err => {
        setTimeout(() => {
          setError(false)
        }, 5000);
        setError(true)
      });
	};

	return (
    <>
    <InfoForm handleRegister={handleRegister} onBackClick={onBackClick}/>
    {error ? <ErrorMessage message='Something went wrong. Please try again.' /> : <></>}
    </>
    );
}

RegistrationView.propTypes = {
	onBackClick: PropTypes.func.isRequired
};

export default RegistrationView;
