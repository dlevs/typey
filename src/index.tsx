import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

// Little hack to put React.Fragment in global namespace to use
// <Fragment> shorthand.
// https://github.com/emotion-js/emotion/issues/1156
window.React = {
  ...window.React,
  Fragment
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
