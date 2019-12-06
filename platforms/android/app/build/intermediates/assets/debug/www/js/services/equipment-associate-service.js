/**
 * Created by vpatel on 7/26/2016.
 */
app.service('EquipmentAssociateService', [function() {
var equipmentAssociateService = {};
  equipmentAssociateService.equipments = [];
  equipmentAssociateService.oldEquipments = [];

  equipmentAssociateService.setEquipments = function (equipments) {
    equipmentAssociateService.equipments = equipments;
  }

  equipmentAssociateService.getEquipments = function () {
    return equipmentAssociateService.equipments;
  }

   equipmentAssociateService.setOldEquipments = function (oldEquipments) {
      equipmentAssociateService.oldEquipments = oldEquipments;
    }

    equipmentAssociateService.getOldEquipments = function () {
      return equipmentAssociateService.oldEquipments;
    }

  equipmentAssociateService.clear = function () {
    equipmentAssociateService.equipments = null;
    equipmentAssociateService.oldEquipments = null;
  }

  return equipmentAssociateService;

}])
