/**
 * Created by vpatel on 7/4/2016.
 */
app.controller('occupantsTypeCtrl', function($scope,$ionicPopup,AuthenticationService,OccupantTypeService,$ionicModal,$rootScope,$ionicHistory ) {
  $scope.project = {};
  $scope.show = false;
  $scope.isNonCertifiedUser = false;

  $scope.allOccupants = OccupantTypeService.getAllOccupants();

  if(AuthenticationService.isNonCertifiedUser()){
    $scope.isNonCertifiedUser = true;
  }

  if(OccupantTypeService.getSelectedOccupantType() != null && OccupantTypeService.getType()!="Other"){
    $scope.occupantType = OccupantTypeService.getSelectedOccupantType();
  }else if(OccupantTypeService.getSelectedOccupantType() != null && OccupantTypeService.getType() =="Other"){
    $scope.occupantType = OccupantTypeService.getType();
    $scope.project.occupantType = OccupantTypeService.getSelectedOccupantType();
    $scope.show = true;
  }

  $scope.setSelectedOccupantType = function (occupantType) {
    $scope.project.occupantType = occupantType;
    OccupantTypeService.setSelectedOccupantType(occupantType,'Not-Other');
    $scope.show = false;
    $ionicHistory.goBack();
  }

  $scope.setOtherSelectedOccupantType = function (occupantType) {
    OccupantTypeService.setSelectedOccupantType(occupantType,'Other');
    $scope.show = true;
    $ionicHistory.goBack();
  }

  $scope.hideOtherOccupant = function () {
    $scope.show = false;
  }

  $scope.showOtherOccupant = function () {
    $scope.show = true;
  }


  $scope.openDefination = function() {
    $ionicModal.fromTemplateUrl('templates/defination-occupant-type.html', {
      scope: $scope,
      animation: 'slide-in-up',
      focusFirstInput: true
    }).then(function (modal) {
      $scope.modal = modal;
      $scope.openModal();
    });
  }


  $scope.openModal = function() {
    $scope.modal.show();
  };

  $scope.closeModal = function() {
    $scope.modal.hide();
  };


 $scope.$on('modal.hidden', function() {
    // Execute action
  });

  $scope.$on('modal.removed', function() {
    // Execute action
  });

     $scope.$on('$destroy', function() {
             offCallMeFnOccupant();
         });

  var offCallMeFnOccupant = $rootScope.$on('backButtonPressed', function (event, args) {
      if(args.message!='occupants-type'){
        return;
      }
    $ionicHistory.goBack();
      if($scope.project.occupantType != null && $scope.allOccupants.indexOf($scope.project.occupantType)== -1){
        $scope.setOtherSelectedOccupantType($scope.project.occupantType);
      }

   });
  /*$rootScope.$ionicGoBack = function() {
    $ionicHistory.goBack();
    $rootScope.notifyIonicGoingBack();
  };

  $rootScope.notifyIonicGoingBack = function() {
    if($scope.project.occupantType != null){
      $scope.setOtherSelectedOccupantType($scope.project.occupantType);
    }
  }*/

})
