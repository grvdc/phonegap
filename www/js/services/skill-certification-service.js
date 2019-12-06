/**
 * Created by vpatel on 7/13/2016.
 */
app.factory('SkillCertificationService', ['$http','$q',function($http,$q){
  var skillCertificationService = {};

  skillCertificationService.getSkillByMemberId = function() {

    var skillsData = $q.defer();
    $http.get(APP_BASE_URL + '/secure/skill/get-skill-by-member').success(function(skills){
      skillsData.resolve(skills);
    }).error(function(skills){
      skillsData.resolve(skills);
    });
    return skillsData.promise;

  }
 /*Get skils by MemberID*/
  skillCertificationService.getSkillByUserId = function(userId){
    var skillsData = $q.defer();
    $http.get(APP_BASE_URL + '/secure/skill/get-skill-by-user?userId='+userId).success(function(skills){
      skillsData.resolve(skills);
    }).error(function(skills){
      skillsData.resolve(skills);
    });
    return skillsData.promise;
  }


    skillCertificationService.getSkillsByProjectId = function(projectId){
    var skillsData = $q.defer();
    $http.get(APP_BASE_URL + '/secure/skill/getSkillsByProjectId?projectId='+projectId).success(function(skills){
      skillsData.resolve(skills);
    }).error(function(skills){
      skillsData.resolve(skills);
    });
    return skillsData.promise;
  }

  skillCertificationService.getSkillsByCompanyId = function(){
    var skillsData = $q.defer();

    $http.get(APP_BASE_URL + '/secure/skill/getSkillsByProjectId').success(function(skills){

      skillsData.resolve(skills);
    }).error(function(skills){
      skillsData.resolve(skills);
    });
    return skillsData.promise;
  }


  skillCertificationService.sendMail = function(skillId,userId){
    return $http.get(APP_BASE_URL + '/secure/skill/sendMail?userId='+userId+'&skillId='+skillId);
  }

  skillCertificationService.updateSkillDetail = function (skillDetailDTO) {
  console.log(skillDetailDTO)
    return $http.post(APP_BASE_URL + '/secure/skill/updateSkillDetail',skillDetailDTO);
  }

  skillCertificationService.addScoreInSkill = function (skillDetailDTO) {
      return $http.post(APP_BASE_URL + '/secure/skill/add-score-by-id',skillDetailDTO);
  }

  skillCertificationService.getSkillsById = function (skillId) {

    var skillData = $q.defer();
    $http.get(APP_BASE_URL + '/secure/skill/getSkillsById?skillId='+skillId).success(function(skill){

      skillData.resolve(skill);
    }).error(function(skill){
     console.log(skill)
      skillData.resolve(skill);
    });
    return skillData.promise;
  }

  skillCertificationService.getUserSkillCertificationProgress = function(skillId) {
    console.log(skillId);
    var skillsData = $q.defer();
    $http.get(APP_BASE_URL + '/secure/skill/user-skill-certification-progress?skillId=' + skillId).success(function(skills){
      skillsData.resolve(skills);
    }).error(function(skills){
      skillsData.resolve(skills);
    });
    return skillsData.promise;

  }

  skillCertificationService.setUserSkillCertificationProgress = function(progress) {

    return $http.post(APP_BASE_URL + '/secure/skill/user-skill-certification-progress', progress);

  }

  return skillCertificationService;
}]);
