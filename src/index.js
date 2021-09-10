import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-modal';

let rootEl = document.createElement('div');
rootEl.setAttribute('id', 'root');
document.body.appendChild(rootEl);


ReactDOM.render(<App />, rootEl);

Modal.setAppElement('#root');

reportWebVitals();
