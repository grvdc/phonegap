/**
 * Created by vpatel on 7/4/2016.
 */
app.controller('approvalCtrl', function($scope,$state,$ionicPopup,$stateParams,SkillCertificationService,SignatureService,skillDetail,$rootScope,$ionicHistory,IonicClosePopupService) {

  $scope.projectId = $stateParams.projectId

  if (skillDetail != null) {

    $scope.skillDetail = skillDetail;

 console.log($scope.skillDetail)
    if(SignatureService.getSignature() ==null){
      SignatureService.setSignature(skillDetail.signature);
      SignatureService.setSkillId(skillDetail.id);
    }
  }

  $scope.skillDetail.id = $stateParams.skillId;
  if(SignatureService.getSignature() != null){
    $scope.skillDetail.signature = SignatureService.getSignature();
    $scope.skillDetail.certification_date = new Date();
    $scope.skillDetail.id = SignatureService.getSkillId();
  }

  $scope.updateSkillDetail = function () {

    SkillCertificationService.updateSkillDetail($scope.skillDetail).success(function(response){
    console.log(response)
      SignatureService.clear();
      $state.go('menu.skillCertification', {projectId:$stateParams.projectId}, {reload: true});
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


  $scope.$on('$destroy', function() {
         offCallMeFnApprovalRecord();
     });

var offCallMeFnApprovalRecord=  $rootScope.$on('backButtonPressed', function (event, args) {
     if(args.message!='approval'){
        return;
      }
    $ionicHistory.goBack();
    SignatureService.clear();
    $rootScope.notifyIonicGoingBack();
   });


})
