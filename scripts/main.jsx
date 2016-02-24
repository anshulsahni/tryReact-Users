import React from 'react';
import ReactDOM from 'react-dom';
import {Route,Router} from 'react-router';

//importing components
import App from './components/App';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';

var routes=(
    <Router>
      <Route path="/signUp" component={SignUp} />
      <Route path="/signIn" component={SignIn} />
      <Route path="/" component={App} />
    </Router>
  )
ReactDOM.render(routes,document.getElementById('app'));
