app.controller('mapCtrl',['$scope','$stateParams', '$compile','NgMap','ProjectService', function($scope,$stateParams,$compile,NgMap,ProjectService) {

  $scope.$on('$ionicView.beforeEnter', function(){



var myLatLng = {lat: 40.74, lng: -74.18 };

var map = new google.maps.Map(document.getElementById('map'), {
          center: myLatLng,
          zoom: 14,
          styles: [{
            stylers: [{
            saturation: -100
            }]
          }]
});

geocoder = new google.maps.Geocoder();

 geocoder.geocode({ 'address': $stateParams.destination }, function (results, status) {
 console.log(results)
            if (status == 'OK') {
            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
              map: map,
              position: results[0].geometry.location
            });
            } else {

            }
        });







  navigator.geolocation.getCurrentPosition(function (position) {

              var c = position.coords;
              $scope.latitude = c.latitude;
              $scope.longitude =c.longitude

          });
  });

  $scope.destination = $stateParams.destination;
  $scope.projectName = $stateParams.projectName;
  $scope.zipCode = $stateParams.zipCode;
  $scope.city = $stateParams.city;
  $scope.state = $stateParams.state;
}])
