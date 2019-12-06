/**
 * Created by vpatel on 7/4/2016.
 */
app.controller('projectCtrl', function($scope,$ionicPopup,$state,$stateParams,projectInfo,AuthenticationService,ProjectService, OccupantTypeService, AddressTypeService, ContractTypeService,IonicClosePopupService) {

  $scope.projectId = $stateParams.projectId;
  $scope.project = {};
  if(projectInfo && projectInfo.data){
    $scope.project = projectInfo.data;

  }

  $scope.showDeleteProjectPopup = function() {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Delete',
        template: 'Do you want to delete this project?',
        cssClass:'remove_project',
        buttons: [
                    { text: 'Cancel', type: 'button button-small button-outline button-stable popup-button custom-popup-button',
                      onTap: function(){
                        return $state.go("menu.project");
                      }
                    },
                    { text: 'Delete', type: 'button button-small button-royal popup-button custom-popup-button',
                      onTap: function(){
                      ProjectService.delete($scope.projectId).success(function(response){

                            $state.go('menu.projectList', {}, {reload: true});
                            //return $state.go("menu.projectList");
                          }).error(function(error){
                            $ionicPopup.alert({
                              title: 'Delete failed!',
                              template: '<div ng-repeat="(key,value) in errorList"><div ng-repeat="(k,val) in value"><li> {{val.message}}</li></div></div>',
                              scope: $scope
                            });
                            //IonicClosePopupService.register(alertPopup);
                          });


                      }
                    }
                  ]
      });
      IonicClosePopupService.register(confirmPopup);
    };

  var roles = AuthenticationService.getRoles();

  $scope.isDeleteButtonShow = true;
  if(roles && roles.split(',').length==2){
    //$scope.isDeleteButtonShow = false;
  }

  $scope.goToProjectRecordPage = function(projectId){
                      OccupantTypeService.clear();
                      AddressTypeService.clear();
                      ContractTypeService.clear();
    $state.go("menu.projectRecord",{projectId:projectId}, {'reload': true});
  }

  $scope.goToTeamMembersPage = function(projectId){
    $state.go("menu.viewAllTeamMembers",{projectId:projectId}, {'reload': true});
  }

  $scope.goToSelectAreaPage = function(projectId){
    $state.go("menu.selectArea",{projectId:projectId}, {'reload': true});
  }

  $scope.goToSkillCertificationPage = function(projectId){
    $state.go("menu.skillCertification",{projectId:projectId}, {'reload': true});
  }

})
