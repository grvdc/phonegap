/**
 * Created by vpatel on 7/5/2016.
 */

app.factory('LoginService', ['$http', '$q', 'AuthenticationService',function($http, $q,AuthenticationService){
  var loginService = {};

  loginService.login = function (userDetails) {
    var loginUserData = $q.defer();
    // by default application do add authorization token in all request, set it false for request which does not require
    //authorization

      $http.post(APP_BASE_URL + '/login',userDetails).success(function(user){
        loginUserData.resolve(user);
      }).error(function(user){
        loginUserData.resolve(user);
      });

    return loginUserData.promise;

  };

  return loginService;
}])
