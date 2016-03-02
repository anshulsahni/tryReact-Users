import React from 'react';
import autobind from 'autobind-decorator';


//index component
//loaded when the user is logged in
@autobind
class Index extends React.Component {

  constructor(){
    super();
    this.state={
      name:"",
      dataLoaded:false            //flag to know if the data is being loaded from firebase or already loaded

    }
  }

  //function to handle onClick event on log out button
  logOutClickEventHandler(event){
    event.preventDefault();
    this.props.auth.signOut(()=>{
      this.props.appHistory.push("sign_in")
    })
  }
  //getting the details of the logged in user after the components are rendered
  componentDidMount(){
    this.props.users.getUserDetails((user)=>{
      this.setState({name:user.name,dataLoaded:true})
    });
  }

  //elements rendered by this component
  render(){
    return (
      <div className='card'>
        <div className={this.state.dataLoaded?"":"hidden-xs-up"}>
          <div className='card-block' >
            <small>Welcome...</small>
            <h4 className='card-title'>
              {this.state.name}
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
        <h1 className={this.state.dataLoaded?"hidden-xs-up":""}>
          Loading...
        </h1>
      </div>
    )
  }
}

export default Index;
