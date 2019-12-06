app.factory('EquipmentService', ['$http',function($http){

  var equipmentService = {};
  equipmentService.getAllEquipmentOfProject = function (memberId,projectId) {
    return $http.get(APP_BASE_URL + '/api/secure/equipment/get-all-equipment?memberId='+memberId+'&projectId='+projectId);
  }


  equipmentService.saveOrUpdate = function(equipment){
  console.log(equipment);
    return $http.post(APP_BASE_URL + '/api/secure/equipment/save-or-update',equipment);
  }

    equipmentService.deleteEquipment = function(equipment){
    console.log(equipment)
      return $http.post(APP_BASE_URL + '/api/secure/equipment/delete',equipment);
    }

  return equipmentService;

}])
