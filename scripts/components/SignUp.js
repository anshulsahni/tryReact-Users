import React from 'react';
import autobind from 'autobind-decorator';


//sign up component
@autobind
class SignUp extends React.Component {

  constructor(){
    super();
  }

  //function to handle onHandle event of sign up button
  signUpClickEventHandler(event){
    event.preventDefault();
    var user={
      email:this.refs.email.value,
      password:this.refs.password.value,
      name:this.refs.name.value
    }
    this.props.signUp(user);
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
               <a className='btn btn-danger pull-md-right' href='#/sign_in'>Already a User??</a>
            </fieldset>
          </form>
        </div>
      </div>
    )
  }
}

export default SignUp;
