app.controller('DeliveryTypeModelController', function($scope){

    $scope.changeType = function(){
        /*setTimeout(function(){
            $scope.deliveryTypeModal.remove();
        }, 40);
        */
    }

    $scope.cancelDeliveryType = function(){
        $scope.deliveryTypeModal.remove();
    }

    $scope.okDeliveryType = function(){
        $scope.deliveryTypeModal.remove();
    }
})
