/**
 * Created by vpatel on 7/4/2016.
 */
app.controller('signatureCtrl', function($scope,SignatureService,$stateParams,$state) {

  if(SignatureService.getSignature() != null && SignatureService.getSkillId() != null){
    var canvas = angular.element(document.querySelector( '#canvasId' ));
    var ctx = canvas[0].getContext("2d");

    var image = new Image();
    image.onload = function() {
      ctx.drawImage(image, 0, 0);
    };
    image.src = SignatureService.getSignature();
  }

  $scope.saveSignature = function () {
    var myEl = angular.element(document.querySelector( '#canvasId' ));
    SignatureService.setSignature(myEl[0].toDataURL());
    SignatureService.setSkillId($stateParams.skillId);

    $state.go("menu.approval",{skillId:$stateParams.skillId,projectId:$stateParams.projectId});
  }

  $scope.clearSign = function(){
    var canvas = angular.element(document.querySelector( '#canvasId' ));
    var ctx = canvas[0].getContext("2d");
    ctx.clearRect(0, 0, 350, 650);
  }

})
