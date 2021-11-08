import React from 'react';
import ReactDOM from 'react-dom';
import MainView  from './components/main-view/main-view';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/components/main-view/main-view.scss'
import Navigation from './components/navigation/navigation';

class App extends React.Component {
	render() {
		return (
        <MainView />
		);
	}
}

const container = document.getElementsByClassName('app-container')[0];

ReactDOM.render(React.createElement(App), container);
