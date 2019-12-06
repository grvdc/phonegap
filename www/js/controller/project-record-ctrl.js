/**
 * Created by vpatel on 7/4/2016.
 */
app.controller('projectRecordCtrl', ['$scope', '$state', '$ionicPopup','$ionicPopover', '$rootScope','$ionicModal', 'AuthenticationService', 'ProjectService', 'projectInfo', 'OccupantTypeService', 'AddressTypeService', 'ContractTypeService', '$stateParams', '$ionicHistory','IonicClosePopupService', function($scope, $state, $ionicPopup,$ionicPopover, $rootScope,$ionicModal, AuthenticationService, ProjectService, projectInfo, OccupantTypeService, AddressTypeService, ContractTypeService, $stateParams, $ionicHistory, IonicClosePopupService) {
  $scope.project = {};



   ProjectService.getAllOccupantsWithDescription().success(function(data) {
        $scope.occupantsList = data;
   });
   ProjectService.getAllAddressTypeWithDescription().success(function(data) {
           $scope.addressTypeList = data;
   });
    ProjectService.getAllContractTypeWithDescription().success(function(data) {
              $scope.contractTypeList = data;
   });
   ProjectService.getAllCountryWithDescription().success(function(data) {
           $scope.countryList = data;
   });

  $scope.$on('$ionicView.beforeEnter', function() {
    if ($rootScope.projectRecord && $rootScope.projectRecord == 'add') {
      $scope.project = {};
          OccupantTypeService.clear();
          AddressTypeService.clear();
          ContractTypeService.clear();
    }

    if (projectInfo && projectInfo.data) {
      var temp = projectInfo.data;
      var ts = temp.pamphletDeliveryDate;
      ts = Number(ts); // cast it to a Number

      var month = new Date(ts).getUTCMonth() + 1; //months from 1-12
      var day = new Date(ts).getUTCDate();
      var year = new Date(ts).getUTCFullYear();


      temp.pamphletDeliveryDate = new Date(ts);//day+'-'+month+'-'+year; // works


      if(!OccupantTypeService.getSelectedOccupantType()){
        if (OccupantTypeService.getAllOccupants().indexOf($scope.project.occupantType) == -1) {
          OccupantTypeService.setSelectedOccupantType(temp.occupantType, 'Other')
        } else {
          OccupantTypeService.setSelectedOccupantType(temp.occupantType, 'Not-Other')
        }
      }

      if( $scope.project.addressType != null && !AddressTypeService.getSelectedaddressType()){
          AddressTypeService.setSelectedaddressType(temp.addressType);
      }
      if($scope.project.contractType != null && !ContractTypeService.getSelectedcontractType()){
        ContractTypeService.setSelectedcontractType(temp.contractType);
      }
    }
    $scope.selectedOccupantTypeOption = OccupantTypeService.getSelectedOccupantType();
    $scope.selectedAddressTypeOption = AddressTypeService.getSelectedaddressType();
    $scope.selectedContractTypeOption = ContractTypeService.getSelectedcontractType();
  });

  if (projectInfo && projectInfo.data) {
    $scope.project = projectInfo.data;


    if(AuthenticationService.getLoginMemberType() == 'ADMIN' || AuthenticationService.getLoginMemberType() == 'SUPERVISOR' || AuthenticationService.getLoginMemberType() == 'FOREMAN'){
    $scope.EditDate = true;

     if($scope.project.pamphletDeliveryDate){


     }else{
     $scope.project.pamphletDeliveryDate  = new Date();
     }
    }else{

    if(AuthenticationService.getLoginMemberType() == 'CW'){
    if($scope.project.pamphletDeliveryDate){
    $scope.EditDate = false;
    }else{
    $scope.project.pamphletDeliveryDate  = new Date();
    $scope.EditDate = true;
    }
    }else{
    $scope.EditDate = false;
    }


    }


    /* if(OccupantTypeService.getAllOccupants().indexOf($scope.project.occupantType) == -1){
       OccupantTypeService.setSelectedOccupantType($scope.project.occupantType,'Other')
     }else{
       OccupantTypeService.setSelectedOccupantType($scope.project.occupantType,'Not-Other')
     }

     if( $scope.project.addressType != null){
       AddressTypeService.setSelectedaddressType($scope.project.addressType);
     }
     if($scope.project.contractType != null){
       ContractTypeService.setSelectedcontractType($scope.project.contractType);
     }*/

  } else {

    OccupantTypeService.clear();
    AddressTypeService.clear();
    ContractTypeService.clear();

    if(AuthenticationService.getLoginMemberType() == 'ADMIN' || AuthenticationService.getLoginMemberType() == 'SUPERVISOR' || AuthenticationService.getLoginMemberType() == 'FOREMAN'){
    $scope.EditDate = true;

     if($scope.project.pamphletDeliveryDate){

     }else{
     $scope.project.pamphletDeliveryDate  = new Date();
     }
    }else{

    if(AuthenticationService.getLoginMemberType() == 'CW'){
    if($scope.project.pamphletDeliveryDate){
    $scope.EditDate = false;
    }else{
    $scope.project.pamphletDeliveryDate  = new Date();
    $scope.EditDate = true;
    }
    }else{
    $scope.EditDate = false;
    }



    }

  }

  $scope.isNonCertifiedUser = false;
   $scope.isEditable = true;
  if(AuthenticationService.getType() == "OTHER" || AuthenticationService.getType()== "WORKER" || AuthenticationService.getType()== "NCW"){
    $scope.isNonCertifiedUser = true;
    $scope.isEditable = false;
  }
  $scope.isCertifiedUser = false;
  if (AuthenticationService.isCertifiedUser()) {
    $scope.isCertifiedUser = true;
  }

  $scope.aboveSupervizerRole = true;
  var roles = AuthenticationService.getRoles();
  if (roles && (roles.indexOf(ROLE_SUPERVISOR) != -1 || roles.indexOf(ROLE_ADMIN) != -1)) {
    $scope.aboveSupervizerRole = false;
  }

  $scope.saveOrUpdate = function() {
    //$scope.project.occupantType = OccupantTypeService.getSelectedOccupantType();
    //$scope.project.addressType = AddressTypeService.getSelectedaddressType();
    //$scope.project.contractType = ContractTypeService.getSelectedcontractType();
    //$scope.project.companyId = AuthenticationService.getCompanyId();




    ProjectService.saveOrUpdate($scope.project).success(function(response) {

      $ionicHistory.goBack();

    }).error(function(error) {

      $scope.errorList = error.errors;
      $scope.keys = Object.keys($scope.errorList)
           $ionicPopup.alert({
             title: 'Save failed!',
             template: '<div ng-repeat="key in keys  | orderBy:\'toString()\'"><div ng-repeat="(k,val) in errorList[key]" class="popup-content" class="popup-content"><li> {{val.message}}</li></div></div>',
             scope: $scope,
       });
    });

  }

  $scope.gotoOccupantPage = function() {
    $rootScope.projectRecord = 'not-add';
    $state.go('menu.occupantsType');
    /*if($scope.project.occupantType != null){
      if(OccupantTypeService.getAllOccupants().indexOf($scope.project.occupantType) == -1){
        OccupantTypeService.setSelectedOccupantType($scope.project.occupantType,'Other')
      }else{
        OccupantTypeService.setSelectedOccupantType($scope.project.occupantType,'Not-Other')
      }
    }*/
  }

  $scope.gotoAddressPage = function() {
    $rootScope.projectRecord = 'not-add';
    $state.go('menu.addressType');
  }

  $scope.gotoContractPage = function() {
    $rootScope.projectRecord = 'not-add';
    $state.go('menu.contractType');
  }

  $scope.$on('$destroy', function() {
         offCallMeFnProjectRecord();
   });

    var offCallMeFnProjectRecord=  $rootScope.$on('backButtonPressed', function(event, args) {
    if (args.message != 'project-record') {
      return;
    }

    var myform = angular.element(projectRecordForm);
    if (myform.hasClass("ng-dirty")) {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Confirmation',
        template: 'Discard Changes?',
        buttons: [{
          text: 'Yes',
          type: 'button-positive',
          onTap: function() {
                          $ionicHistory.goBack();
                          OccupantTypeService.clear();
                          AddressTypeService.clear();
                          ContractTypeService.clear();
          }
        }, {
          text: 'No'
        }]
      });
      IonicClosePopupService.register(confirmPopup);
    } else {
      $ionicHistory.goBack();
    }

  });

  $scope.gotoMap = function(){

           var destination = "";
          if($scope.project.address1){
            destination = $scope.project.address1 + ', ';
              if($scope.project.address2){
                 destination= destination+ $scope.project.address2 + ', ';
              }
          }
          if($scope.project.projectName){
            $scope.project.projectName + ', ';
          }
          if($scope.project.city){
            destination= destination+ $scope.project.city + ', ';
          }
          if($scope.project.state){
                      destination= destination+ $scope.project.state + ', ';
          }
          if($scope.project.zipCode){
                      destination= destination+ ' '+$scope.project.zipCode;
          }
          $rootScope.projectRecord = 'not-add';

         $state.go("menu.map",{destination:destination,projectName:$scope.project.projectName,zipCode:$scope.project.zipCode,city:$scope.project.city,state:$scope.project.state},{});
  }

  $scope.openOccupantModel = function() {
      if($scope.project.occupantType){
          $scope.oldOccupant = angular.copy($scope.project.occupantType);
      }

      $ionicModal.fromTemplateUrl('templates/occupant-type-model.html',  {
          scope: $scope,
          animation: 'slide-in-left',//'slide-left-right', 'slide-in-up', 'slide-right-left'
          focusFirstInput: true
          //backdropClickToClose: false
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

      $scope.openAddressTypeModel = function() {
            if($scope.project.addressType){
                $scope.oldAddressType = angular.copy($scope.project.addressType);
            }

            $ionicModal.fromTemplateUrl('templates/address-type-model.html',  {
                scope: $scope,
                animation: 'slide-in-left',//'slide-left-right', 'slide-in-up', 'slide-right-left'
                focusFirstInput: true
                //backdropClickToClose: false
              }).then(function (modal) {
                $scope.addressTypeModal = modal;
                $scope.openAddressTypeModal();
              });
          }

      $scope.openAddressTypeModal = function() {
        $scope.addressTypeModal.show();
      };

      $scope.closeAddressTypeModal = function() {
        $scope.addressTypeModal.hide();
      };

      $scope.openCountryModel = function() {
            if($scope.project.country){
                $scope.oldCountry = angular.copy($scope.project.country);
            }

            $ionicModal.fromTemplateUrl('templates/country-model.html',  {
                scope: $scope,
                animation: 'slide-in-left',//'slide-left-right', 'slide-in-up', 'slide-right-left'
                focusFirstInput: true
                //backdropClickToClose: false
              }).then(function (modal) {
                $scope.countryModal = modal;
                $scope.openCountryModal1();
              });
          }

      $scope.openCountryModal1 = function() {
        $scope.countryModal.show();
      };

      $scope.closeCountryModal = function() {
        $scope.countryModal.hide();
      };


      $scope.openContractTypeModel = function() {
                  if($scope.project.contractType){
                      $scope.oldContractType = angular.copy($scope.project.contractType);
                  }

                  $ionicModal.fromTemplateUrl('templates/contract-type-model.html',  {
                      scope: $scope,
                      animation: 'slide-in-left',//'slide-left-right', 'slide-in-up', 'slide-right-left'
                      focusFirstInput: true
                      //backdropClickToClose: false
                    }).then(function (modal) {
                      $scope.contractTypeModal = modal;
                      $scope.openContractTypeModal();
                    });
                }

            $scope.openContractTypeModal = function() {
              $scope.contractTypeModal.show();
            };

            $scope.closeContractTypeModal = function() {
              $scope.contractTypeModal.hide();
            };

     // delivery type modal
     $scope.openDeliveryTypeModel = function() {
      if($scope.project.deliveryType){
          $scope.oldDeliveryType = angular.copy($scope.project.deliveryType);
      }

      $ionicModal.fromTemplateUrl('templates/delivery-type-model.html',  {
          scope: $scope,
          animation: 'slide-in-left',//'slide-left-right', 'slide-in-up', 'slide-right-left'
          focusFirstInput: true
          //backdropClickToClose: false
        }).then(function (modal) {
          $scope.deliveryTypeModal = modal;
          $scope.openDeliveryTypeModal();
        });
    }

    $scope.openDeliveryTypeModal = function() {
      $scope.deliveryTypeModal.show();
    };

    $scope.closeDeliveryTypeModal = function() {
      $scope.deliveryTypeModal.hide();
    };


     $scope.$on('modal.hidden', function() {
        // Execute action
      });

      $scope.$on('modal.removed', function() {
        // Execute action
      });

     $scope.$on('$destroy', function() {
     });

}])
