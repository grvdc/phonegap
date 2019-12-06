/**
 * Created by vpatel on 7/4/2016.
 */
app.controller('forgotPasswordCtrl', function($scope,ChangePasswordService,$ionicPopup,$state,AuthenticationService,IonicClosePopupService) {

  $scope.user = {};
  AuthenticationService.clearCache();
  $scope.sendForgotRequest = function(){
    ChangePasswordService.sendForgotRequest($scope.user).success(function(response){
          $state.go('changePassword', {emailId:$scope.user.emailId}, {reload: true});
        }).error(function(error){
          $scope.errorList = error.errors;
          $scope.keys = Object.keys($scope.errorList);
          if($scope.keys.length > 0 ){
          $ionicPopup.alert({
            title: 'Failed',
            template: '<div ng-repeat="key in keys  | orderBy:\'toString()\'"><div ng-repeat="(k,val) in errorList[key]" class="popup-content"><li> {{val.message}}</li></div></div>',
            scope: $scope,
          });
          //IonicClosePopupService.register(alertPopup);
          }
        });

  }


})
