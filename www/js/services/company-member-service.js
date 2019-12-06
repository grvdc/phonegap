/**
 * Created by vpatel on 7/20/2016.
 */

app.factory('CompanyMemberService', ['$http','$q','AuthenticationService',function($http,$q,AuthenticationService) {
  var companyMemberService = {};

  companyMemberService.getAllCompanyMembers = function () {
    var memberData = $q.defer();
    var companyId = AuthenticationService.getCompanyId();
    console.log('/secure/user/getAllUserByCompany?companyId='+companyId)
    $http.get(APP_BASE_URL + '/secure/user/getAllUserByCompany?companyId='+companyId).success(function (member) {
      memberData.resolve(member);
    }).error(function (member) {
      memberData.resolve(member);
    });
    return memberData.promise;
  }


  return companyMemberService;

}]);
