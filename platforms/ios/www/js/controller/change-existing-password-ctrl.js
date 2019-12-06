/**
 * Created by vpatel on 7/4/2016.
 */
app.controller('changeExistingPasswordCtrl', function($scope,$stateParams,$state,$ionicPopup ,AuthenticationService, TeamMemberService,IonicClosePopupService) {

  $scope.changePasswordDTO = {};

  $scope.changePassword = function(){
    if(localStorage.getItem("emailId")){
      $scope.changePasswordDTO.emailId = localStorage.getItem("emailId");
    }
     $scope.changePasswordDTO.type = 'RESET';
     console.log($scope.changePasswordDTO)
       TeamMemberService.changeExistingPassword($scope.changePasswordDTO).success(function(response){
           console.log(response)
           if(response.success){
            AuthenticationService.clearCache();
            $state.go('login', {}, {reload: true});
            var confirmPopup = $ionicPopup.confirm({
                    title: 'Successful',
                    template: 'You have successfully reset your password. Please login with new password.',
                    buttons: [
                                { text: 'Ok', type: 'button-positive',
                                  onTap: function(){

                                  }
                                }
                              ]
                  });
                  IonicClosePopupService.register(confirmPopup);
           }else{
           var confirmPopup = $ionicPopup.confirm({
                    title: 'Failed!',
                    template: response.message,
                    buttons: [
                                { text: 'Ok', type: 'button-positive',
                                  onTap: function(){

                                  }
                                }
                              ]
                  });
                  IonicClosePopupService.register(confirmPopup);
           }
          }).error(function(error){
            console.log(error)
            $scope.errorList = [];

            if(error[0].oldPassword){
            $scope.errorList.push(error[0].oldPassword[0]);
            }

            if(error[0].newPassword){
            $scope.errorList.push(error[0].newPassword[0]);
            }
            if(error[0].confirmPassword){
            $scope.errorList.push(error[0].confirmPassword[0]);
            }

          //  console.log($scope.errorList)

            $ionicPopup.alert({
              title: 'Failed!',
              template: '<div ng-repeat="(k,val) in errorList" class="popup-content"><li> {{val}}</li></div>',
              scope: $scope,
            });

                     });
    }




});
