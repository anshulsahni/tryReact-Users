import Rebase from 're-base';

var baseRef=Rebase.createClass("https://tryreact.firebaseio.com");

//class containing the authorization functions
class Auth{

  //function calls firebase api authentication function to authenticate the user
  signIn(credentials,callback){
    baseRef.authWithPassword({
      email:credentials.email,
      password:credentials.password
    },function(error,authData){
      callback(error,authData);
    })
  }

  //function calls firebase api unauth to log out the user
  signOut(callback){
    baseRef.unauth();
    callback();
  }

  //get authData of the logged in user
  getLoggedInUser(){
    return baseRef.getAuth();
  }

}

export default Auth
