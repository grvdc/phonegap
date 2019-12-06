/**
 * Created by vpatel on 7/25/2016.
 */
app.service('SignatureService', [function () {
  var signatureService = {};

  signatureService.signature = null;
  signatureService.skillId = null;
  signatureService.projectId = null;

  signatureService.setSignature = function (signature) {
    if(signature!= null){
      signatureService.signature = signature;
    }
  }

  signatureService.getSignature = function () {
    return signatureService.signature;
  }

  signatureService.setSkillId = function (skillId) {
    signatureService.skillId = skillId;
  }

  signatureService.getSkillId = function () {
    return signatureService.skillId;
  }

  signatureService.setProjectId = function (projectId) {
    signatureService.projectId = projectId;
  }

  signatureService.getProjectId = function () {
    return signatureService.projectId;
  }


  signatureService.clear = function () {
    signatureService.signature = null;
    signatureService.skillId = null;
  }


  return signatureService;

}])
