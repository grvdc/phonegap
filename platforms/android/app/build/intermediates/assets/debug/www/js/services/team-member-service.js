/**
 * Created by vpatel on 7/6/2016.
 */

app.factory('TeamMemberService', ['$http','$q','AuthenticationService',function($http,$q,AuthenticationService){
  var teamMemberService = {};

  teamMemberService.getAllMembers = function(){
    var memberData = $q.defer();
    $http.get(API_BASE_URL + '/json/all_member_list.json').success(function(member){
      memberData.resolve(member);
    }).error(function(user){
      memberData.resolve(member);
    });
    return memberData.promise;
  }

  teamMemberService.addUserToProject = function (members,projectId) {
    return $http.post(APP_BASE_URL + '/secure/user/addUserToProject?projectId='+projectId,members);
  }

  teamMemberService.getAllTeamMembers = function(projectId){
    var memberData = $q.defer();
    $http.get(APP_BASE_URL + '/secure/user/getAllUserByProject?projectId='+projectId).success(function(members){
      memberData.resolve(members);
    }).error(function(user){
      memberData.resolve(members);
    });
    return memberData.promise;
  }

  teamMemberService.getAllCompanyMemberNotInProject = function(projectId){
    var memberData = $q.defer();
    var companyId = AuthenticationService.getCompanyId();
    $http.get(APP_BASE_URL + '/secure/user/getAllCompanyMemberNotInProject?projectId='+projectId+'&companyId='+companyId ).success(function(members){
      memberData.resolve(members);
    }).error(function(user){
      memberData.resolve(members);
    });
    return memberData.promise;
  }

  teamMemberService.getMemberById = function(memberId,projectId){
    if(memberId != null && projectId !=null){
      return $http.get(APP_BASE_URL + '/secure/user/getUserById?memberId='+memberId+'&projectId='+projectId);
    }else if(memberId != null && !projectId){
      return $http.get(APP_BASE_URL + '/secure/user/getUserById?memberId='+memberId);
    }

    /* if(memberId ==1){
      return $http.get(API_BASE_URL + '/json/team_member_1.json');
    }else if(memberId != null){
      return $http.get(API_BASE_URL + '/json/team_member_2.json');
    }*/
  }

  teamMemberService.getContactRenovatorByProject = function(projectId){
      if(projectId !=null){
        return $http.get(APP_BASE_URL + '/secure/user/get-contact-renovator-of-project?projectId='+projectId);
      }
   }

  teamMemberService.saveOrUpdate = function (member) {

  return $http.post(APP_BASE_URL + '/secure/user/saveOrUpdate',member);
  }

  teamMemberService.changeExistingPassword = function(changePasswordDTO){
        return $http.post(APP_BASE_URL + '/secure/user/change-existing-password',changePasswordDTO);
  }

    teamMemberService.sendMailToEmployee = function(emailDTO,name){
          return $http.post(APP_BASE_URL + '/secure/user/send-mail-employee?userName='+name,emailDTO);
    }

   teamMemberService.deleteMember = function(memberId){
     return $http.post(APP_BASE_URL + '/secure/user/delete?userId='+memberId);
   }

  return teamMemberService;
}]);

app.filter('capitalize', function() {
    return function(input) {
      if (input !== null) {
        return input.replace(/\w\S*/g, function(txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
      }
    }
});

app.filter('mask', function () {
    var cache = {};
    var maskDefinitions = {
      '9': /\d/,
        'A': /[a-zA-Z]/,
        '*': /[a-zA-Z0-9]/
    };
    function getPlaceholderChar(i) {
      return '_';
    }
    function processRawMask(mask) {
      if (cache[mask]) return cache[mask];
      var characterCount = 0;

      var maskCaretMap = [];
      var maskPatterns = [];
      var maskPlaceholder = '';
      var minRequiredLength = 0;
      if (angular.isString(mask)) {


        var isOptional = false,
          numberOfOptionalCharacters = 0,
          splitMask = mask.split('');

        angular.forEach(splitMask, function(chr, i) {
          if (maskDefinitions[chr]) {

            maskCaretMap.push(characterCount);

            maskPlaceholder += getPlaceholderChar(i - numberOfOptionalCharacters);
            maskPatterns.push(maskDefinitions[chr]);

            characterCount++;
            if (!isOptional) {
              minRequiredLength++;
            }

            isOptional = false;
          }
          else if (chr === '?') {
            isOptional = true;
            numberOfOptionalCharacters++;
          }
          else {
            maskPlaceholder += chr;
            characterCount++;
          }
        });
      }
      // Caret position immediately following last position is valid.
      maskCaretMap.push(maskCaretMap.slice().pop() + 1);
      return cache[mask] = {maskCaretMap: maskCaretMap, maskPlaceholder: maskPlaceholder};
    }

    function maskValue(unmaskedValue, maskDef) {
      unmaskedValue = unmaskedValue || '';
      var valueMasked = '',
        maskCaretMapCopy = maskDef.maskCaretMap.slice();

      angular.forEach(maskDef.maskPlaceholder.split(''), function (chr, i) {
        if (unmaskedValue.length && i === maskCaretMapCopy[0]) {
          valueMasked += unmaskedValue.charAt(0) || '_';
          unmaskedValue = unmaskedValue.substr(1);
          maskCaretMapCopy.shift();
        }
        else {
          valueMasked += chr;
        }
      });
      return valueMasked;

    }

    return function (value, mask) {
      var maskDef = processRawMask(mask);
      var maskedValue = maskValue(value, maskDef);
      return maskedValue;
    };
  });
