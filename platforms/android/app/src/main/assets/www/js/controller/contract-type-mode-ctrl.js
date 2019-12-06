app.controller('contractTypeModelController', function($scope,$ionicPopover,$ionicScrollDelegate){


  $scope.okContractTypeModel = function(){
      $scope.contractTypeModal.remove();
    }

    $scope.cancelContractTypeModel = function(){
       if($scope.oldContractType){
          $scope.project.contractType = $scope.oldContractType;
       }else{
        $scope.project.contractType= null;
       }
      $scope.contractTypeModal.remove();
    }

     $scope.openContractDefinition = function(name,definition){
          $scope.selectedContractName = name;
          $scope.selectedContractDefinition = definition;
        }
        var template = '<ion-popover-view class="occupant-popover-height"><ion-content  style="padding: 10px;> <span style="color:#b1b1b1 !important;"><strong>{{selectedContractName}}</strong></span><span style="color:#b1b1b1 !important;float: left;"> {{selectedContractDefinition}}</span> </ion-content></ion-popover-view>';

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
