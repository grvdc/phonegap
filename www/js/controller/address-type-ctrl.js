/**
 * Created by vpatel on 7/4/2016.
 */
app.controller('addressTypeCtrl', function($scope,$ionicPopup,AuthenticationService,AddressTypeService,$ionicModal,$rootScope,$ionicHistory ) {
  $scope.project = {};
  $scope.isNonCertifiedUser = false;
  $scope.alladdresses = AddressTypeService.getAlladdresses();

  if(AuthenticationService.isNonCertifiedUser()){
    $scope.isNonCertifiedUser = true;
  }

  if(AddressTypeService.getSelectedaddressType() != null){
    $scope.addressType = AddressTypeService.getSelectedaddressType();
  }

  $scope.setSelectedaddressType = function (addressType) {
    $scope.project.addressType = null;
    AddressTypeService.setSelectedaddressType(addressType);
  $ionicHistory.goBack();
  }

   $scope.openDefination = function() {
    $ionicModal.fromTemplateUrl('templates/defination-address-type.html', {
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


  $scope.$on('$destroy', function() {
   // $scope.modal ? $scope.modal.remove():null;
  });

  $scope.$on('modal.hidden', function() {
    // Execute action
  });

  $scope.$on('modal.removed', function() {
    // Execute action
  });


})
