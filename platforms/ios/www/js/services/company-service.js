app.factory('CompanyService', ['$http','$q','AuthenticationService',function($http,$q,AuthenticationService){
    var companyService = {};

      companyService.checkEPARegistration = function(){
          return $http.post(APP_BASE_URL + '/secure/company/check-epa-and-cr-number');
       }

      companyService.updateEPARegistration = function(companyDTO){
         return $http.post(APP_BASE_URL + '/secure/company/update-epa-and-cr-number',companyDTO);
      }

    return companyService;
 }]);
