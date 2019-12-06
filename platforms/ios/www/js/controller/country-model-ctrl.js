app.controller('CountryModelController', function($scope,$ionicPopover,$ionicScrollDelegate){


  $scope.okCountryModel = function(){
      $scope.countryModal.remove();
    }

    $scope.cancelCountryModel = function(){
       if($scope.oldCountry){
          $scope.project.country = $scope.oldCountry;
       }
      $scope.countryModal.remove();
    }

     $scope.openCountryDefinition = function(name,definition){
          $scope.selectedName = name;
          $scope.selectedDefinition = definition;
        }
        var template = '<ion-popover-view class="occupant-popover-height"><ion-content scroll="false" style="padding: 10px;><span style="color:#b1b1b1 !important;"><strong>{{selectedName}}</strong></span><span style="color:#b1b1b1 !important;float: left;"> {{selectedDefinition}}</span> </ion-content></ion-popover-view>';

           $scope.popover = $ionicPopover.fromTemplate(template, {
             scope: $scope,
             animation: 'slide-in-up'
           });

             $scope.openPopover = function($event) {
               $scope.popover.show($event);
             };
             $scope.closePopover = function() {
               $scope.popover.hide();
             };
             $scope.$on('$destroy', function() {
                 $scope.popover.remove();
               });
               // Execute action on hide popover
               $scope.$on('popover.hidden', function() {
                 // Execute action
               });
               // Execute action on remove popover
               $scope.$on('popover.removed', function() {
                 // Execute action
               });

})
