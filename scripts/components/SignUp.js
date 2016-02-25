import React from 'react';
import {History} from 'react-router';
import ReactMixin from 'react-mixin';

import Rebase from 're-base';
var base=Rebase.createClass("https://tryreact.firebaseio.com");

//sign up component
class SignUp extends React.Component {

  constructor(){
    super();
    // this.checkLoggedIn();
    this.fireBaseConnectionRef;
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

  //function to handle onHandle event of sign up button
  signUpClickEventHandler(event){
    event.preventDefault();
    if(this.refs.name.value && this.refs.userName.value && this.refs.password.value){
      this.addUser({
        name:this.refs.name.value,
        userName:this.refs.userName.value,
        password:this.refs.password.value
      })
      alert("New User Added")
    }
    else{
      alert("Please enter all the fields");
    }
  }

  //function to check logged in status
  checkLoggedIn(){
    if(localStorage.userToken){
      this.history.pushState(null,'/');
      return true;
    }
    return false;
  }

  //function to add User
  addUser(user){
    this.state.users.push(user);
    this.setState({users:this.state.users});
  }

  render(){
    return(
      <div className='card'>
        <div className='card-block'>
          <h4 className='card-title'>Sign Up</h4>
        </div>
        <div className='card-block'>
          <form>
            <fieldset className='form-group'>
              <input type='text' className='form-control'  ref='name' placeholder='Enter Your Name'/>
            </fieldset>
            <fieldset className='form-group'>
              <input type='text' className='form-control'  ref='userName' placeholder='Enter Your User Name'/>
            </fieldset>
            <fieldset className='form-group'>
              <input type='password' className='form-control' ref='password' placeholder='Enter Your Password'/>
            </fieldset>
            <fieldset className='form-group'>
               <button className='btn btn-danger' onClick={this.signUpClickEventHandler.bind(this)}>Sign Me Up...</button>
               <a className='btn btn-danger pull-md-right' href='#/signIn'>Already a User??</a>
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
ReactMixin.onClass(SignUp,History);
export default SignUp;
