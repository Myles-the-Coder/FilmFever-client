import React from 'react';
import ReactDOM from 'react-dom';
import MainView  from './components/main-view/main-view';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/components/main-view/main-view.scss'
class App extends React.Component {
	render() {
		return (
			<MainView />
		);
	}
}

const container = document.getElementsByClassName('app-container')[0];

ReactDOM.render(React.createElement(App), container);
