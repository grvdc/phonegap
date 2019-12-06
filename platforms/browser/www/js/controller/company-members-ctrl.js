app.controller('companyMembersCtrl',['$scope','$state','$rootScope','$ionicPopup','CompanyMemberService','AuthenticationService','TeamMemberService','IonicClosePopupService', function($scope,$state,$rootScope,$ionicPopup,CompanyMemberService,AuthenticationService,TeamMemberService,IonicClosePopupService) {

  CompanyMemberService.getAllCompanyMembers().then(function (members){
    if(members.errors){
      var alertPopup = $ionicPopup.alert({
        title: 'Failed!',
        template: 'Please after some time!'
      });
      IonicClosePopupService.register(alertPopup);
    }else {

      $scope.memberList = members;

    }
  });

 $scope.$on('$ionicView.beforeEnter', function() {

 if(AuthenticationService.getType() == "OTHER" || AuthenticationService.getType()== "WORKER" || AuthenticationService.getType()== "NCW"){
  $scope.isEditable = false;
 }else{
 $scope.isEditable = true;
 }

 $scope.LoginUserType = AuthenticationService.getType();
if(AuthenticationService.getLoginMemberType() == 'SUPERVISOR'){

}
});

  $scope.showMemberLink = function(member) {
    if(AuthenticationService.isNonCertifiedUser() ){
      $state.go("menu.NCW-area",{}, {'reload': true});
    }else{
      $rootScope.teamRecord = 'not-add';
      $state.go("menu.teamRecord", {memberId:member.id,from:'company'}, {'reload': true});
    }
  };

  $scope.addNewMember = function(){
      $rootScope.teamRecord = 'add';
      $state.transitionTo("menu.teamRecord", {from: 'company'}, {'reload': true});
  }

  $scope.deleteMember = function (memberId,memberName){
  $scope.selectedMember = memberName;
   $ionicPopup.confirm({
            title: 'Remove Member',
            cssClass:'remove_member',
            template: 'Do you want to Remove '+$scope.selectedMember+' from the list?',
            buttons: [
                        { text: 'Cancel', type: 'button button-small button-outline button-stable popup-button custom-popup-button',
                            onTap: function(){
 //                              return ;
                            }
                          },{ text: 'Delete', type: 'button button-small button-royal popup-button custom-popup-button',
                          onTap: function(){
                            TeamMemberService.deleteMember(memberId).success(function(response){
                              $state.reload();
                            });
                          }
                        }

                      ]
          });

    }

    $scope.restrictDelete = function (memberId,memberName){
    $scope.selectedMember = memberName;
     $ionicPopup.confirm({
              title: 'Remove Member',
              cssClass:'remove_member',
              template: $scope.selectedMember + 'is admin, It cannot be deleted.',
              buttons: [
                          { text: 'Cancel', type: 'button button-small button-outline button-stable popup-button custom-popup-button',
                              onTap: function(){
   //                              return ;
                              }
                            }
                        ]
            });

      }

}]);
