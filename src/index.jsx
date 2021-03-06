import React from 'react';
import {createRoot} from 'react-dom/client';
import { store } from './redux/app/store';
import { Provider } from 'react-redux';
import MainView from './components/main-view/main-view';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/main-view.css';

class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<BrowserRouter>
					<MainView />
				</BrowserRouter>
			</Provider>
		);
	}
}

const container = document.getElementsByClassName('app-container')[0];
const root = createRoot(container)
root.render(<App/>)