import React from 'react';
import ReactDOM from 'react-dom';
import {Route,Router} from 'react-router';
import { hashHistory } from 'history';

//importing components
import App from './components/App';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';

var routes=(
    <Router history={hashHistory}>
      <Route path="/signUp" component={SignUp} />
      <Route path="/signIn" component={SignIn} />
      <Route path="/" component={App} />
    </Router>
  )
ReactDOM.render(routes,document.getElementById('app'));
