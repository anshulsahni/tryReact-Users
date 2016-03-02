import React from 'react';
import {Route,Router,useRouterHistory} from 'react-router';
import {createHashHistory} from 'history';
import autobind from 'autobind-decorator';

import Users from '../models/Users';
var users = new Users();

import Auth from '../models/Auth';
var auth=new Auth();

import Index from './Index';
import SignIn from './SignIn';
import SignUp from './SignUp';

const appHistory = useRouterHistory(createHashHistory)({ queryKey: false })
//root component for app containing the routes
@autobind
class App extends React.Component{

  constructor(){
    super();
  }

  //function to signOut
  signOut(){

  }

  //redirect if users is logged In
  redirectIfLoggedIn(nextState,replace){
    var user=auth.getLoggedInUser();
    if(user){
      replace({
        pathname:"/"
      })
    }
  }

  //redirect if users is not logged In
  redirectIfNotLoggedIn(nextState,replace){
    var user=auth.getLoggedInUser();
    if(!user){
      replace({
        pathname:"/sign_in"
      })
    }
  }

  //function to create component with specified props
  createComponent(Component,props){
    return React.createClass({
      render:function(){
        console.log(props)
        return <Component {...props}/>
      }
    })
  }

  render(){

    return(
      <div>
        <Router history={appHistory}>
            <Route path="/" onEnter={this.redirectIfNotLoggedIn} component={this.createComponent(Index,{auth:auth,appHistory:appHistory,users:users})} />
            <Route path="/sign_up" onEnter={this.redirectIfLoggedIn} component={this.createComponent(SignUp,{users:users})} />
            <Route path="/sign_in" onEnter={this.redirectIfLoggedIn} component={this.createComponent(SignIn,{auth:auth,appHistory:appHistory})} />
        </Router>
      </div>
    )
  }
}

export default App;
