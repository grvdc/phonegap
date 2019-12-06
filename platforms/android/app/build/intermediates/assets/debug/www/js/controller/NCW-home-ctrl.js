app.controller('ncwHomeCtrl', function($scope,$state,$rootScope,$ionicSideMenuDelegate,ProjectService,AuthenticationService,TeamMemberService,$filter,$ionicPopup,IonicClosePopupService) {



   $scope.$parent.isVisible =false;
   //$scope.callRenovator = callRenovator;
   $scope.$on('$ionicView.beforeEnter', function(){
      $ionicSideMenuDelegate.canDragContent(false);
       $scope.$parent.isVisible =false;
     });
  $scope.logout = function(click){
    AuthenticationService.clearCache();
    $state.go('login', {}, {reload: true});
  }

  $scope.getAllTeamMembers = function(){
      $scope.project = $rootScope.selectedproject;
      $state.go("menu.viewAllTeamMembers",{projectId:$scope.project.id},{});
  }

  $scope.showContactRenovator = function(){
     $scope.project = $rootScope.selectedproject;

     TeamMemberService.getContactRenovatorByProject($scope.project.id).success(function(response){
          $scope.renovatorNumber = response.cellPhone;
          $scope.renovatorName = response.name;

          var mask = $filter('mask')($scope.renovatorNumber,'(999) 999-9999');
          var confirmPopup = $ionicPopup.confirm({
            title: 'Phone',
            template: 'Do you want to call '+ $scope.renovatorName+' on this number: '+ mask,
            buttons: [
                        { text: 'Call', type: 'button-positive',
                          onTap: function(){
                            //return $state.go("");
    //                        return document.location.href = 'tel:+' + $scope.member.cellPhone;
                              return window.open('tel:'+$scope.renovatorNumber, '_system');
                          }
                        },
                        { text: 'Cancel', type: 'button-outline',
                          onTap: function(){
                            return $state.go("menu.NCW-home");
                          }
                        }
                      ]
          });
          IonicClosePopupService.register(confirmPopup);

      }).error(function(error){
          console.log('Fail callRenovator');
      });
   }

})
