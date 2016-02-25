import React from 'react';
import _ from 'underscore';
import {History} from 'react-router';
import ReactMixin from 'react-mixin';

//for firebase
import Rebase from 're-base';
var base=Rebase.createClass("https://tryreact.firebaseio.com");

//  root component
class App extends React.Component {

  constructor(){
    super();
    this.fireBaseConnectionRef;
    this.state={
      users:[],
      loggedInUser:{}
    }
  }

  componentWillMount(){
    this.checkLoggedIn();
  }

  //syncing the state with firebase
  componentDidMount(){
    this.fireBaseConnectionRef=base.syncState('users',{
      context:this,
      state:'users',
      then:this.setLoggedInUser
    })
  }

  //function to handle onClick event on log out button
  logOutClickEventHandler(event){
    event.preventDefault();
    if(localStorage.userToken){
      localStorage.removeItem("userToken");
    }
    this.history.pushState(null,'/signIn');
  }

  //function to assign user object the details
  setLoggedInUser(){
    this.state.loggedInUser=_.findWhere(this.state.users,{userName:localStorage.userToken});
    this.setState({loggedInUser:this.state.loggedInUser})
  }

  //checks if any user logged in
  checkLoggedIn(){
    if(!localStorage.userToken){
      this.history.pushState(null,'/signIn');
      return false;
    }
    return true;
  }

  //elements rendered by this component
  render(){
    return (
      <div className='card'>
        <div className='card-block'>
          <small>Welcome...</small>
          <h4 className='card-title'>
            {this.state.loggedInUser.name}
          </h4>
        </div>
        <div className='card-block'>
          Blah...Blah...Blah...
        </div>
        <div className='card-block'>
          <div>
            <form>
              <button className='btn btn-danger' onClick={this.logOutClickEventHandler.bind(this)}>Log Out...</button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  //removing listeners from firebase
  componentWillUnmount(){
    base.removeBinding(this.fireBaseConnectionRef);
  }
}

ReactMixin.onClass(App,History);

export default App;
