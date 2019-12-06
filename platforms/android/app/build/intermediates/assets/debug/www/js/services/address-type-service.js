/**
 * Created by vpatel on 7/19/2016.
 */
app.service('AddressTypeService', [function() {
  var AddressTypeService = {};
  AddressTypeService.addressTypeName = null;
  var data= ['Single Family','Duplex','Apartment Building','Multi Family Low Rise','Multi Family High Rise','Gated Community','Planned Community','Student Housing','Public Housing'];

  AddressTypeService.getAlladdresses = function () {
    return data;
  }

  AddressTypeService.setSelectedaddressType = function (addressType) {
    AddressTypeService.addressTypeName = addressType;
  }

  AddressTypeService.getSelectedaddressType = function () {
    return AddressTypeService.addressTypeName;
  }

  AddressTypeService.clear = function () {
    AddressTypeService.addressTypeName = null;
  }

  return AddressTypeService;
}]);
