/**
 * Created by vpatel on 7/21/2016.
 */
app.controller('addExistingMemberCtrl',['$scope','$state','$ionicHistory','$ionicPopup','membersInfo','TeamMemberService', function($scope,$state,$ionicHistory,$ionicPopup,membersInfo,TeamMemberService ) {

  $scope.projectId = $state.params.projectId;
  $scope.membersExist = false;
  if(membersInfo != null && membersInfo.length >0){
    $scope.memberList = membersInfo;
     $scope.membersExist = true;
  }else{
    $ionicPopup.confirm({
            title: 'No Members Available',
            template: 'You have assigned all the team members to this project.',
            buttons: [
                        { text: 'OK', type: 'button button-positive  popup-button button-small custom-popup-button',
                          onTap: function(){
                            //return $state.go("");
                            return $ionicHistory.goBack();
                          }
                        }
                      ]
          });
  }


  $scope.addToProject = function () {
    if($scope.memberList){
    TeamMemberService.addUserToProject($scope.memberList,$scope.projectId ).success(function (response) {
      $state.transitionTo("menu.viewAllTeamMembers", {projectId:$scope.projectId}, {'reload': true});
    }).error(function (error) {

    });
    }
  }

}])
