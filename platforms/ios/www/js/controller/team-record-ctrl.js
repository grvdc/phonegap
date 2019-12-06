/**
 * Created by vpatel on 7/4/2016.
 */
app.controller('teamRecordCtrl', function( $scope,$rootScope,AuthenticationService,memberInfo,$ionicModal,$ionicPopup,$state,TeamMemberService,EquipmentAssociateService,$ionicHistory,$filter,IonicClosePopupService) {

   console.log($rootScope.acknowledgementDetail);

    $scope.isShowEquipment = true;
   if($state.params && $state.params.from && $state.params.from=='company' ) {
    $scope.isShowEquipment = false;
   }

  $scope.isAdmin = AuthenticationService.isAdmin();
  $scope.isDisable = false;
  $scope.member = {};

  $scope.emailDTO = {};
  $scope.memberTypes = ['CW','NCW'];


$scope.goBack = function () {

    if($state.params.projectId){
      $state.go("menu.viewAllTeamMembers",{projectId:$state.params.projectId});
      }else{
      $state.go("menu.companyMembers");
      }

  }


  $scope.$on('$ionicView.beforeEnter', function(){

  if(AuthenticationService.getType() == "OTHER" || AuthenticationService.getType()== "WORKER" || AuthenticationService.getType()== "NCW"){
  $scope.isEditableUser = false;
 }else{
 $scope.isEditableUser = true;
 }

    if($rootScope.teamRecord && $rootScope.teamRecord =='add'){
      $scope.member = {};
      $scope.selectedEquipments = null;
      EquipmentAssociateService.clear();
    }

    if($rootScope.teamRecord == 'save'){

       $scope.member.equipments = EquipmentAssociateService.getEquipments();

      $scope.selectedEquipments = $scope.checkedCount( $scope.member.equipments) + " Selected";


    }

    if($scope.member && $scope.member.equipments){

       EquipmentAssociateService.setEquipments(angular.copy($scope.member.equipments));
       EquipmentAssociateService.setOldEquipments(angular.copy($scope.member.equipments));
       $scope.selectedEquipments = $scope.checkedCount(angular.copy($scope.member.equipments))+ " Selected";


    }

  });

  //$scope.isDisable = false;
  if(memberInfo && memberInfo.data){
    $scope.member = memberInfo.data;
     console.log($scope.member);
    $scope.isUpdate = true;

  }else{
    $scope.isUpdate = false;
    $scope.member.userType = "NCW";
  }

  if($scope.isAdmin){
    $scope.isDisable = false;
   }
   else if(AuthenticationService.getType() =='SUPERVISOR' && ($scope.member.userType != "FOREMAN" && $scope.member.userType != "NCW" && $scope.member.userType != "CW" && $scope.member.userType != "OTHER" && $scope.member.userType != "WORKER")){
           $scope.isDisable = true;
    }

  else if(AuthenticationService.getType() =='FOREMAN' && ($scope.member.userType != "NCW" && $scope.member.userType != "CW" && $scope.member.userType != "OTHER" && $scope.member.userType != "WORKER")){
           $scope.isDisable = true;
    }
   else if(AuthenticationService.getType() =='CW' && ($scope.member.userType != "NCW" && $scope.member.userType != "OTHER" && $scope.member.userType != "WORKER")){
        $scope.isDisable = true;
   }






  $scope.isEditable = function (){
    if(!$scope.isUpdate){
       return false;
    }
    else if($scope.isUpdate && $scope.isAdmin){
      return false;
    }else {
      return true;
    }
  }

  // if(AuthenticationService.isNonCertifiedUser() && angular.equals($scope.member.type,"Certified Renovator")){
  /*if(AuthenticationService.isProjectManager()){
    $scope.isAddCertifiedWorker = true;
  }*/

  $scope.saveMember = function () {


    $rootScope.teamRecord = 'not-add';

    $scope.member.projectId = $state.params.projectId;
    if($rootScope.acknowledgementDetail){
    $scope.member.signature = $rootScope.acknowledgementDetail.signature;
    $scope.member.certification_date = $rootScope.acknowledgementDetail.certification_date;
    }
    $scope.member.companyId = AuthenticationService.getCompanyId();

    console.log($scope.member)
    TeamMemberService.saveOrUpdate($scope.member).success(function(response){

      EquipmentAssociateService.clear();
      if($state.params.projectId){
      $state.go("menu.viewAllTeamMembers",{projectId:$state.params.projectId});
      }else{
      $state.go("menu.companyMembers");
      }
     //$state.go("menu.viewAllTeamMembers",{projectId:$state.params.projectId});

    }).error(function(error){

      $ionicPopup.alert({
        title: 'Save failed!',
        template: 'Please try again...',

      });
    });
  }



  $scope.openEmail = function() {
    $ionicModal.fromTemplateUrl('templates/memberEmail.html', {
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

  $scope.openPhonePopup = function() {
      var mask = $filter('mask')($scope.member.cellPhone,'(999) 999-9999');
      var confirmPopup = $ionicPopup.confirm({
        title: 'Phone',
        template: 'Do you want to call '+ $scope.member.name+' on this number: '+ mask,
        buttons: [
                    { text: 'Call', type: 'button-positive',
                      onTap: function(){
                        //return $state.go("");
//                        return document.location.href = 'tel:+' + $scope.member.cellPhone;
                          return window.open('tel:'+$scope.member.cellPhone, '_system');
                      }
                    },
                    { text: 'Cancel', type: 'button-outline',
                      onTap: function(){
                        return $state.go("menu.teamRecord");
                      }
                    }
                  ]
      });
      IonicClosePopupService.register(confirmPopup);
    };

    $scope.gotoEquipmentPage = function () {
      $rootScope.teamRecord = 'not-add';
      var projectID = $state.params.projectId;
      var memberId = $state.params.memberId;
      if(!projectID || projectID== null){
        projectID = 0;
      }
      $state.go('menu.equipment',{projectId:projectID,memberId:memberId},{});
    }

   $scope.sendMail=function(){

         $scope.emailDTO.toAddress = $scope.member.emailId;


         TeamMemberService.sendMailToEmployee($scope.emailDTO,$scope.member.name).success(function(response){
             $scope.closeModal();
             }).error(function(error){
               if( error.status ==400){
               $scope.errorList = error.errors;
               $ionicPopup.alert({
                 title: 'Send Failed',
                 template: '<div ng-repeat="(key,value) in errorList"><div ng-repeat="(k,val) in value"><li> {{val.message}}</li></div></div>',
                 scope: $scope,
               });
               }
             });
      };


      $scope.$on('$destroy', function() {
             offCallMeFnTeamRecord();
         });

    var offCallMeFnTeamRecord = $rootScope.$on('backButtonPressed', function (event, args) {
      if(args.message!='team-record'){
        return;
      }
      var myform = angular.element(trForm);
      if(myform.hasClass("ng-dirty")){
        var confirmPopup = $ionicPopup.confirm({
          title: 'Confirmation',
          template: 'Discard Changes?',
          buttons: [
                      { text: 'Yes', type: 'button-positive',
                        onTap: function(){
                          $ionicHistory.goBack();
                        }
                      },
                      { text: 'No'}
                    ]
        });
        IonicClosePopupService.register(confirmPopup);
      }else {
        $ionicHistory.goBack();
      }
     });

    $scope.checkedCount = function(equipments){

      return equipments.filter(function(equipment){
        return equipment.check;
      }).length;
    }


    $scope.openMemberTypeModel = function() {
      /*if($scope.project.addressType){
          $scope.oldAddressType = angular.copy($scope.project.addressType);
      }*/

      $ionicModal.fromTemplateUrl('templates/member-type-model.html',  {
          scope: $scope,
          animation: 'slide-in-left',//'slide-left-right', 'slide-in-up', 'slide-right-left'
          focusFirstInput: true
          //backdropClickToClose: false
        }).then(function (modal) {
          $scope.memberTypeModal = modal;
          $scope.openMemberTypeModal();
        });
    }

    $scope.openMemberTypeModal = function() {
      $scope.memberTypeModal.show();
    };

    $scope.closeMemberTypeModal = function() {
      $scope.memberTypeModal.hide();
    };


})
