/**
 * Created by vpatel on 7/4/2016.
 */
app.controller('eqpsignatureCtrl', function($rootScope,$scope,SignatureService,$stateParams,$state) {


if($rootScope.acknowledgementDetail.signature){
var canvas = angular.element(document.querySelector( '#canvasId' ));
    var ctx = canvas[0].getContext("2d");

    var image = new Image();
    image.onload = function() {
      ctx.drawImage(image, 0, 0);
    };
    image.src = $rootScope.acknowledgementDetail.signature;
}


  $scope.saveSignature = function () {
    var myEl = angular.element(document.querySelector( '#canvasId' ));
    SignatureService.setSignature(myEl[0].toDataURL());
    SignatureService.setProjectId($stateParams.projectId);


    $state.go("menu.acknowledgement",{memberId:$stateParams.memberId,projectId:$stateParams.projectId});
  }

  $scope.clearSign = function(){
    var canvas = angular.element(document.querySelector( '#canvasId' ));
    var ctx = canvas[0].getContext("2d");
    ctx.clearRect(0, 0, 350, 650);
  }

})
