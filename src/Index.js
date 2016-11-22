import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import Promise from 'es6-promise';
import injectTapEventPlugin from 'react-tap-event-plugin';
import App from './components/App';
import Contact from './components/Contact';

injectTapEventPlugin();
Promise.polyfill();

render(
  (<Router history={hashHistory}>
    <Route path="/" component={App}>
      <Route path="/contact/:id" component={Contact} />
    </Route>
  </Router>), document.getElementById('content')
);
