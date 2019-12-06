/**
 * Created by vpatel on 7/21/2016.
 */
app.factory('AssignmentService', ['$http','$q',function($http,$q) {
  var assignmentService = {};

  assignmentService.getAssignmentsByProjectId = function (projectId) {
    var assignmentData= $q.defer();
    $http.get(APP_BASE_URL + '/secure/assignment/getAssignmentsByProjectId?projectId='+projectId).success(function(assignment){
      assignmentData.resolve(assignment);
    }).error(function(areas){
      assignmentData.resolve(assignment);
    });
    return assignmentData.promise;
  }

  assignmentService.saveAssignments = function (assignmentList) {
  console.log(assignmentList)
    return $http.post(APP_BASE_URL + '/secure/assignment/saveAssignments',assignmentList);
  }

  return assignmentService;
}])
