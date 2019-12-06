/**
 * Created by vpatel on 7/13/2016.
 */
app.controller('menuCtrl',['$rootScope','$scope',"$state",'AuthenticationService','$ionicHistory', '$ionicPopup',function($rootScope,$scope,$state,AuthenticationService,$ionicHistory,$ionicPopup) {




  $scope.$on('$ionicView.beforeEnter', function() {
  $scope.username = AuthenticationService.getName();
  $scope.usertype = AuthenticationService.getType();

  $scope.nonCertifiedWorker = AuthenticationService.isNonCertifiedUser();
  $scope.isVisible = true;
    if(AuthenticationService.isNonCertifiedUser()){
     $scope.isVisible = true;
    }

  });

  $scope.logout = function(click){
    AuthenticationService.clearCache();
//    window.location.reload();
    $state.go('login', {}, {reload: true});

    //window.location.reload();
  }

  $rootScope.$ionicGoBack = function() {
    if($state.current.name=="menu.teamRecord"){
      $rootScope.$emit('backButtonPressed', { message: 'team-record' });
    }else if($state.current.name=="menu.projectRecord"){
      $rootScope.$emit('backButtonPressed', { message: 'project-record' });
    }else if($state.current.name=="menu.occupantsType"){
      $rootScope.$emit('backButtonPressed', { message: 'occupants-type' });
    }
    else if($state.current.name=="menu.approval"){
          $rootScope.$emit('backButtonPressed', { message: 'approval' });
        }
        else if($state.current.name=="menu.equipment"){
              $rootScope.$emit('backButtonPressed', { message: 'equipment-type' });
            } else{
      $ionicHistory.goBack();
    }
    // if($state.current.name=="menu.teamRecord"){
    //   alert($scope.trForm.$dirty);
    //         var confirmPopup = $ionicPopup.confirm({
    //         title: 'Confirmation',
    //         template: 'Discard Changes?',
    //         buttons: [
    //                     { text: 'Yes', type: 'button-positive',
    //                       onTap: function(){
    //                       $ionicHistory.goBack();
    //                       }
    //                     },
    //                     { text: 'No'
    //                     }
    //                   ]
    //       });
    //
    //     //};
    // }else{
    //   alert("else");
    //   $ionicHistory.goBack();
    // }


  };


}])
