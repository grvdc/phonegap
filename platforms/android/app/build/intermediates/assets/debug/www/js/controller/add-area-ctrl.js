/**
 * Created by vpatel on 7/4/2016.
 */

app.controller('addAreaCtrl', function($scope,$state, $compile,areas ,AreaService,$stateParams,$ionicPopup,IonicClosePopupService) {

  if(areas != null && areas.length >0){

   $scope.areaList =[];
  areas.forEach(function(entry) {
  if(entry.isActive =='true'){
    entry.isActive = true;
  }else{
   entry.isActive = false;
  }

  if(entry.isDefault =='true'){
    entry.isDefault = true;
  }else{
   entry.isDefault = false;
  }

  if(entry.internal =='1'){
    entry.internal = true;
  }else{
   entry.internal = false;
  }


 $scope.areaList.push(entry);
});
  }else{
    $scope.areaList = [];
  }

  $scope.newArea = {};

  $scope.addArea = function () {
    $scope.area = {};
    $scope.area.internal = false;
    $scope.area.isDefault = false;
    $scope.area.projectId = $stateParams.projectId;
    if($scope.newArea.areaName){
      $scope.area.areaName = $scope.newArea.areaName;
      //var myEl = angular.element( document.querySelector( '#allArea' ) );
      //var el = $compile( '<add-area-directive check-internal = "'+$scope.area.internal+'"  add-area-name="'+$scope.area.areaName+'"></add-area-directive>' )( $scope );
      //var el =$compile( '<ion-toggle ion-toggle-text toggle-class="toggle-my-theme" ng-checked ="{{area.internal}}"  class="toggle-my-theme" >'+$scope.area.areaName+ '</ion-toggle>' )( $scope );
      //myEl.append(el);
      $scope.areaList.push($scope.area);
      console.log($scope.areaList)
      $scope.newArea = {};
    }
  }

  $scope.saveOrUpdate = function () {
    AreaService.saveProjectAreas($scope.areaList).success(function(response){
      $state.go('menu.selectArea', {projectId:$stateParams.projectId}, {reload: true});
    }).error(function(error){
      $scope.errorList = error.errors;
      $ionicPopup.alert({
        title: 'Save failed!',
        template: '<div ng-repeat="(key,value) in errorList"><div ng-repeat="(k,val) in value"><li> {{val.message}}</li></div></div>',
        scope: $scope,
      });
      //IonicClosePopupService.register(alertPopup);
    });
  }

    $scope.onHoldPopup = function(area) {
        $scope.selectedArea = area;
          var confirmPopup = $ionicPopup.confirm({
            title: 'Action',
            scope: $scope,
            template: 'Do you want to Edit or Delete Area?',
            buttons: [
                        { text: 'Edit', type: 'button-positive',
                          onTap: function(){
                               $scope.data = {};
                               $scope.data.areaName = $scope.selectedArea.areaName;
                               $scope.data.id = $scope.selectedArea.id;
                               // An elaborate, custom popup
                                var myPopup = $ionicPopup.show({
                                  template: '<input type="text" ng-model="data.areaName">',
                                  title: 'Enter Area Name',
                                  scope: $scope,
                                  buttons: [
                                    { text: 'Cancel' },
                                    {
                                      text: '<b>Save</b>',
                                      type: 'button-positive',
                                      onTap: function(e) {
                                        if (!$scope.data.areaName) {
                                          //don't allow the user to close unless he enters wifi password
                                          e.preventDefault();
                                        } else {
                                          return $scope.data.areaName;
                                        }
                                      }
                                    }
                                  ]
                                });

                                myPopup.then(function(res) {
                                if(res){

                                $scope.selectedArea.areaName = res;
                                  AreaService.saveOrUpdate($scope.selectedArea).success(function(response){
                                          $state.reload();
                                        }).error(function(error){
                                        });
                                        }
                                });
                          }
                        },
                        { text: 'Delete', type: 'button-assertive',
                          onTap: function (){
                            var confirmPopup = $ionicPopup.confirm({
                                 title: 'Delete Area',
                                 template: 'Are you sure you want to delete this area?'
                               });
                                IonicClosePopupService.register(confirmPopup);

                               confirmPopup.then(function(res) {
                                 if(res && $scope.selectedArea.id) {
                                  AreaService.deleteArea($scope.selectedArea.id).success(function(response){
                                          $state.reload();
                                    }).error(function(error){
                                    });
                                 }
                               });
                         }
                        }
                      ]
          });
          IonicClosePopupService.register(confirmPopup);
        };


})
