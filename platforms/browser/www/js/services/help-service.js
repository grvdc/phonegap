/**
 * Created by vpatel on 7/12/2016.
 */
app.factory('HelpService', ['$http','$q',function($http,$q){

  var helpService = {};
    helpService.getHelpDataOLD = function () {
    return $http.get(API_BASE_URL + '/json/help_data.json');
  }

  helpService.getHelpData = function(){
    return $http.get('https://rrphelp.com/api/questions/viewall');

  }
   helpService.getHelpCatData = function(){
    return $http.get('https://rrphelp.com/api/questions/categories');

  }
  return helpService;

}]);
