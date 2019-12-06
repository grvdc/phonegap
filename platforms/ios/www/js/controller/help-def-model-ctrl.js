app.controller('helpDefModelController', function($scope, HelpService, $ionicPopover, $ionicScrollDelegate) {

 HelpService.getHelpCatData().success(function(data){
       $scope.helpCatList = data.categories;
       console.log($scope.helpCatList)
    })
 HelpService.getHelpData().success(function(data){
       $scope.helpQuestions = data.questions;
       console.log($scope.helpQuestions)
    })
  $scope.okHelpDefModel = function() {
    $scope.contractTypeModal.remove();
  }

  $scope.showDetail = function(question){
  console.log(question);
  document.getElementById("helpSearch").value = question.question;
  $scope.contractTypeModal.remove();
  $scope.searchITM();
  }
})
