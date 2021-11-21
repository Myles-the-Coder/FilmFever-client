import React from 'react';
import { Button, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import logo from '../../img/FilmFever.png';
import '../../styles/_navigation.scss';

const Navigation = ({ onLoggedOut, user }) => {
	const { Brand, Toggle, Collapse } = Navbar;

	if (!user.Username) {
		return (
			<Navbar style={{ maxHeight: '100px' }}></Navbar>
		);
	} else {
		return (
			<Navbar
				collapseOnSelect
				expand='lg'
				sticky='top'
				className='navbar-styling'>
				<Brand>
					<Link to='/movies'>
						<img src={logo} alt='FilmFever logo' className='logo-styling' />
					</Link>
				</Brand>
				<Toggle aria-controls='responsive-navbar-nav' />
				<Collapse id='responsive-navbar-nav' className='justify-content-end'>
					<Link to='/'>
						<Button bsPrefix='nav-button' onClick={onLoggedOut}>
							Sign Out
						</Button>
					</Link>
					<Link to={`/users/${user.Username}`}>
						<Button className='m-2' bsPrefix='nav-button'>
							Profile
						</Button>
					</Link>
					<Link to='/movies'>
						<Button bsPrefix='nav-button'>Movies</Button>
					</Link>
				</Collapse>
			</Navbar>
		);
	}
};

Navigation.propTypes = {
	onLoggedOut: PropTypes.func.isRequired,
	user: PropTypes.any,
};

export default Navigation;
