import Rebase from 're-base';

var baseRef=Rebase.createClass("https://tryreact.firebaseio.com");
class Users{

  //function to add user to the firebase authentication usermanangement system
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

  getUserDetails(callback){
    var user = baseRef.getAuth();
    baseRef.fetch(user.uid,{
      context:this,
      then:callback
    });
  }
}

export default Users;
