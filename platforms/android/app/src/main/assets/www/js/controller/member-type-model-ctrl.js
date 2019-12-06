app.controller('MemberTypeModelController', function($scope){


  $scope.okAddressTypeModel = function(){
      $scope.memberTypeModal.remove();
    }

    $scope.cancelAddressTypeModel = function(){
      $scope.memberTypeModal.remove();
    }

    $scope.changeType = function(){
      setTimeout(function(){
         $scope.memberTypeModal.remove();
       }, 40);

    }
})
