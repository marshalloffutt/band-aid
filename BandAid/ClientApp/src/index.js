import 'bootstrap/dist/css/bootstrap.css';
import './styles/index.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

registerServiceWorker();
