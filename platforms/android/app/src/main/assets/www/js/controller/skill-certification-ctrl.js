/**
 * Created by vpatel on 7/4/2016.
 */

app.controller('skillCertificationCtrl', function ($scope, $state, $ionicSlideBoxDelegate, TeamMemberService, SkillCertificationService, skillsData,$ionicPopup,ProjectService, $ionicHistory) {

  $scope.isNextSlide = true;
  $scope.isPreviousSlide = false;
  $scope.member = {};
  $scope.colors = ["#785dc8","#ef4f4f","#00a8ff","#29d068","#fac024","#5bddc0","#785dc8","#8ec881"];

  $scope.projectId = $state.params.projectId;
  if (skillsData != null && skillsData.length > 0) {
  console.log(skillsData);
    //$scope.originalList = skillsData;
    $scope.skillList = skillsData;
    if(skillsData.length ==1){
        $scope.isNextSlide = false;
    }
  }

  if ($scope.skillList == null) {
      var alertPopup = $ionicPopup.confirm({
        title: 'No NCW Entries',
        template: 'Currently there are no NCW assigned to this project',
        buttons: [
                    { text: 'OK', type: 'button-positive',
                      onTap: function(){
                        //return $state.go("");
                        return $ionicHistory.goBack();
                      }
                    }
                  ]
      });
  }

  $scope.approval = function (skillInfo) {
    $state.go("menu.approval",{projectId:projectId}, {'reload': true});
  }

  $scope.sendMail = function (skill, skillInfo) {
    var skillId = skillInfo.id;
    var userId = skill.userId;

    $scope.userName =  skill.userName;
    $scope.skillName =  skillInfo.skillDetail.name;

    SkillCertificationService.sendMail(skillId, userId).success(function (response) {
    console.log(response)
      $ionicPopup.alert({
        title: 'Success',
        template: $scope.skillName + ' has been assigned to ' + $scope.userName,
        scope: $scope,
        buttons: [
          {
            text: 'Ok', type: 'button-positive button popup-button button-small custom-popup-button',
          }
       ]
      });
    }).error(function (error) {
      $scope.errorList = error.errors;
      $ionicPopup.alert({
        title: 'Failure',
        template: 'Woops..We were not able to assign the skill. Please try again later',
        scope: $scope,
      })
    })
  }

  /*TeamMemberService.getAllMembers().then(function (members){
   if(members.errors){
   var alertPopup = $ionicPopup.alert({
   title: 'Failed!',
   template: 'Please after some time!'
   });
   }else {
   $scope.memberList = members;
   $scope.disableSwipe();
   $scope.getSkillsByMember($scope.memberList);
   }
   });*/

  $scope.nextSlide = function () {

    $ionicSlideBoxDelegate.next();
    $scope.isPreviousSlide = true;
    if ($ionicSlideBoxDelegate.slidesCount() - 1 == $ionicSlideBoxDelegate.currentIndex()) {
      $scope.isNextSlide = false;
    }
    //$scope.getSkillsByMember();
  }

  $scope.previousSlide = function () {
    $scope.isNextSlide = true;
    $ionicSlideBoxDelegate.previous();
    if ($ionicSlideBoxDelegate.currentIndex() == 0) {
      $scope.isPreviousSlide = false;
    }
    //$scope.getSkillsByMember();
  }

  $scope.disableSwipe = function () {
    $ionicSlideBoxDelegate.enableSlide(false);
    $ionicSlideBoxDelegate.update();
  };

    var colors = ["#387ef5","#11c1f3","#33cd5f","#ef473a","#387ef5","#11c1f3","#33cd5f","#ef473a","#387ef5","#11c1f3","#33cd5f","#ef473a"];

    $scope.getRandomColor = function (index) {

        return {
            borderLeft: '3px solid ' + colors[index]
        }
    };
    $scope.getRandomLabel = function (index) {

        return {
            color: colors[index]
        }
    };

  /*$scope.getSkillsByMember = function () {
   SkillCertificationService.getSkillByMemberId(1).then(function (skills){
   if(skills.errors){
   var alertPopup = $ionicPopup.alert({
   title: 'Failed!',
   template: 'Please after some time!'
   });
   }else {
   $scope.skills = skills;
   }
   });
   }*/

    $scope.leftSwipe = function(){
     if ($ionicSlideBoxDelegate.slidesCount() !=1) {
      $scope.isPreviousSlide = true;
             if($ionicSlideBoxDelegate.slidesCount()-1 ==$ionicSlideBoxDelegate.currentIndex() ){
               $scope.isNextSlide = false;
             }
     }

     };

     $scope.rightSwipe = function(){
        if ($ionicSlideBoxDelegate.slidesCount() !=1) {
       $scope.isNextSlide = true;
       if($ionicSlideBoxDelegate.currentIndex() ==0 ){
         $scope.isPreviousSlide = false;
       }
       }
     };

})
