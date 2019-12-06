/**
 * Created by vpatel on 7/12/2016.
 */
app.factory('AreaService', ['$http','$q',function($http,$q){

  var areaService = {};
  areaService.getAllAreaOfProject = function (projectId) {
    return $http.get(API_BASE_URL + '/json/project_area.json');
  }

  areaService.saveProjectAreas = function (areaList) {
  console.log(areaList)
    return $http.post(APP_BASE_URL + '/secure/area/saveProjectAreas',areaList);
  }

    areaService.saveOrUpdate = function (area) {
      return $http.post(APP_BASE_URL + '/secure/area/saveOrUpdate',area);
    }
    areaService.getUserAssignedAreas = function (userId,projectId) {
      return $http.get(APP_BASE_URL + '/secure/area/get-all-area-by-user?userId='+userId+"&projectId="+projectId);
    }

    areaService.deleteArea = function (areaId) {
          return $http.post(APP_BASE_URL + '/secure/area/delete?projectAreaId='+areaId);
        }

  areaService.getAllAreaByProject = function (projectId) {
    // return $http.get(APP_BASE_URL + '/secure/area/getAllAreaByProject?projectId='+projectId);
    var projectAreas= $q.defer();
    $http.get(APP_BASE_URL + '/secure/area/getAllAreaByProject?projectId='+projectId).success(function(areas){
      projectAreas.resolve(areas);
    }).error(function(areas){
      projectAreas.resolve(areas);
    });
    return projectAreas.promise;
  }

  return areaService;

}])
