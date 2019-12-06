app.controller('memberEmailCtrl', function($scope,$window,TeamMemberService) {
    $scope.sendMail=function(){
      //  $window.open("mailto:"+ {{$scope.member.emailId}} + "?subject=" + {{$scope.emailSubject}}+"&body="+{{$scope.emailComments}},"_self");
    };
})
