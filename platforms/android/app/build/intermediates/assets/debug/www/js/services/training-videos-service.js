/**
 * Created by vpatel on 7/13/2016.
 */
app.factory('TrainingVideosService', ['$http',function($http){
  var trainingVideosService = {};

  trainingVideosService.getAllVideos = function(){
  console.log(API_BASE_URL + '/json/training_videos.json');
    return $http.get(API_BASE_URL + '/json/training_videos.json');
  }

  return trainingVideosService;
}]);
