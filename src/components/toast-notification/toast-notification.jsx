import React from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import { Col } from 'react-bootstrap';

function ToastNotification({ show, setShow, currentFilmTitle }) {
	return (
		<Col xs={6}>
			<ToastContainer
				style={{
					zIndex: '100',
					position: 'fixed',
					top: '15%',
					right: '0',
					textAlign: 'center',
				}}>
				<Toast
					onClose={setShow}
					delay={3000}
					autohide
					style={{ backgroundColor: 'whitesmoke' }}>
					<Toast.Body>{`${currentFilmTitle} has been added to Favorites`}</Toast.Body>
				</Toast>
			</ToastContainer>
		</Col>
	);
}

export default ToastNotification;
