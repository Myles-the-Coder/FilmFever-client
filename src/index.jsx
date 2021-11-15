import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import MainView  from './components/main-view/main-view';
import filmFever from './reducers/reducers';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/main-view.css'

const store = createStore(filmFever, devToolsEnhancer())

class App extends React.Component {
	render() {
		return (
      <Provider store={store}>
        <MainView />
        </Provider>
		);
	}
}

const container = document.getElementsByClassName('app-container')[0];

ReactDOM.render(React.createElement(App), container);
