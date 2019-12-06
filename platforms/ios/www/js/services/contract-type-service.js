/**
 * Created by vpatel on 7/19/2016.
 */
app.service('ContractTypeService', [function() {
  var contractTypeService = {};
  contractTypeService.contractTypeName = null;
  var data= ['Lump Sum','Cost Plus % Contract','Cost Plus % fee, not to Exceed','Design Build','Sub Contract','Insurance Agreement/Unit Pricing'];

  contractTypeService.getAllcontracts = function () {
    return data;
  }

  contractTypeService.setSelectedcontractType = function (contractType) {
    contractTypeService.contractTypeName = contractType;
  }

  contractTypeService.getSelectedcontractType = function () {
    return contractTypeService.contractTypeName;
  }

  contractTypeService.clear = function () {
    contractTypeService.contractTypeName = null;
  }

  return contractTypeService;
}]);
