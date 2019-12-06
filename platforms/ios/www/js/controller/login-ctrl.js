/**
 * Created by vpatel on 7/4/2016.
 */
app.controller('loginCtrl',['$scope','$state','LoginService','AuthenticationService','$ionicPopup','$rootScope','ProjectService', function($scope,$state, LoginService,AuthenticationService,$ionicPopup,$rootScope,ProjectService,IonicClosePopupService,$ionicPlatform,$cordovaAppVersion) {


 document.addEventListener("deviceready", function () {

 cordova.getAppVersion.getVersionNumber(function (version) {
    $scope.instaledAppVersion = version;
});

  }, false);


  if(AuthenticationService && AuthenticationService.getCompanyId()){

  $state.transitionTo("menu.projectList", {}, {'reload': true});

   }else{



   $scope.pageLoaded=true;
   $scope.userDetails = {};

   }
  $scope.login = function() {

    $scope.errors = [];
    AuthenticationService.clearCache();
    if(!$scope.userDetails.email) {
      $scope.errors.push('Email is Required');
    }
    if(!$scope.userDetails.password) {
      $scope.errors.push('Password is Required');
    }
    if($scope.errors.length >0){
      $ionicPopup.alert({
        title: 'Login failed!',
        template: '<div ng-repeat="error in errors" class="popup-content"><li>{{error}}</li></div>',
        scope: $scope
      });
      //IonicClosePopupService.register(alertPopup);
    }else{

      LoginService.login($scope.userDetails).then(function (user){

        if(user.errors){
          $ionicPopup.alert({
            title: 'Login failed!',
            template: 'Please check your credentials!'
          });
          //IonicClosePopupService.register(alertPopup);
        }else {
          //AuthenticationService.setToken(btoa($scope.userDetails.email +':'+$scope.userDetails.password));
          console.log(user)
          AuthenticationService.setToken(user.token);
          AuthenticationService.cacheUserDetails(user)
          AuthenticationService.cacheUserRoles(user);

          if(AuthenticationService.isNonCertifiedUser()){
           $scope.$parent.isVisible =false;

           ProjectService.getProjects(AuthenticationService.getCompanyId()).then(function (data){
             if(data.errors){

             }else {
                $rootScope.selectedproject = data[0];
             }
           });

         }else{
           $scope.$parent.isVisible =true;
         }

          $state.transitionTo(AuthenticationService.isNonCertifiedUser() ? "menu.NCW-home":"menu.projectList", {}, {'reload': true});
        }
      });
    }


  }

  $scope.logout = function(click){
    $state.go('login', {}, {reload: true});
  }

}])
