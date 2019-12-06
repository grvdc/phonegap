app.controller('courseGameCtrl', ['$scope', '$stateParams', '$ionicPopup', '$state', 'userSkillProgressInfo','$sce','AuthenticationService', function ($scope, $stateParams, $ionicPopup, $state, userSkillProgressInfo,$sce,AuthenticationService) {
  $scope.skillName = $stateParams.skillName;



   window.addEventListener('message',function(event) {
   if(event.data == 'backtocoursework'){
    return $state.go("menu.courseWork");
   } // call function here
   },false);




  $scope.pageNo = userSkillProgressInfo.userProgress;
  $scope.skillId = userSkillProgressInfo.id;
  $scope.src = "";

  $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
 }

 $scope.src = "";

    var skillName  = $scope.skillName.replace(/ /g, "-").toLowerCase();

    $scope.pageTile = $scope.skillName;
    $scope.src = 'https://rrphelp.com/api/assets/captivate/'+skillName+'/index.html?page=' + $scope.pageNo+'&skillId='+$scope.skillId+'&baseURL='+APP_BASE_URL+'&accessToken='+AuthenticationService.getToken();

   /*
  if ($scope.skillName == 'Module 1 – Lead Based Paint Information') {
     $scope.pageTile = "Skill-1";
    $scope.src = 'quiz/quiz-1/index.html?pageNo=' + $scope.pageNo;
  } else if ($scope.skillName == 'Module 2 – Regulations') {
  $scope.pageTile = "Skill-2";
    $scope.src = 'quiz/quiz-2/index.html?pageNo=' + $scope.pageNo;
  } else if ($scope.skillName == 'Module 3 – Before Beginning Work') {
  $scope.pageTile = "Skill-3";
    $scope.src = 'quiz/quiz-3/index.html?pageNo=' + $scope.pageNo;
  } else if ($scope.skillName == 'Module 4 – Containing Dust') {
  $scope.pageTile = "Skill-4";
    $scope.src = 'quiz/quiz-4/index.html?pageNo=' + $scope.pageNo;
  } else if ($scope.skillName == 'Module 5 – During the Work') {
  $scope.pageTile = "Skill-5";
    $scope.src = 'quiz/quiz-5/index.html?pageNo=' + $scope.pageNo;
  } else if ($scope.skillName == 'Module 6 – Cleaning') {
  $scope.pageTile = "Skill-6";
    $scope.src = 'quiz/quiz-6/index.html?pageNo=' + $scope.pageNo;
  } else if ($scope.skillName == 'Module 7 – Record Keeping') {
  $scope.pageTile = "Skill-7";
    $scope.src = 'quiz/quiz-7/index.html?pageNo=' + $scope.pageNo;
  } else if ($scope.skillName == 'Module 8 – Training Non-Certified Workers') {
  $scope.pageTile = "Skill-8";
    $scope.src = 'quiz/quiz-8/index.html?pageNo=' + $scope.pageNo;
  } else {
    $ionicPopup.confirm({
      title: 'RRP Training Courses',
      template: 'Available Spring 2018',
      buttons: [
        {
          text: 'Ok', type: 'button-positive',
          onTap: function () {
            return $state.go('menu.courseWork', {}, { reload: true });
          }
        }
      ]
    });
  }
  */

}])
