app.controller('ncwAreaCtrl', function($scope,AreaService,$stateParams) {

  AreaService.getUserAssignedAreas($stateParams.memberId,$stateParams.projectId).success(function(data) {
    $scope.areaList = data;
  })

})
