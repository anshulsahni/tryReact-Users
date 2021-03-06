import React from 'react';
import {Link} from 'react-router';
import autobind from 'autobind-decorator';


//sign up component
//it handles the sign up view of the users
@autobind
class SignUp extends React.Component {

  constructor(){
    super();
    this.state={
      //state showing the responses related to sign up
      signUpStatus:""
    }
  }

  //function to handle onHandle event of sign up button
  signUpClickEventHandler(event){
    event.preventDefault();
    var userData={
      email:this.refs.email.value,
      password:this.refs.password.value,
      name:this.refs.name.value
    }
    if(userData.email && userData.password && userData.name){
      this.setState({signUpStatus:"Sending Data..."});
      this.props.users.addUser(userData,(error,userData)=>{
        if(error){
          if(error.code==="EMAIL_TAKEN"){
            this.setState({signUpStatus:"Error:Email Already In Use"});
          }
          else if(error.code==="INVALID_EMAIL"){
            this.setState({signUpStatus:"Invalid Email"});
          }
        }
        else{
          this.refs.signUpForm.reset();
          this.setState({signUpStatus:"User Added...Click Already A User To Log In"});
        }
      });
    }
  }

  render(){
    return(
      <div className='card'>
        <div className='card-block'>
          <h4 className='card-title'>Sign Up</h4>
        </div>
        <div className='card-block'>
          <form ref="signUpForm">
            <p className='text-danger'>{this.state.signUpStatus}</p>
            <fieldset className='form-group'>
              <input type='text' className='form-control' ref='name' placeholder='Enter Your Name' />
            </fieldset>
            <fieldset className='form-group'>
              <input type='text' className='form-control'  ref='email' placeholder='Enter Your Email'/>
            </fieldset>
            <fieldset className='form-group'>
              <input type='password' className='form-control' ref='password' placeholder='Enter Your Password'/>
            </fieldset>
            <fieldset className='form-group'>
               <button className='btn btn-danger' onClick={this.signUpClickEventHandler}>Sign Me Up...</button>
               <Link className='btn btn-danger pull-md-right' to='/sign_in'>Already a User??</Link>
            </fieldset>
          </form>
        </div>
      </div>
    )
  }
}

export default SignUp;
