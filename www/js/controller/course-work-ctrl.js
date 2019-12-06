
app.controller('courseWorkCtrl', function($ionicPopup,skillsData, $scope,$ionicSlideBoxDelegate,CompanyMemberService, TeamMemberService,SkillCertificationService,$state,AuthenticationService,IonicClosePopupService) {

  $scope.username = AuthenticationService.getName();

  $scope.isNextSlide = true;
  $scope.isPreviousSlide = false;
  $scope.member = {};
  $scope.colors = ["#785dc8","#ef4f4f","#00a8ff","#29d068","#fac024","#5bddc0","#785dc8","#8ec881"];


  if (skillsData != null && skillsData.length > 0) {

    $scope.skillList = skillsData;
    console.log($scope.skillList);
    if(skillsData.length ==1){
        $scope.isNextSlide = false;
    }
  }





    $scope.$on('$ionicView.beforeEnter', function() {
    //$scope.skillList = [];
    $scope.memberList =[];
    if(AuthenticationService.getLoginMemberType() == 'ADMIN'){
    $scope.adminMode = 'true';
    CompanyMemberService.getAllCompanyMembers().then(function (members){
    if(members.errors){
      var alertPopup = $ionicPopup.alert({
        title: 'Failed!',
        template: 'Please after some time!'
      });
      IonicClosePopupService.register(alertPopup);
    }else {

      members.forEach(function(memberInfo) {

      SkillCertificationService.getSkillByUserId(memberInfo.id).then(function (skill){
      if(skill.errors){
       console.log(skill.errors);
      }else {
     // $scope.skillList.push(skill);

      }
    });

      });


      //$scope.memberList = members;




    }
  });

  }

  if(AuthenticationService.getLoginMemberType() == 'SUPERVISOR'){
    $scope.adminMode = 'true';
    CompanyMemberService.getAllCompanyMembers().then(function (members){
    if(members.errors){
      var alertPopup = $ionicPopup.alert({
        title: 'Failed!',
        template: 'Please after some time!'
      });
      IonicClosePopupService.register(alertPopup);
    }else {

     $scope.memberList =[];
     members.forEach(function( member){
    if(member.userType == 'FOREMAN' || member.userType == 'CW' || member.userType == 'NCW'){
      $scope.memberList.push(member)
     }
    });

    if($scope.memberList[1]){
       $scope.nextUserId = $scope.memberList[1]['id'];
       $scope.activeUser = 0;
    }
    if($scope.memberList[0]){
      getFirstSkills($scope.memberList[0]['id'])
      }

    }
  });

  }

  if(AuthenticationService.getLoginMemberType() == 'FOREMAN'){
    $scope.adminMode = 'true';
    CompanyMemberService.getAllCompanyMembers().then(function (members){
    if(members.errors){
      var alertPopup = $ionicPopup.alert({
        title: 'Failed!',
        template: 'Please after some time!'
      });
      IonicClosePopupService.register(alertPopup);
    }else {

     $scope.memberList =[];
     members.forEach(function( member){
    if( member.userType == 'CW' || member.userType == 'NCW'){
    $scope.memberList.push(member)
     }
    });
    if($scope.memberList[1]){
       $scope.nextUserId = $scope.memberList[1]['id'];
       $scope.activeUser = 0;
      }
      if($scope.memberList[0]){
      getFirstSkills($scope.memberList[0]['id'])
      }

    }
  });

  }

  if(AuthenticationService.getLoginMemberType() == 'CW'){
    CompanyMemberService.getAllCompanyMembers().then(function (members){
    if(members.errors){
      var alertPopup = $ionicPopup.alert({
        title: 'Failed!',
        template: 'Please after some time!'
      });
      IonicClosePopupService.register(alertPopup);
    }else {

    $scope.memberList =[];
    members.forEach(function( member){
    if(member.userType == 'NCW'){
    $scope.memberList.push(member)
    }
    });

      if($scope.memberList[1]){
       $scope.nextUserId = $scope.memberList[1]['id'];
       $scope.activeUser = 0;
      }
      if($scope.memberList[0]){
      getFirstSkills($scope.memberList[0]['id'])
      }

    }
  });

  }

  if(AuthenticationService.getLoginMemberType() == 'NCW' || AuthenticationService.getLoginMemberType() == 'OTHER' || AuthenticationService.getLoginMemberType() == 'WORKER'){
  $scope.memberList =false;
  SkillCertificationService.getSkillByMemberId().then(function (skill){
      if(skill.errors){
        var alertPopup = $ionicPopup.alert({
          title: 'Failed!',
          template: 'Please after some time!'
        });
        IonicClosePopupService.register(alertPopup);
      }else {
        $scope.skills = skill;
      }
    });

    }

});




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



    $scope.openCourseGame = function(skillName,skillId){

     //var skillName  = skillName.replace(/ /g, "-").toLowerCase();
    ///$scope.src = 'https://rrphelp.com/api/assets/captivate/'+skillName+'/index.html?page=1&baseURL='+APP_BASE_URL+'&accessToken='+AuthenticationService.getToken();
   //window.open($scope.src,'_system','fullscreen=yes,location=no,menubar=no,titlebar=no,toolbar=no,status=no')
      return $state.go("menu.courseGame",{skillName:skillName,skillId:skillId});
    }
})
