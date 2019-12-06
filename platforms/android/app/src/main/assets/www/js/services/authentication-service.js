/**
 * Created by vpatel on 7/5/2016.
 */
app.factory('AuthenticationService', ['$rootScope','$window', function ( $rootScope,$window) {

  var authenticationService = {};


  /**
   * To cache user details in session storage
   * @param dealerDetails
   */
  authenticationService.cacheUserDetails = function(user){
    console.log("CACHE LOGIN RESPONSE");
    console.log(user);
    localStorage.setItem("name",user.name);

    localStorage.setItem("emailId",user.userName);
    localStorage.setItem("type",user.userType);
    localStorage.setItem("companyId",user.companyId);
  }

  /**
   * To cache user details in session storage.
   */
  authenticationService.cacheUserRoles =  function(user){
    localStorage.setItem("roles", user.authorities);
  }

  authenticationService.setToken = function (token) {
    localStorage.setItem("token", token);
  }

  authenticationService.getToken = function () {
    if(localStorage.getItem("token")){
      return localStorage.getItem("token");
    }

  }

  authenticationService.getCompanyId = function(){
    if(localStorage.getItem("companyId")){
      return localStorage.getItem("companyId");
    };
  }

  authenticationService.getRoles = function(){
    if(localStorage.getItem("roles")){
      return localStorage.getItem("roles");
    };
  }

  authenticationService.getLoginMemberType = function(){
    if(localStorage.getItem("type")){
      return localStorage.getItem("type");
    };
  }

authenticationService.isAdmin = function(){
    if(localStorage.getItem("roles") != null && localStorage.getItem("roles").split(',').length >3){
          return true;
    }
    return false;
  }

  authenticationService.isSupervizor = function(){
   if(localStorage.getItem("roles") != null && localStorage.getItem("roles").split(',').length ==3){
          return true;
   }
   return false;
  }

  authenticationService.isCertifiedUser = function(){
    return localStorage.getItem("roles").indexOf('ROLE_CW')!= -1;
  }


  authenticationService.isCertifiedUser_new = function(){
    if(localStorage.getItem("roles") != null && localStorage.getItem("roles").split(',').length ==2){
           return true;
    }
    }

  authenticationService.isNonCertifiedUser = function(){
    if(localStorage.getItem("roles") != null && localStorage.getItem("roles").split(',').length ==1){
      return localStorage.getItem("roles").indexOf('ROLE_NCW') != -1;
    }
  }

  authenticationService.getName = function () {
      if(localStorage.getItem("name")){
        return localStorage.getItem("name");
      }

    }
  authenticationService.getType = function () {
      if(localStorage.getItem("type")){
        return localStorage.getItem("type");
      }

    }

 authenticationService.clearCache =function(){
    	$window.localStorage.clear();
    	// clear root scope variables

    	delete $rootScope.teamRecord
      delete $rootScope.projectRecord
      delete $rootScope.selectedproject

    };

  return authenticationService;
}])
