/**
 * Created by vpatel on 7/5/2016.
 */
app.directive('checkPermission', function ($compile, $rootScope,AuthenticationService) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      var currentPermission =element.attr("check-permission");
      var roles = AuthenticationService.getRoles();
      if(currentPermission && currentPermission.search('&&') >0){
        var tempArray = currentPermission.split('&&');
        for(i=0;i<tempArray.length;i++){
          if (roles.indexOf(tempArray[i].trim()) == -1) {
            element.css('display', 'none');
          }
        }
      }else if(currentPermission && currentPermission.search('!') != -1){
        var role = currentPermission.substr(1);
        if(role == "ROLE_NCW" && roles && roles.split(',').length ==1){
          if (roles.indexOf(role.trim()) != -1) {
            element.css('display', 'none');
          }
        }
      }else if(currentPermission && roles && roles.indexOf(currentPermission) == -1) {
        element.css('display', 'none');
      }
    }
  }
});
