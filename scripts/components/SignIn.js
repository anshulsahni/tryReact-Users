import React from 'react';
import {Link} from 'react-router';
import autobind from 'autobind-decorator';


//sign in Component
//it handles all the sign in view of the app
@autobind
class SignIn extends React.Component{

  constructor(){
    super();
    this.state={
      //state to show the responses related to signing in
      signInStatus:""
    }
  }

  //function to handle to onClick event on signIn button
  signInClickEventHandler(event){
    event.preventDefault();
    var credentials={
      email:this.refs.email.value,
      password:this.refs.password.value
    }
    if(credentials.email && credentials.password){
      this.setState({signInStatus:"Sending Data..."})
      this.props.auth.signIn(credentials,(error,userData)=>{
        if(error){
          this.setState({signInStatus:error.toString()})
          alert(error.toString());
        }
        else{
          this.setState({signInStatus:""})
          this.refs.signInForm.reset();
          this.props.appHistory.push("/")
        }
      });
    }
    else{
      this.setState({signInStatus:"Error:Please specify username and password to log In"})
    }
  }

  render(){
    return(
      <div className='card'>
        <div className='card-block'>
          <h4 className='card-title'>Sign In</h4>
        </div>
        <div className='card-block'>
          <form ref="signInForm">
            <p className='text-danger'>{this.state.signInStatus}</p>
            <fieldset className='form-group'>
              <input type='text' className='form-control' ref='email' placeholder='Enter Your User Name'/>
            </fieldset>
            <fieldset className='form-group'>
              <input type='password' className='form-control' ref='password' placeholder='Enter Your Password' />
            </fieldset>
            <fieldset className='form-group'>
              <button className='btn btn-danger' onClick={this.signInClickEventHandler}>Sign In...</button>
              <Link className='btn btn-danger pull-md-right' to='/sign_up'>Not a user??</Link>
            </fieldset>
          </form>
        </div>
      </div>
    )
  }
}

export default SignIn;
