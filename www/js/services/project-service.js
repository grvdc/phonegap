
app.factory('ProjectService', ['$http','$q',function($http,$q){
  var projectService = {};

  projectService.getAllOccupantsWithDescription = function () {

    return $http.get(API_BASE_URL + '/json/occupants.json');
  }

  projectService.getAllAddressTypeWithDescription = function () {
      return $http.get(API_BASE_URL + '/json/address_types.json');
  }

  projectService.getAllContractTypeWithDescription = function () {
        return $http.get(API_BASE_URL + '/json/contract-types.json');
  }

  projectService.getAllCountryWithDescription = function () {
      return $http.get(API_BASE_URL + '/json/country.json');
  }

  projectService.getProjects = function(companyId){
    var projectsData= $q.defer();
    $http.get(APP_BASE_URL + '/api/secure/project/get-all-project?companyId='+companyId).success(function(projects){
      projectsData.resolve(projects);
    }).error(function(projects){
      projectsData.resolve(projects);
    });

    return projectsData.promise;
  }

  projectService.saveOrUpdate = function(project){
  console.log(project)
   return $http.post(APP_BASE_URL + '/api/secure/project/save-or-update',project);
  }

  projectService.delete = function(projectId){

    return $http.post(APP_BASE_URL + '/api/secure/project/delete?projectId='+projectId);

  }

  projectService.getProjectById = function (projectId) {

    if(projectId != null){
      return $http.get(APP_BASE_URL + '/api/secure/project/get-project-by-id?projectId='+projectId);
    }
    return null;
  }

  projectService.deleteMemberByProject = function(memberId,projectId){
    return $http.post(APP_BASE_URL + '/api/secure/project/delete-user?userId='+memberId+'&projectId='+projectId);

  }

  return projectService;
}]);
