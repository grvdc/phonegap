app.directive('signature', function ($ionicSlideBoxDelegate, $ionicSideMenuDelegate) {
    return {
        restrict: 'A',
        controller: function ($scope, $element) {
            var ctx = $element[0].getContext('2d');
            // variable that decides if something should be drawn on mousemove
            var drawing = false;
            // the last coordinates before the current move
            var lastX;
            var lastY;
            function draw(lX, lY, cX, cY) {
                // line from
                ctx.moveTo(lX, lY);
                // to
                ctx.lineTo(cX, cY);
                // color
                ctx.lineWidth = 2;
                // draw it
                ctx.stroke();
            }
            $scope.OnDrag = function (event) {
                if (drawing) {
                    // get current mouse position
                    currentX = event.gesture.touches[0].pageX - (event.target.offsetLeft + (window.pageXOffset || event.target.scrollLeft) - (event.target.clientLeft || 0));
                    currentY = event.gesture.touches[0].pageY - (event.target.offsetTop + (window.pageYOffset || event.target.scrollTop) - (event.target.clientTop || 0));
                    //console.log("X: "+currentX);
                    // console.log("Y: "+currentY);
                    draw(lastX, lastY, currentX, currentY);
                    // set current coordinates to last one
                    lastX = currentX;
                    lastY = currentY;
                }
            };
            $scope.OnTouch = function (event) {
                $ionicSlideBoxDelegate.enableSlide(false);
                $ionicSideMenuDelegate.canDragContent(false);
                lastX = event.gesture.touches[0].pageX - (event.target.offsetLeft + (window.pageXOffset || event.target.scrollLeft) - (event.target.clientLeft || 0));;
                lastY = event.gesture.touches[0].pageY - (event.target.offsetTop + (window.pageYOffset || event.target.scrollTop) - (event.target.clientTop || 0));
                // begins new line
                ctx.beginPath();
                drawing = true;
            };
            $scope.OnRelease = function (event) {
                drawing = false;
                $ionicSlideBoxDelegate.enableSlide(true);
                $ionicSideMenuDelegate.canDragContent(true);
                //$element[0].toDataURL("image/png");
            };
        }
    }
});
