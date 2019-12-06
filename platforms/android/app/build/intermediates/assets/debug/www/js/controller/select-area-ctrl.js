/**
 * Created by vpatel on 7/4/2016.
 */
app.controller('selectAreaCtrl', function($scope,$state,AreaService,projectAreas,$stateParams,$ionicPopup,IonicClosePopupService,$ionicModal) {

  if(projectAreas != null && projectAreas.length >0){
  console.log(projectAreas)
  $scope.areaList =[];
  projectAreas.forEach(function(entry) {
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



  //console.log($scope.areaList);
  }

  $scope.activeClass = false;
  $scope.applyFilter = false;

  $scope.getActiveAndNonDefaultAreas= function(area){
    if(area.isActive || !area.isDefault){
      return true;
    }
    return false;
  }

  $scope.getNonActiveAndDefaultAreas= function(area){
    if(area.isActive || !area.isDefault){
      return false;
    }
    return true;
  }

  $scope.changeActiveState = function(){
    $scope.activeClass = !$scope.activeClass;
  }

  $scope.goToAddArea = function () {
    $state.go('menu.addArea', {projectId:$stateParams.projectId}, {});
  }

  $scope.goToAssignments = function () {
    $state.go('menu.assignments', {projectId:$stateParams.projectId}, {});
  }

  $scope.changActiveState = function (area){
   console.log(area)
     AreaService.saveOrUpdate(area).success(function(data) {
       $state.reload();
      })

  }

  $scope.saveOrUpdate = function (){



   console.log($scope.areaList);

   AreaService.saveProjectAreas($scope.areaList).success(function(response){
    console.log(response)
      var confirmPopup = $ionicPopup.confirm({
                       title: 'Successful',
                       template: 'You have successfully updated project areas.',
                       buttons: [
                                   { text: 'Ok', type: 'button-positive button popup-button button-small custom-popup-button',

                                   }
                                 ]
                     });
                     IonicClosePopupService.register(confirmPopup);
    }).error(function(error){

      //IonicClosePopupService.register(alertPopup);
    });




  }

  // Default Area Model
  $scope.openDefaultAreaModel = function() {

              $ionicModal.fromTemplateUrl('templates/default-area-model.html',  {
                  scope: $scope,
                  animation: 'slide-in-left',//'slide-left-right', 'slide-in-up', 'slide-right-left'
                  focusFirstInput: true
                  //backdropClickToClose: false
                }).then(function (modal) {
                  $scope.defaultAreaModal = modal;
                  $scope.openDefaultAreaModal();
                });
            }

        $scope.openDefaultAreaModal = function() {
          $scope.defaultAreaModal.show();
        };

        $scope.closeDefaultAreaModal = function() {
          $scope.defaultAreaModal.hide();
        };


})
