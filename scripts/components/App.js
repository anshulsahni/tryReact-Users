import React from 'react';
import ReactMixin from 'react-mixin';
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
    this.state={
      loggedInUser:{},
      signUpError:"",
      signUpStatus:"",
      signInError:"",
      signInStatus:""
    }
  }

  //calls sign in function from auth class
  //also sets the state of logged in user of this component
  signIn(credentials){
    this.setState({signInStatus:"Sending Data..."});
    auth.signIn(credentials,(error,authData)=>{
      if(error){
        this.setState({signInError:error.toString(),signInError:""})
        alert(error.toString());
      }
      else{
          this.setState({signInError:"",signInStatus:""})
          appHistory.push("/")
      }
    })
  }

  //calls signUp function from auth class
  signUp(userDetails){
    this.setState({signUpStatus:"Sending Data...",signUpError:""});
    users.addUser(userDetails,(error,userData)=>{
      if(error){
        if(error.code==="EMAIL_TAKEN"){
          this.setState({signUpError:"Email Already In Use",signUpStatus:""});
          alert("signUpError: Email Already In Use")
        }
        else if(error.code==="INVALID_EMAIL"){
          this.setState({signUpError:"Invalid Email",signUpStatus:""});
          alert("sign Up error: Invalid Email");
        }
      }
      else{
        this.setState({signUpStatus:"User Added",signUpError:""});
        alert("User Added");
      }
    });
  }

  //function to signOut
  signOut(){
    auth.signOut(()=>{
      appHistory.push("sign_in")
    })
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
            <Route path="/" onEnter={this.redirectIfNotLoggedIn} component={this.createComponent(Index,{signOut:this.signOut})} />
            <Route path="/sign_up" onEnter={this.redirectIfLoggedIn} component={this.createComponent(SignUp,{signUp:this.signUp,signUpError:this.state.signUpError})} />
            <Route path="/sign_in" onEnter={this.redirectIfLoggedIn} component={this.createComponent(SignIn,{signIn:this.signIn})} />
        </Router>
      </div>
    )
  }
}

export default App;
