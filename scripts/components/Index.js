import React from 'react';
import autobind from 'autobind-decorator';

@autobind
class Index extends React.Component {

  constructor(){
    super();
  }

  //function to handle onClick event on log out button
  logOutClickEventHandler(event){
    event.preventDefault();
    this.props.signOut();
  }

  //elements rendered by this component
  render(){
    return (
      <div className='card'>
        <div className='card-block'>
          <small>Welcome...</small>
          <h4 className='card-title'>
            
          </h4>
        </div>
        <div className='card-block'>
          Blah...Blah...Blah...
        </div>
        <div className='card-block'>
          <div>
            <form>
              <button className='btn btn-danger' onClick={this.logOutClickEventHandler}>Log Out...</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Index;
