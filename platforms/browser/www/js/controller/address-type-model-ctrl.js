app.controller('AddressTypeModelController', function($scope,$ionicPopover,$ionicScrollDelegate){


  $scope.okAddressTypeModel = function(){
      $scope.addressTypeModal.remove();
    }

    $scope.cancelAddressTypeModel = function(){
       if($scope.oldAddressType){
          $scope.project.addressType = $scope.oldAddressType;
       }
      $scope.addressTypeModal.remove();
    }

     $scope.openAddressTypeDefinition = function(name,definition){
          $scope.selectedName = name;
          $scope.selectedDefinition = definition;
        }
        var template = '<ion-popover-view class="occupant-popover-height" style="margin-left:-50px!important;"><ion-content scroll="false" style="padding: 10px;><span style="color:#b1b1b1 !important;"><strong>{{selectedName}}</strong></span><span style="color:#b1b1b1 !important;float: left;"> {{selectedDefinition}}</span> </ion-content></ion-popover-view>';

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
