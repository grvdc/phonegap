app.controller('occupantModelController', function($scope,$ionicPopover,$ionicScrollDelegate){

  var temp = $scope.occupantsList.map(function(a) {return a.name;});
   if($scope.project.occupantType && temp.indexOf($scope.project.occupantType) == -1){
      $scope.show = true;
      $scope.project.otherOccupants = $scope.project.occupantType;
      $scope.project.occupantType = 'Other';
   }else if($scope.project.occupantType == 'Other'){
      $scope.show = true;
   }

  $scope.okOccupantModel = function(){
      if($scope.project.otherOccupants){
        $scope.project.occupantType = $scope.project.otherOccupants;
      }
      $scope.modal.remove();
    }

    $scope.cancelOccupantModel = function(){
       if($scope.oldOccupant){
          $scope.project.occupantType = $scope.oldOccupant;
       }else if($scope.project.occupantType == 'Other'){
        $scope.project.occupantType= null;
       }

      $scope.project.otherOccupants = null;
      $scope.modal.remove();
    }
    $scope.changeOccupant = function(occupant){
    console.log($scope.project)
      if(occupant =='Other'){
        $scope.show = true;
       $ionicScrollDelegate.$getByHandle('occupant').scrollBottom();
      }else{
        $scope.show = false;
        $scope.project.otherOccupants = null;
      }
    }

    $scope.openOccupantDefinition = function(name,definition){
      $scope.selectedName = name;
      $scope.selectedDefinition = definition;
    }
    var template = '<ion-popover-view class="occupant-popover-height"><ion-content scroll="false" style="padding: 5px 10px;><span style="color:#b1b1b1 !important;"><strong>{{selectedName}}</strong></span><span style="color:#b1b1b1 !important;float: left;"s> {{selectedDefinition}}</span> </ion-content></ion-popover-view>';

       $scope.popover = $ionicPopover.fromTemplate(template, {
         scope: $scope,
         animation: 'slide-in-bottom'
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
