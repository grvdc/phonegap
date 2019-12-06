app.controller('companyInfoCtrl',['$scope','$ionicPopup','$stateParams','$rootScope','$state','CompanyService','TeamMemberService','IonicClosePopupService', function($scope,$ionicPopup,$stateParams,$rootScope,$state,CompanyService,TeamMemberService,IonicClosePopupService) {
  $scope.companyDTO = {};
  $scope.companyDTO.firmName = $stateParams.firmName;
  CompanyService.checkEPARegistration().success(function(data) {
        $scope.companyDTO = data;
   });
  $ionicPopup.confirm({
          title: 'Enter Company Info',
          template: 'Please enter required company infromation here.',
          buttons: [
                      { text: 'OK', type: 'button-positive',
                        onTap: function(){
                          //return $state.go("");
                        }
                      }
                    ]
        });
       // IonicClosePopupService.register(confirmPopup);

    $scope.addCompanyInfo = function(){

        CompanyService.updateEPARegistration($scope.companyDTO).success(function(data) {
                $rootScope.projectRecord = 'add';
                $state.go("menu.projectRecord",{},{reload: true});
      }).error(function(error) {
        $scope.errorList = error.errors;
        $scope.keys = Object.keys($scope.errorList)
             $ionicPopup.alert({
               title: 'Save failed!',
               template: '<div ng-repeat="key in keys  | orderBy:\'toString()\'"><div ng-repeat="(k,val) in errorList[key]" class="popup-content"><li> {{val.message}}</li></div></div>',
               scope: $scope,
         });
         //IonicClosePopupService.register(alertPopup);
      });
    }

}])
