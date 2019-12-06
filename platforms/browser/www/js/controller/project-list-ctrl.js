app.controller('projectListCtrl', function($scope, $state, $rootScope, $ionicPopup,$ionicSideMenuDelegate, AuthenticationService, ProjectService,$ionicHistory,$location,CompanyService) {

 $scope.$on('$ionicView.beforeEnter', function(){

 if(AuthenticationService.getType() == "OTHER" || AuthenticationService.getType()== "WORKER" || AuthenticationService.getType()== "NCW"){
  $scope.isEditable = false;
 }else{
 $scope.isEditable = true;
 }

    $ionicSideMenuDelegate.canDragContent(true);
      $scope.$parent.isVisible =true;
      $scope.hideBackButton = false;
  });
  /*$scope.$on('$ionicView.afterEnter', function(){
        alert("afterEnter");
        if(AuthenticationService.isNonCertifiedUser()){
           $scope.$parent.isVisible =false;
           $scope.hideBackButton = false;
         }else{
           $scope.$parent.isVisible =true;
            $scope.hideBackButton = true;
         }
    });*/





  ProjectService.getProjects(AuthenticationService.getCompanyId()).then(function (data){

    if(data.errors){
      $scope.errorList = data.errors;
      $ionicPopup.alert({
        title: 'Login failed!',
        template: '<div ng-repeat="error in errorList">{{error}}</div>',
        scope: $scope

      });
    }else {
      $scope.projectlist = data;
      $scope.errorList = "";

    }
  });

    // An alert dialog
    /*$scope.goToProject = function(isSinged) {
      if(isSinged){
        $state.go("menu.project");
      }else{
        var alertPopup = $ionicPopup.alert({
          title: 'Not Signed',
          template: 'You are not permitted/Signed to access'
        });
      }
    };
  }) */

    $scope.goToProject = function(project) {
      $rootScope.selectedproject = project;
      if(AuthenticationService.isNonCertifiedUser(project)){
          $state.go("NCW-home");
      }else{
          $state.go("menu.project",{projectId:project.id}, {'reload': true});
      }
    };

  $scope.goToProjectRecordPage = function () {
    //$state.go("menu.companyInfo",{firmName:'Test'},{reload: true});

    CompanyService.checkEPARegistration().success(function(data) {

            if(data.present){
              $rootScope.projectRecord = 'add';
              $state.go("menu.projectRecord",{},{reload: true});
            }else{
              $state.go("menu.companyInfo",{firmName:data.firmName},{reload: true});
            }
    });

    //$state.transitionTo('new-state', null, {'reload':true});
    // $state.go('transition', {destination: 'menu.projectRecord'});
    // $state.transitionTo("menu.projectRecord",{},{ reload: true, inherit: false, notify: true });
  }




  })
