app.factory('ChangePasswordService',['$http','$q',function($http,$q) {

  var changePasswordService = {};

  changePasswordService.sendForgotRequest = function(user){
      return $http.post(APP_BASE_URL + '/forgot-password-request',user);
  }

  changePasswordService.forgotPassword = function(changePasswordDTO){
    return $http.post(APP_BASE_URL + '/forgot-password',changePasswordDTO);
  }

  changePasswordService.forgotPasswordnew = function(changePasswordDTO){
    return $http.post(APP_BASE_URL + '/forgot-password-new',changePasswordDTO);
  }

  return changePasswordService;
}]);
