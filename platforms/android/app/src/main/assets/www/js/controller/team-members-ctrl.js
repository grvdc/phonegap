/**
 * Created by vpatel on 7/4/2016.
 */
app.controller('teamMembersCtrl', function($scope,$rootScope,TeamMemberService,ProjectService,$ionicPopup,$state,$filter,AuthenticationService,allTeamMemberInfo,IonicClosePopupService) {

  $scope.projectId = $state.params.projectId;
  if(allTeamMemberInfo != null && allTeamMemberInfo.length >0){
    $scope.originalList = allTeamMemberInfo;
    $scope.memberList = allTeamMemberInfo;
  }

  $scope.$on('$ionicView.beforeEnter', function() {
  
  if(AuthenticationService.getType() == "OTHER" || AuthenticationService.getType()== "WORKER" || AuthenticationService.getType()== "NCW"){
  $scope.isEditable = false;
 }else{
 $scope.isEditable = true;
 }
 
 
 $scope.LoginUserType = AuthenticationService.getType();

});

  /*TeamMemberService.getAllMembers().then(function (members){
    if(members.errors){
      var alertPopup = $ionicPopup.alert({
        title: 'Failed!',
        template: 'Please after some time!'
      });
    }else {
      $scope.originalList = members;
      $scope.memberList = members;
    }
  });*/

  $scope.showMemberPopup = function() {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Project Members',
        template: 'Do you want to add a new Team Member to the project or add from existing Members ?',
        buttons: [
                    { text: 'Add New', type: 'button button-outline button-stable popup-button popup-button button-small custom-popup-button',
                      onTap: function(){
                        $rootScope.teamRecord = 'add';
                        $state.transitionTo("menu.teamRecord", {projectId:$scope.projectId}, {'reload': true});
                      }
                    },
                    { text: 'Existing', type: 'button button-positive popup-button button-small custom-popup-button',
                      onTap: function(){

                        // return $state.go("menu.addExistingMember");
                        $state.transitionTo("menu.addExistingMember",{projectId:$scope.projectId}, {'reload': true});
                      }
                    }
                  ]
      });
      IonicClosePopupService.register(confirmPopup);
    };

    $scope.showMemberLink = function(member) {
      if(AuthenticationService.isNonCertifiedUser() ){
        $state.transitionTo("menu.NCW-area",{memberId:member.id,projectId:$scope.projectId}, {'reload': true});
      }else{
        $rootScope.teamRecord = 'not-add';
        $state.transitionTo("menu.teamRecord", {memberId:member.id,projectId:$scope.projectId}, {'reload': true});
      }
    };

    $scope.deleteMemberByProject = function (memberName,memberId,projectId){
    $scope.selectedMember = memberName;

     var confirmPopup = $ionicPopup.confirm({
              title: 'Confirm',

              template: 'Do you want to delete the member '+$scope.selectedMember+' for this project ?',
              buttons: [
                          { text: 'Cancel', type: 'button button-small button-outline button-stable popup-button custom-popup-button',
                              onTap: function(){
   //                              return ;
                              }
                            },{ text: 'OK', type: 'button button-small button-royal popup-button custom-popup-button',
                            onTap: function(){
                              ProjectService.deleteMemberByProject(memberId,projectId).success(function(response){
                                $state.reload();
                              });
                            }
                          }

                        ]
            });
            IonicClosePopupService.register(confirmPopup);
      }


})
