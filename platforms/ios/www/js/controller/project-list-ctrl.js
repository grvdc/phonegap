app.controller('projectListCtrl', function($scope, $state, $rootScope, $ionicPopup,$ionicSideMenuDelegate, AuthenticationService, ProjectService,$ionicHistory,$location,CompanyService,TeamMemberService) {

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


 $scope.searchform = {};
 $scope.projectlist =[];
  ProjectService.getProjects(AuthenticationService.getCompanyId()).then(function (data){

    if(data.errors){
      $scope.errorList = data.errors;
      $ionicPopup.alert({
        title: 'Login failed!',
        template: '<div ng-repeat="error in errorList">{{error}}</div>',
        scope: $scope

      });
    }else {
       /*
      angular.forEach(data, function(value1, key1) {
      console.log(value1.id);
      TeamMemberService.getAllTeamMembers(value1.id).then(function (teamdata){
      value1['TeamMemberCount']  = teamdata.length;
      $scope.projectlist.push(value1);
      });


      })
      */
      //
      $scope.projectlist = data;
      $scope.errorList = "";
      console.log($scope.projectlist)
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


  $scope.searchProject =function(){

  var filter = $scope.searchform.searchKey.toUpperCase();

  var ptags = document.getElementById("project_item_row").getElementsByTagName("p");
  for (i = 0; i < ptags.length; i++) {

   // a = li[i].getElementsByTagName("a")[0];
    txtValue = ptags[i].textContent || ptags[i].innerText.toUpperCase();


    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      ptags[i].closest('.project_item_row').style.display = "";
    } else {
       ptags[i].closest('.project_item_row').style.display = "none";
    }
  }


  // console.log($scope.projectlist);
  //  console.log($scope.searchform.searchKey)
  }


$scope.editMode = function(projectId){
$('.projectnameinput')
document.getElementById("projectname_"+projectId).style.display = "none";
document.getElementById("projectnameinput_"+projectId).style.display = "";

}

  })
