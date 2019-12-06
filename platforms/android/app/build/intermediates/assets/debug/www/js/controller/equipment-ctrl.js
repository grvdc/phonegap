app.controller('equipmentCtrl', function($scope, $compile, $stateParams, $state, $ionicPopup, $ionicHistory, $rootScope, EquipmentService, equipments, EquipmentAssociateService, IonicClosePopupService) {

  $scope.equipment = {};
  $scope.openFiler = false;
  $scope.equipmentList = [];
  if (equipments && equipments.data) {
    var equi = equipments.data;
    $scope.equipmentList = (equi);
    $scope.masterequipmentList = (equi);

  }

$scope.memberId = $stateParams.memberId;
$scope.projectId = $stateParams.projectId;
  console.log($scope.equipmentList)

 $scope.goToAddSignature = function(){
    $rootScope.teamRecord = 'save';
    console.log($scope.equipmentList)
    EquipmentAssociateService.setEquipments($scope.equipmentList);
    EquipmentAssociateService.setOldEquipments(angular.copy($scope.equipmentList));
    $state.go("menu.acknowledgement",{memberId:$stateParams.memberId,projectId:$stateParams.projectId});
 }


 $scope.addformShow = false;
  $scope.addNew = function(){
  $scope.openFiler = false;
  $scope.addformShow = !$scope.addformShow;

  }



  $scope.equipmentsTab = 'active';
  $scope.materialsTab = '';
  $scope.showEquipments = true;
  $scope.selectTab = function(tab) {
  if(tab == 'equipments'){
  $scope.equipmentsTab = 'active';
  $scope.materialsTab = '';
  $scope.showEquipments = true;
  }else{
  $scope.equipmentsTab = '';
  $scope.materialsTab = 'active';
  $scope.showEquipments = false;
  }

  }


  $scope.filterEquipments = function(equipments){

      return equipments.filter(function(equipment){

      if($scope.filterOption ==1){
        if(equipment.projectId < 1){
         return equipment;
        }
      }

      if($scope.filterOption ==2){
        if(equipment.projectId > 0){
         return equipment;
        }
      }

      if($scope.filterOption ==3){
       if(equipment.projectId > 0){
         return equipment;
        }
      }

      if($scope.filterOption ==4){
        if(equipment.check){
         return equipment;
        }
      }

      if($scope.filterOption ==5){
        if(equipment.projectId < 1){
         return equipment;
        }
      }

      if($scope.filterOption ==6){
        if(equipment.projectId == $stateParams.projectId){
         return equipment;
        }
      }


      });
    }


  $scope.openFilerOption = function() {
    $scope.openFiler = !$scope.openFiler;
    $scope.addformShow = false;
  }
  $scope.updateFilterOption = function(filterId) {
    $scope.filterOption = filterId;
    $scope.equipmentList = $scope.filterEquipments($scope.masterequipmentList);
  }


  $scope.ResetFilerOption = function(){
    $scope.openFiler = false;
   //console.log( $scope.filterOption)
  // $scope.equipmentList = $scope.filterEquipments($scope.masterequipmentList);

  }
  $scope.addEquipment = function() {
    if ($scope.equipment.equipmentName) {
      // $scope.equipment.equipmentName= $scope.equipment.equipmentName;
      $scope.equipment.projectId = $stateParams.projectId;
      if($scope.showEquipments){
      $scope.equipment.type = 'equipment';
      }else{
      $scope.equipment.type = 'material';
      }

      EquipmentService.saveOrUpdate($scope.equipment).success(function(response) {

        $scope.equipmentList.push(response);
        $state.reload();
      }).error(function(error) {
        console.log(error)
        $ionicPopup.alert({
          title: 'Save failed!',
          template: error,
          scope: $scope,
        });
        //IonicClosePopupService.register(alertPopup);
      });

    }
  }


  $scope.$on('$destroy', function() {
    offCallMeFnEquipmentRecord();
  });
  var offCallMeFnEquipmentRecord = $rootScope.$on('backButtonPressed', function(event, args) {
    if (args.message != 'equipment-type') {
      return;
    }
    var equipmnt = EquipmentAssociateService.getOldEquipments();
    $scope.isDirty = false;
    if (equipmnt && (equipmnt.length != $scope.equipmentList.length)) {
      $scope.isDirty = true;
    } else {
      angular.forEach(equipmnt, function(value1, key1) {
        angular.forEach($scope.equipmentList, function(value2, key2) {
          if (value1.id === value2.id && value1.check != value2.check) {
            $scope.isDirty = true;
          }
        });
      });
    }
    if ($scope.isDirty) {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Confirmation',
        template: 'Discard Changes?',
        buttons: [{
          text: 'Yes',
          type: 'button-positive',
          onTap: function() {
            $rootScope.teamRecord = 'back';
            $ionicHistory.goBack();
          }
        }, {
          text: 'No'
        }]
      });
    } else {
      $rootScope.teamRecord = 'back';
      $ionicHistory.goBack();
    }



  });









  $scope.goToTeamRecord = function() {
    $rootScope.teamRecord = 'save';
    console.log($scope.equipmentList)
    EquipmentAssociateService.setEquipments($scope.equipmentList);
    EquipmentAssociateService.setOldEquipments(angular.copy($scope.equipmentList));
    $ionicHistory.goBack();
  }

  $scope.onHoldPopup = function(equipment, index) {
    $scope.selectedEquipment = equipment;
    console.log($scope.selectedEquipment)
    var confirmPopup = $ionicPopup.confirm({
      title: 'Action',
      scope: $scope,
      template: 'Do you want to Edit or Delete Equipment?',
      buttons: [{
        text: 'Edit',
        type: 'button-positive',
        onTap: function() {
          $scope.data = {};
          $scope.data.equipmentName = $scope.selectedEquipment.equipmentName;
          $scope.data.id = $scope.selectedEquipment.id;
          // An elaborate, custom popup
          var myPopup = $ionicPopup.show({
            template: '<input type="text" ng-model="data.equipmentName">',
            title: 'Enter Equipment Name',
            scope: $scope,
            buttons: [{
              text: 'Cancel'
            }, {
              text: '<b>Save</b>',
              type: 'button-positive',
              onTap: function(e) {
                if (!$scope.data.equipmentName) {
                  //don't allow the user to close unless he enters wifi password
                  e.preventDefault();
                } else {
                  return $scope.data.equipmentName;
                }
              }
            }]
          });

          myPopup.then(function(res) {
            if (res) {

              $scope.selectedEquipment.equipmentName = res;
              EquipmentService.saveOrUpdate($scope.selectedEquipment).success(function(response) {
                //  $scope.equipmentList.push(response);
                $state.reload();
              }).error(function(error) {});
            }
          });
        }
      }, {
        text: 'Delete',
        type: 'button-assertive',
        onTap: function() {
          var confirmPopup = $ionicPopup.confirm({
            title: 'Delete Equipment',
            template: 'Are you sure you want to delete this equipment?'
          });
          IonicClosePopupService.register(confirmPopup);

          confirmPopup.then(function(res) {
            if (res && $scope.selectedEquipment.projectId) {
              EquipmentService.deleteEquipment($scope.selectedEquipment).success(function(response) {
              console.log(response)
                var delete_equipment = $scope.equipmentList.indexOf(index);
                $scope.equipmentList.splice(delete_equipment, 1);
                $state.reload();
              }).error(function(error) {});
            } else if(res && !$scope.selectedEquipment.projectId) {

              $ionicPopup.alert({
                title: 'Default equipment can not be deleted',
                template: 'You cannot delete this equipment because this is created by System Administrator.'
              });
              //IonicClosePopupService.register(alertPopup);
            }
          });
        }
      }]
    });
    IonicClosePopupService.register(confirmPopup);
  };
})
