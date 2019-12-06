app.controller('ncwProjectListCtrl', function($scope, $state, $rootScope, $ionicPopup, AuthenticationService, ProjectService,$ionicHistory,$location,IonicClosePopupService) {

   $scope.$on('$ionicView.beforeEnter', function(){
        $scope.$parent.isVisible =false;
    });

  ProjectService.getProjects(AuthenticationService.getCompanyId()).then(function (data){
    if(data.errors){
      $scope.errorList = data.errors;
      $ionicPopup.alert({
        title: 'Login failed!',
        template: '<div ng-repeat="error in errorList">{{error}}</div>',
        scope: $scope

      });
      //IonicClosePopupService.register(alertPopup);
    }else {
      $scope.projectlist = data;
      $scope.errorList = "";
    }
  });


    $scope.goToProject = function(project) {
      $rootScope.selectedproject = project;
      if(AuthenticationService.isNonCertifiedUser(project)){
          $state.go("menu.NCW-home");
      }else{
          $state.go("menu.project",{projectId:project.id}, {'reload': true});
      }
    };

  })
