// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

// Get absolute file path on the device.
function getPhoneGapPath() {
    var path = window.location.pathname;
    var sizefilename = path.length - (path.lastIndexOf("/"));
    path = path.substr( path, path.length - sizefilename );
    return path;
};

var API_BASE_URL = getPhoneGapPath();
//var APP_BASE_URL = 'http://localhost:6060/NLF-API';
//var APP_BASE_URL = 'https://app.noleadfines.com/NLF-API';
//var APP_BASE_URL = 'https://www.psd2htmlx.com/R/Laravel/public/api';
var APP_BASE_URL = 'https://api.noleadfines.com/public/api';
var APP_LOGO_URL = 'https://api.noleadfines.com/public/logo/';

//var APP_BASE_URL = 'https://www.noleadfines.com/NLF-API/public/api';
var ROLE_SUPERVISOR = 'ROLE_SUPERVISOR';
var ROLE_CW = 'ROLE_CW';
var ROLE_NCW = 'ROLE_NCW';
var ROLE_ADMIN = 'ROLE_ADMIN';
var ROLE_SUPER_ADMIN = 'ROLE_SUPER_ADMIN';

//var API_BASE_URL = "http://localhost:8100"
var app = angular.module('app', ['ionic', 'app.routes', 'app.directives','ui.mask','ngLetterAvatar','ngMap'])

.run(function($ionicPlatform) {

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
StatusBar.backgroundColorByName('purple');
    if (StatusBar.isVisible) {
        StatusBar.hide ();
    }
}

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }




  });
})

app.config( [ 'uiMask.ConfigProvider', function( uiMaskConfigProvider ) {
  uiMaskConfigProvider.clearOnBlur(true);
}]);

app.config(function($ionicConfigProvider) {
  $ionicConfigProvider.navBar.alignTitle('center');

  $ionicConfigProvider.backButton.previousTitleText(false).text('');
})

app.config(function ($httpProvider) {

    $httpProvider.interceptors.push('customeInterceptor');
    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.withCredentials = true;
    delete $httpProvider.defaults.headers.common["X-Requested-With"];

});

// Custome Interceptor that will get injected on each HTTP request
// Add $ionicLoading at run time using $injector to avoid circular dependency error
    app.factory('customeInterceptor',['$timeout','$injector', '$q',function($timeout, $injector, $q) {

        var numLoadings = 0;

        function showLoadingText() {
            $injector.get("$ionicLoading").show({
                template: '<ion-spinner icon="android"></ion-spinner>',
                noBackdrop: false
            });
        };

        function hideLoadingText(){
            $injector.get("$ionicLoading").hide();
        };

        return {
            request : function(config) {
                numLoadings++;
                showLoadingText();
                //console.log('Request Initiated with interceptor : ' + numLoadings);
                var token = localStorage.getItem('token');
                if(token){
                    config.headers['Authorization']= 'Bearer '+ token;
                }
                return config;
            },
            response : function(response) {

                if ((--numLoadings) <= 0) {
                    hideLoadingText();
                }
                //console.log('Response received with interceptor :' + numLoadings);

                return response;
            },
            requestError : function (err) {
                //console.log('Request Error logging via interceptor');
                return err;
            },
            responseError : function (err) {
                if(err.status==0 || err.status ==500){
                $injector.get("$ionicPopup").alert({
                                    title: 'Server Error',
                                    template: 'Server error occured, please contact administrator.'
                });

                }

                if ((--numLoadings) <= 0) {
                       hideLoadingText();
                }
                //console.log('Response error via interceptor');
                return $q.reject(err);
            }
        }
    }]);
