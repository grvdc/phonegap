/**
 * Created by vpatel on 7/4/2016.
 */
app.controller('contractTypeCtrl', function($scope,$ionicPopup,AuthenticationService,ContractTypeService,$ionicModal,$rootScope,$ionicHistory,$ionicPopover) {
  $scope.project = {};

  $scope.isNonCertifiedUser = false;

  $scope.allcontracts = ContractTypeService.getAllcontracts();

  if(AuthenticationService.isNonCertifiedUser()){
    $scope.isNonCertifiedUser = true;
  }

  if(ContractTypeService.getSelectedcontractType()){
    $scope.contractType = ContractTypeService.getSelectedcontractType();
  }

  $scope.setSelectedcontractType = function (contractType) {
    $scope.project.contractType = null;
    ContractTypeService.setSelectedcontractType(contractType);
    $ionicHistory.goBack();
  }

  $scope.openDefination = function() {
    $ionicModal.fromTemplateUrl('templates/defination-contract-type.html', {
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


  $ionicPopover.fromTemplateUrl('templates/popover.html', {
    scope: $scope,
  }).then(function(popover) {
    $scope.popover = popover;
  });


})
