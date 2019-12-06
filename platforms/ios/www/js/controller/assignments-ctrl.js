/**
 * Created by vpatel on 7/4/2016.
 */
app.controller('assignmentsCtrl', function($scope,$state,$ionicSlideBoxDelegate,$ionicPopup,$timeout,TeamMemberService,AreaService,$stateParams,assignmentsData,AssignmentService,IonicClosePopupService) {

  $scope.isNonCertifiedApply = false;
  $scope.isCertifiedApply = false;
  $scope.isNextSlide = true;
  $scope.isPreviousSlide = false;

  AreaService.getAllAreaByProject($stateParams.projectId).then(function (data){
    if(data.errors){
      $scope.errorList = data.errors;
      $ionicPopup.alert({
        title: 'Failed!',
        template: 'Please try after some time',
        scope: $scope,

      });
      //IonicClosePopupService.register(alertPopup);
    }else {
      //$scope.areaList = data;

      $scope.errorList = "";
    }
  });

  if(assignmentsData != null && assignmentsData.length >0){
    $scope.assignmentList = assignmentsData[0];
    console.log($scope.assignmentList);




  }

 /* $scope.checkedOrNot = function (area, projectAreaIds) {
    if (projectAreaIds.indexOf(area.id) == -1) {
      projectAreaIds.push(area.id);
    } else {
      projectAreaIds.pop(area.id);
    }
  }*/

/*  $scope.isChecked = function (assignment,areaId) {
    if(assignment.projectAreaIds.indexOf(areaId) != -1){
      return true;
    }
  }*/

  /*TeamMemberService.getAllTeamMembers($stateParams.projectId).then(function (members){
   if(members.errors){
   var alertPopup = $ionicPopup.alert({
   title: 'Failed!',
   template: 'Please after some time!'
   });
   }else {
   $scope.memberList = members;
   $scope.disableSwipe();
   }
   });*/


  $scope.supervisorFilter = function(){
    $scope.isPreviousSlide = false;

    $scope.isCertifiedApply=false;
    $scope.isNonCertifiedApply=false;
    $scope.isforemanApply=false;
    $scope.isotherApply=false;
    $scope.isworkerApply=false;

    $scope.issupervisorApply=!$scope.issupervisorApply;

    $scope.issupervisorApply ? $scope.myFilter={userType : 'SUPERVISOR'}  : $scope.myFilter = {};
    $ionicSlideBoxDelegate.update();
    $ionicSlideBoxDelegate.slide(0);
    $scope.isPreviousSlide = false;
    $scope.isNextSlide = true;
  }

  $scope.foremanFilter = function(){
    $scope.isPreviousSlide = false;

    $scope.isCertifiedApply=false;
    $scope.isNonCertifiedApply=false;
    $scope.isotherApply=false;
    $scope.isworkerApply=false;
    $scope.issupervisorApply =false;

    $scope.isforemanApply=!$scope.isforemanApply;

    $scope.isforemanApply ? $scope.myFilter={userType : 'FOREMAN'}  : $scope.myFilter = {};
    $ionicSlideBoxDelegate.update();
    $ionicSlideBoxDelegate.slide(0);
    $scope.isPreviousSlide = false;
    $scope.isNextSlide = true;
  }

  $scope.otherFilter = function(){
    $scope.isPreviousSlide = false;

    $scope.isCertifiedApply=false;
    $scope.isNonCertifiedApply=false;
    $scope.isforemanApply=false;
    $scope.isworkerApply=false;
    $scope.issupervisorApply =false;

    $scope.isotherApply=!$scope.isotherApply;

    $scope.isotherApply ? $scope.myFilter={userType : 'OTHER'}  : $scope.myFilter = {};
    $ionicSlideBoxDelegate.update();
    $ionicSlideBoxDelegate.slide(0);
    $scope.isPreviousSlide = false;
    $scope.isNextSlide = true;
  }
  $scope.workerFilter = function(){
    $scope.isPreviousSlide = false;

    $scope.isCertifiedApply=false;
    $scope.isNonCertifiedApply=false;
    $scope.isforemanApply=false;
    $scope.isotherApply=false;
    $scope.issupervisorApply =false;
    $scope.isworkerApply=!$scope.isworkerApply;
    $scope.isworkerApply ? $scope.myFilter={userType : 'WORKER'}  : $scope.myFilter = {};
    $ionicSlideBoxDelegate.update();
    $ionicSlideBoxDelegate.slide(0);
    $scope.isPreviousSlide = false;
    $scope.isNextSlide = true;
  }

  $scope.nonCertifiedFilter = function(){
    $scope.isPreviousSlide = false;

    $scope.isCertifiedApply=false;
    $scope.issupervisorApply=false;
    $scope.isforemanApply=false;
    $scope.isotherApply=false;
    $scope.isworkerApply=false;
    $scope.isNonCertifiedApply=!$scope.isNonCertifiedApply;

    $scope.isNonCertifiedApply ? $scope.myFilter={userType : 'NCW'}  : $scope.myFilter = {};
    $ionicSlideBoxDelegate.update();
    $ionicSlideBoxDelegate.slide(0);
    $scope.isPreviousSlide = false;
    $scope.isNextSlide = true;
  }

  $scope.certifiedFilter = function(){
    $scope.isCertifiedApply=!$scope.isCertifiedApply;

    $scope.isNonCertifiedApply=false;
    $scope.isforemanApply=false;
    $scope.isotherApply=false;
    $scope.isworkerApply=false;
    $scope.issupervisorApply =false;


    $scope.isCertifiedApply ? $scope.myFilter={userType : 'CW'}  : $scope.myFilter = {};
    $ionicSlideBoxDelegate.update();

    $ionicSlideBoxDelegate.slide(0);
    $scope.isPreviousSlide = false;
    $scope.isNextSlide = true;

  }

  $scope.nextSlide = function() {
    $ionicSlideBoxDelegate.next();
    $scope.isPreviousSlide = true;
    if($ionicSlideBoxDelegate.slidesCount()-1 ==$ionicSlideBoxDelegate.currentIndex() ){
      $scope.isNextSlide = false;
    }
  }

  $scope.previousSlide = function () {
    $scope.isNextSlide = true;
    $ionicSlideBoxDelegate.previous();
    if($ionicSlideBoxDelegate.currentIndex() ==0 ){
      $scope.isPreviousSlide = false;
    }

  }

  $scope.disableSwipe = function() {
    //$ionicSlideBoxDelegate.enableSlide(true);
    $ionicSlideBoxDelegate.update();
  };

  $scope.save = function () {
  console.log($scope.assignmentList)
    AssignmentService.saveAssignments($scope.assignmentList).success(function(response){
    console.log(response)
      $state.go('menu.selectArea', {projectId:$stateParams.projectId}, {reload: true});
    }).error(function(error){
      $scope.errorList = error.errors;
      $ionicPopup.alert({
        title: 'Save failed!',
        template: '<div ng-repeat="(key,value) in errorList"><div ng-repeat="(k,val) in value"><li> {{val.message}}</li></div></div>',
        scope: $scope,
      });
      //IonicClosePopupService.register(alertPopup);
    });
  }

  $scope.leftSwipe = function(){
     if ($ionicSlideBoxDelegate.slidesCount() !=1) {
    $scope.isPreviousSlide = true;
    if($ionicSlideBoxDelegate.slidesCount()-1 ==$ionicSlideBoxDelegate.currentIndex() ){
      $scope.isNextSlide = false;
    }}
  };

  $scope.rightSwipe = function(){
     if ($ionicSlideBoxDelegate.slidesCount() !=1) {
    $scope.isNextSlide = true;
    if($ionicSlideBoxDelegate.currentIndex() ==0 ){
      $scope.isPreviousSlide = false;
    }}
  };

})
