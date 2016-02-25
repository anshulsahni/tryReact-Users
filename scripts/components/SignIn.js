import React from 'react';
import _ from 'underscore';
import {History} from 'react-router';
import ReactMixin from 'react-mixin';

//firebase module
import Rebase from 're-base';
var base=Rebase.createClass("https://tryreact.firebaseio.com");

//sign in Component
class SignIn extends React.Component{

  constructor(){
    super();
    this.fireBaseConnectionObject={};
    this.state={
      users:[]
    }
  }

  componentWillMount(){
    this.checkLoggedIn();
  }

  //syncing the state with firebase
  componentDidMount(){
      this.fireBaseConnectionRef=base.syncState('users',{
        context:this,
        state:'users'
      })
  }

  //function to handle to onClick event on signIn button
  signInClickEventHandler(event){
    event.preventDefault();
    var userName=this.refs.userName.value;
    var password=this.refs.password.value;
    if(userName && password){
      var user=_.findWhere(this.state.users,{
        userName:userName,
        password:password
      })
      if(!user){
        alert("Invalid User Name or Password");
      }
      else {
        localStorage.setItem("userToken",user.userName);
        this.history.pushState(null,'/');
      }
    }
    else{
      alert("Please provide user name and password")
    }
  }

  //function to check logged in status
  checkLoggedIn(){
    if(localStorage.userToken){
      this.history.pushState(null,'/');
      return false;
    }
    return true;
  }

  render(){
    return(
      <div className='card'>
        <div className='card-block'>
          <h4 className='card-title'>Sign In</h4>
        </div>
        <div className='card-block'>
          <form>
            <fieldset className='form-group'>
              <input type='text' className='form-control' ref='userName' placeholder='Enter Your User Name'/>
            </fieldset>
            <fieldset className='form-group'>
              <input type='password' className='form-control' ref='password' placeholder='Enter Your Password' />
            </fieldset>
            <fieldset className='form-group'>
              <button className='btn btn-danger' onClick={this.signInClickEventHandler.bind(this)}>Sign In...</button>
              <a className='btn btn-danger pull-md-right' href='#/signUp'>Not a user??</a>
            </fieldset>
          </form>
        </div>
      </div>
    )
  }

  //removing listeners from firebase
  componentWillUnmount(){
    base.removeBinding(this.fireBaseConnectionRef);
  }
}
ReactMixin.onClass(SignIn,History);

export default SignIn;
