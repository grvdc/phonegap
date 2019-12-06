/**
 * Created by vpatel on 7/4/2016.
 */
app.controller('changePasswordCtrl', function($scope,$stateParams,$state,$ionicPopup,ChangePasswordService,IonicClosePopupService) {

  $scope.changePasswordDTO = {};
  $scope.cancle = function(){

     $state.go('login', {}, {reload: true});
  }

  $scope.changePassword = function(){
    if($stateParams.emailId){
      $scope.changePasswordDTO.emailId = $stateParams.emailId;
      $scope.changePasswordDTO.type = 'FORGOT';
      console.log($scope.changePasswordDTO);
       ChangePasswordService.forgotPasswordnew($scope.changePasswordDTO).success(function(response){
            console.log(response);
            if(response.success){
            $state.go('login', {}, {reload: true});
            var confirmPopup = $ionicPopup.confirm({
                    title: 'SuccessFul',
                    template: 'Your password is successfully reset. Please login with new password.',
                    buttons: [
                                { text: 'Ok', type: 'button-positive',
                                  onTap: function(){
                                   $state.go('login', {}, {reload: true});
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

            $scope.errorList = [];
            if(error[0].temporaryCode){
            $scope.errorList.push(error[0].temporaryCode[0]);
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
            //IonicClosePopupService.register(alertPopup);
          });
    }

  }


});
