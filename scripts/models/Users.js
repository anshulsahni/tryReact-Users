import Rebase from 're-base';

var baseRef=Rebase.createClass("https://tryreact.firebaseio.com");

//class to manage the user
//1. add user in the database
//2. get the details of logged in user
class Users{

  //function to add user to the firebase authentication usermanangement system
  //callback-callback function provided with error and data of the user added in firebase database
  addUser(user,callback){
    baseRef.createUser({
      email:user.email,
      password:user.password
    },function(error,userData){
      baseRef.post(userData.uid,{
        data:{name:user.name}
      })
      callback(error,userData);
    })
  }

  //function to get the details of the logged in user
  //callback-callback function provided with the details of the user in the argument
  getUserDetails(callback){
    var user = baseRef.getAuth();
    baseRef.fetch(user.uid,{
      context:this,
      then:callback
    });
  }
}

export default Users;
