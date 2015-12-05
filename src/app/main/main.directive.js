// Get Angular broadcast fro resize:resize, which is mapped windows.resize event in body-tag directive.
// Will change the background image (rendered using normal img-tag) based on the portrait/landscape mode

(function() {
  'use strict';

  angular
    .module('jv3')
    .directive('orientdepImage', orientDepImage)
    .directive('jItemSize', jItemSize);

  /** @ngInject */

  function jItemSize($log, $timeout) {
    return {
      restrict: 'A',
      replace: true,
      link: function (scope, element) {

        scope.myFontSize = "inherit";

        /* Parameters for curve, in which the buttons move: y= Ax^2 + Bx + C */
        /* myK is the slope of y=x. For this case, it is not needed  */
        var myA=-1.0;
        var myB=0.0;
        var myC = 1.0;
        var myK = 1.0;
        var myK0 = 1.0;

        var myBMinusK = myB - myK;


        /* Normalized calculation in a unit rectancle */

        scope.getXYCoordinates = function(index, maxIndex){

          var xyPoint = {'x': 0, 'y':0};
          var y = (1 - myK0*(index/4.0));
          var x = (index/4.0);


          return xyPoint;
        }

        scope.getLeft = function(index, minDim, rel, offset){
          // minDim = max scale of 1
          var x = (index/4.0);
          var y = (1 - myK0*(index/4.0));

          var xp = ( (myK - myB) - /*important* on the positive side of x?????*/
            Math.sqrt( myBMinusK * myBMinusK - 4*myA *( myK*x -y + myC)  ) ) / ( 2 * myA);

//          $log.debug("X: "+ "( " + x + ", " + xp + ")");

          return xp*minDim;

        }


        scope.getTop = function(index, minDim, rel, offset){
          var y = (1 - myK0*(index/4.0));
          var x = (index/4.0);

          var xp = ( (myK - myB) -
            Math.sqrt( (myB - myK) * (myB - myK) - 4*myA *( myK*x -y + myC)  ) ) / ( 2 * myA)

          var yp = myK * (xp - x) + y;
          $log.debug("( " + y + ", " + yp + ")" + "Ind " + index);

          return yp*minDim;

        }

        var setDim = function(args) {
          // $log.debug("Item resize");

          var maxDim = args.elWidth > args.elHeight ? args.elWidth : args.elHeight;
          scope.myHeight = maxDim / 6 + "px";
          scope.myWidth = maxDim / 6 + "px";

          scope.myFontSize = maxDim / 50 + "px";

          var offsetX = (maxDim / 5);
          var offsetY = (maxDim / 5);
          var areaWidth = args.elWidth - offsetX;
          var areaHeight = args.elHeight - offsetY;
          var rel = areaHeight / areaWidth;
          if (args.portrait){
            myK = areaWidth / areaHeight;
            myK0 = areaHeight / areaHeight;
          }
          else {
          //  myK = areaHeight / areaWidth;
          //  myK0 = -areaWidth/areaHeight;
          }
          var xyPoint = scope.getXYCoordinates(scope.$index);
          scope.myLeft = xyPoint.x;
          scope.myTop = xyPoint.y;
          scope.myLeft = (scope.getLeft(scope.$index, 1.0, rel, offsetX)*areaWidth) + "px";
          scope.myTop = (scope.getTop(scope.$index,1.0, rel , offsetY)*areaHeight) + "px";

        }
        scope.$on('resize::itemResize', function (event, args) {
          scope.$apply(setDim(args));
        });
        setDim(scope.vm.winDim);
      }
    }
  }

  function orientDepImage($log, $timeout, $window) {
    var directive = {
      restrict: 'A',
      replace: true,
      link: function changeImage(scope, element, attrs) {

        //$log.debug("INITIAL PORTRAIT " + scope.vm.portrait);

        var getElDim = function(element, portrait){
          //$log.debug(element);

          var elHeight = element.prop('offsetHeight');
          var elWidth = element.prop('offsetWidth');

          return {
            portrait: portrait,
            elWidth: elWidth,
            elHeight: elHeight,
            minDim: elHeight >= elWidth ? elWidth : elHeight
          }
        }

        var windowWidth = $window.innerWidth;
        var windowHeight = $window.innerHeight;

        var elDim = getElDim(element, windowHeight >= windowWidth);

        scope.vm.winDim = elDim;

        var init = function(){
          //$log.debug(getElDim(element));

        }
        scope.$on('resize::resize', function (event, args) {
          //$log.debug(args);

          //$timeout(init(), false);
          var elDim = getElDim(element, args.portrait);
          //$log.debug(elDim);

          scope.$broadcast('resize::itemResize', elDim);

          if(scope.vm.portrait ==  args.portrait){
            // $log.debug("No need to change, no orientation change, just resize, which is handled in css");
            return;
          }
          scope.vm.winDim = args;

          scope.vm.portrait = args.portrait;
        });
      }
    }
    return directive;
  }

})();



