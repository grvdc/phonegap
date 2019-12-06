angular.module('app.directives', [])

.directive('blankDirective', [function(){

}])

  .directive('addAreaDirective', function() {
    return {
      restrict:   'E',
      scope:{
        addAreaName: '@'
      },
      template:
        '<ion-toggle ion-toggle-text toggle-class="toggle-my-theme" class="toggle-my-theme" >{{ addAreaName }} </ion-toggle>',
      controller: [ '$scope',  function ( $scope ) {
        $scope.isExtButton = true;
        $scope.isIntButton = true;
        $scope.addExtArea = function (component){
           $scope.isExtButton = false;
          $scope.isIntButton = true;
        }

        $scope.addIntArea = function (){
          $scope.isExtButton = true;
          $scope.isIntButton = false;
        }
      }]
    };
  })


  .directive('headerColor', function() {
      return {
                      restrict: 'A',
                      link: function(scope, element, attrs)
                      {
                          var targetColor = attrs.headerColor;
                          var changes = {
                                backgroundColor : targetColor +' !important'
                            }
                           var selectElement = angular.element(document.querySelector('#header'));
                            selectElement.removeClass('bar-royal');
                            selectElement.addClass('bar-positive');
                      }
                  };
    })
  .directive('ionToggleText', function () {

    var $ = angular.element;

    return {
      restrict: 'A',
      link: function ($scope, $element, $attrs) {

        // Try to figure out what text values we're going to use
        $element.removeClass('toggle-small')
        var textOn = $attrs.ngTrueValue || 'Ext',
          textOff = $attrs.ngFalseValue || 'Int';

        if ($attrs.ionToggleText) {
          var x = $attrs.ionToggleText.split(';');

          if (x.length === 2) {
            textOn = x[0] || textOn;
            textOff = x[1] || textOff;
          }
        }

        // Create the text elements

        var $handleTrue = $('<div class="handle-text handle-text-true">' + textOn + '</div>'),
          $handleFalse = $('<div class="handle-text handle-text-false disable-lable-text">' + textOff + '</div>');

        var label = $element.find('label');

        if (label.length) {
          label.addClass('toggle-text');

          // Locate both the track and handle elements

          var $divs = label.find('div'),
            $track, $handle;

          angular.forEach($divs, function (div) {
            var $div = $(div);

            if ($div.hasClass('handle')) {
              $handle = $div;
            } else if ($div.hasClass('track')) {
              $track = $div;
            }
          });

          if ($handle && $track) {

            // Append the text elements

            $handle.append($handleTrue);
            $handle.append($handleFalse);

            // Grab the width of the elements

            var wTrue = $handleTrue[0].offsetWidth,
              wFalse = $handleFalse[0].offsetWidth;
            wTrue = 0;
            wFalse = 0;
            // Adjust the offset of the left element
            $handleFalse.css('top',4+ 'px');
            $handleFalse.css('font-size',12+ 'px');
            $handleTrue.css('left', '-' + (wTrue + 19) + 'px');
            $handleTrue.css('top',4+ 'px');
            $handleTrue.css('font-size',12+ 'px');
            // Ensure that the track element fits the largest text

            var wTrack = Math.max(wTrue, wFalse);
            $track.css('width', (wTrack + 60) + 'px');
          }
        }
      }
    };

  })

.directive('watchMenu', function($timeout, $ionicSideMenuDelegate) {
    return {
        restrict: 'A',
        link: function($scope, $element, $attr) {
            // Run in the next scope digest
            $timeout(function() {
                // Watch for changes to the openRatio which is a value between 0 and 1 that says how "open" the side menu is

                $scope.$watch(function() {
                        return $ionicSideMenuDelegate.getOpenRatio();
                    },
                    function(ratio) {
                        $scope.data=ratio;
                        if( ratio == 1){
                            angular.element($element.children()[2]).addClass("visible active");
                            $element.find(".app-content-backdrop")
                       //     alert("menu Open");
                        }else{
                            angular.element($element.children()[2]).removeClass("visible active");
                         //   alert("menu close");
                        }

                    });
            });
        }
    };
})

.directive('customValidation', function(){
   return {
     require: 'ngModel',
     link: function(scope, element, attrs, modelCtrl) {

       modelCtrl.$parsers.push(function (inputValue) {
         var transformedInput =  inputValue;
         if (inputValue !== null) {
                 transformedInput =  inputValue.replace(/\w\S*/g, function(txt) {
                   return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                 });
               }

         if (transformedInput!=inputValue) {
           modelCtrl.$setViewValue(transformedInput);
           modelCtrl.$render();
         }

         return transformedInput;
       });
     }
   };
})
.directive('videoEvents', function () {
    return function ($scope, $element) {
      $element[0].addEventListener("loadeddata", function ($event) {
        console.log('loadeddata');
        // you can $rootScope.$broadcast...
      });
      $element[0].addEventListener("play", function ($event) {
        for(var i=1;i<=$event.srcElement.attributes.getNamedItem('data-total').value;i++){
            if($event.srcElement.id != 'myvideo-'+i){
            var myEl = angular.element( document.querySelector('#myvideo-'+i) );
             myEl[0].pause();
             }
        }

      });

    }
})

.directive('captiveGame', function () {
    return {
         controller: [ '$scope','$element','$state','SkillCertificationService',  function ( $scope, $element,$state,SkillCertificationService ) {
            var window1 = document.getElementById("myFrame").contentWindow;
            var interfaceObj;
            var eventEmitterObj;
            var stateChangedUsingAPI = false;
            if(ionic.Platform.isIPad() || ionic.Platform.isIOS()){
              setTimeout(function(){
                   interfaceObj = document.getElementById("myFrame").contentWindow.cpAPIInterface;
                   $scope.interfaceObj = interfaceObj
                   eventEmitterObj = interfaceObj.getEventEmitter();
                   initializeEventListeners();
               }, 7000);
            }else{
                window1.addEventListener("moduleReadyEvent", function(evt){
                   // alert("module event handler called.");

                    interfaceObj = evt.Data;

                    $scope.interfaceObj = interfaceObj;
                    eventEmitterObj = interfaceObj.getEventEmitter();
                    initializeEventListeners();
                });
            }


            function initializeEventListeners(){
                if(interfaceObj){
                     if(eventEmitterObj){
                      var regex = /[?&]([^=#]+)=([^&#]*)/g,
                        url = document.getElementById("myFrame").src,
                        params = {},
                        match;
                      while (match = regex.exec(url)) {
                        params[match[1]] = match[2];
                      }
                        eventEmitterObj.addEventListener("CPAPI_SLIDEENTER", function (e){
                          console.log("CPAPI_SLIDEENTER")
                          SkillCertificationService.setUserSkillCertificationProgress({"id": $state.params.skillId, "userProgress": e.Data.slideNumber}).success(function(response){
                            console.log("-==================-", response, "-==================-");
                        });
                          if(!stateChangedUsingAPI && params['pageNo'] != 0) {
                            $scope.interfaceObj.setVariableValue("cpCmndGotoSlide", params['pageNo']);
                            stateChangedUsingAPI = true;
                          }
                          if(e.Data.slideNumber == $scope.interfaceObj.getVariableValue("cpInfoSlideCount")){
                            console.log("CPAPI_SLIDE LAST PAGE");
                            var skillDetailDTO = {};
                            skillDetailDTO.id = $state.params.skillId;
                            skillDetailDTO.score = $scope.interfaceObj.getVariableValue("cpInfoPercentage");
                            SkillCertificationService.addScoreInSkill(skillDetailDTO).success(function(response){
                                console.log("Score saved!");
                            });
                          }
                        });
                      eventEmitterObj.addEventListener("CPAPI_SLIDEEXIT", function (e){
                        console.log("CPAPI_SLIDEEXIT")
                        if(e.Data.slideNumber == $scope.interfaceObj.getVariableValue("cpInfoSlideCount")){
                          $state.go('menu.courseWork', {}, {reload: true});
                        }
                    });
                  }
                }
            }
            function resultChanged(){
              alert("resultChanged called")
            }
          }]
        };
})

.directive('map', function() {
  return {
    restrict: 'E',
    scope: {
      onCreate: '&'
    },
    link: function ($scope, $element, $attr) {
      function initialize() {
        var mapOptions = {
          center: new google.maps.LatLng(43.07493, -89.381388),
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map($element[0], mapOptions);

        $scope.onCreate({map: map});

        // Stop the side bar from dragging when mousedown/tapdown on the map
        google.maps.event.addDomListener($element[0], 'mousedown', function (e) {
          e.preventDefault();
          return false;
        });
      }

      if (document.readyState === "complete") {
        initialize();
      } else {
        google.maps.event.addDomListener(window, 'load', initialize);
      }
    }
  }
})
.directive('capitalize', function() {
    return {
      require: 'ngModel',
      link: function(scope, element, attrs, modelCtrl) {
        var capitalize = function(inputValue) {
          if (inputValue == undefined) inputValue = '';
          var capitalized = inputValue.toUpperCase();
          if (capitalized !== inputValue) {
            modelCtrl.$setViewValue(capitalized);
            modelCtrl.$render();
          }
          return capitalized;
        }
        modelCtrl.$parsers.push(capitalize);
        capitalize(scope[attrs.ngModel]); // capitalize initial value
      }
    };
  });
