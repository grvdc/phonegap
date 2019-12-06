app.controller('trainingVideosCtrl', ['$rootScope', '$scope', '$sce', 'TrainingVideosService', function ($rootScope, $scope, $sce, TrainingVideosService) {
  $scope.videoUrls = new Array();
  $scope.videoSearch = "";

  $scope.$on('$destroy', function () {
    for (var i = 1; i <= $scope.total; i++) {
      var myEl = angular.element(document.querySelector('#myvideo-' + i));
      myEl[0].pause();
    }
  });

  TrainingVideosService.getAllVideos().success(function (data) {
    $scope.total = data.length;
    for (var i = 0; i < data.length; i++) {
      var movie = { src: $sce.trustAsResourceUrl(data[i].url), title: data[i].title, discription: data[i].discription, poster: data[i].poster };
      $scope.videoUrls.push(movie);
    }
  });


   $scope.playVideo = function(vID) {
   
     
     var myVideo1 = document.getElementById( "myvideo-"+vID);
           
                if (myVideo1.paused) {
                    if (myVideo1.requestFullscreen) {
                        myVideo1.requestFullscreen();
                    }
                    else if (myVideo1.msRequestFullscreen) {
                        myVideo1.msRequestFullscreen();
                    }
                    else if (myVideo1.mozRequestFullScreen) {
                        myVideo1.mozRequestFullScreen();
                    }
                    else if (myVideo1.webkitRequestFullScreen) {
                        myVideo1.webkitRequestFullScreen();
                    }
                    
                    for (var i = 1; i <= $scope.total; i++) {
                      var myEl = angular.element(document.querySelector('#myvideo-' + i));
                      myEl[0].pause();
                    }
    
                    myVideo1.play();
                    screen.orientation.lock('landscape');
                }
                else {
                    if (myVideo1.requestFullscreen) {
                        myVideo1.requestFullscreen();
                    }
                    else if (myVideo1.msRequestFullscreen) {
                        myVideo1.msRequestFullscreen();
                    }
                    else if (myVideo1.mozRequestFullScreen) {
                        myVideo1.mozRequestFullScreen();
                    }
                    else if (myVideo1.webkitRequestFullScreen) {
                        myVideo1.webkitRequestFullScreen();
                    }
                    
                    //myVideo1.pause();
                    screen.orientation.lock('landscape');
                    
                }
           
              myVideo1.addEventListener('pause', function (data) {
                $rootScope.previousVideo = this.id;
                $rootScope.seekTime = this.currentTime;
                screen.orientation.lock('portrait');
              })
              
              
  };
  
  
  $scope.isPotrait = true;
  $scope.$on('$ionicView.afterEnter', function () {
  
  
    if($rootScope.previousVideo){
    var CVideo = parseInt($rootScope.previousVideo.replace("myvideo-", ""));
    
    var k = CVideo;
    
    }else{
    var k = 10000;
    }
    var videos = document.querySelectorAll('video');
    for (var i = 0; i <= videos.length; i++) {
       
         if(i == k){
        
          var myVideobh = document.getElementById('myvideo-'+i);
          myVideobh.currentTime = $rootScope.seekTime;
          myVideobh.play();
          
          var videoContainer = document.getElementById('videoContainer-'+i);
          videoContainer.scrollIntoView(); 
          //document.getElementById('playOverlay-'+i).style.display = "none";
           
          
         }
         
    }
  });
  
  

}])
