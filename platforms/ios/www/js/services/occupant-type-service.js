/**
 * Created by vpatel on 7/19/2016.
 */
app.service('OccupantTypeService', [function() {
  var occupantTypeService = {};
  occupantTypeService.occupantTypeName = null;
  occupantTypeService.type = null;
  var data= ['Occupant','Owner is Occupant','Premise Administrator','Representative','Not occupied','Other'];

  occupantTypeService.getAllOccupants = function () {
    return data;
  }

  occupantTypeService.setSelectedOccupantType = function (occupantType,type) {
    occupantTypeService.occupantTypeName = occupantType;
    occupantTypeService.type = type;
  }

  occupantTypeService.getType = function () {
    return occupantTypeService.type;
  }

  occupantTypeService.getSelectedOccupantType = function () {
    return occupantTypeService.occupantTypeName;
  }

  occupantTypeService.clear = function () {
    occupantTypeService.occupantTypeName = null;
    occupantTypeService.type = null;
  }

  return occupantTypeService;
}]);

