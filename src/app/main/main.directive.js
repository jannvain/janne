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
        var myXt;
        var myYt;
        var myXb;
        var myYb;
        var myBMinusK = myB - myK;
        var aRatio;


       var setParameters = function(areaWidth, areaHeight){

         // Point (1,0), curves and coordinates relate bottom right
         myXb = 1.0;
         myYb = 0.0;
         // Point for curve to cross y-axis (top) and coordinates top left
         myXt = 0;
         myYt = areaHeight/areaWidth;
         myYt = areaHeight/areaWidth;

         // Line slope from  point top to bottom
         myK0 = (myYb - myYt)/(myXb-myXt);
         // Slope for perpendicular line to cross the curve
         myK = -1/myK0;

         myA=myK0;
         myB=0;
         myC = -myK0;

         myBMinusK = myB - myK;
         aRatio = areaHeight/areaWidth;

         //$log.debug("k0 " + myK0 + " k " + myK + "myxt " + myXt);
       }
        setParameters(768, 1024);

        /* Normalized calculation in a unit rectancle */


        scope.getXYCoordinates = function(index, maxIndex){

          var xyPoint = {'x': 0, 'y':0};
          var y = (myYt + myK0*(index/4.0));
          var x = (index/4.0);


          return xyPoint;
        }

        scope.getLeft = function(index){
          var y = (myYt + myK0*(index/4.0));
          var x = (index/4.0);

          var xp = ( (myK - myB) - /*important* on the positive side of x?????*/
            Math.sqrt( myBMinusK * myBMinusK - 4*myA *( myK*x -y + myC)  ) ) / ( 2 * myA);

          //$log.debug("X: "+ "( " + x + ", " + xp + ")");

          return xp<0 ? x : xp;

        }


        scope.getTop = function(index){
          var y = (myYt + myK0*(index/4.0));
          var x = (index/4.0);
          //$log.debug(myYt);
          var xp = ( (myK - myB) -
            Math.sqrt( myBMinusK * myBMinusK - 4*myA *( myK*x -y + myC)  ) ) / ( 2 * myA)

          var yp = myK * (xp - x) + y;
          //$log.debug("( " + y + ", " + yp + ")" + "Ind " + index);
          //return y;

          return yp<0 ? y : yp;


        }

        var setDim = function(args) {
          // $log.debug("Item resize");

          var areaWidth = args.elWidth;
          var areaHeight = args.elHeight;

          var aDiv = 5.0;
          var minDim = areaHeight < areaWidth ? areaHeight : areaWidth;
          var maxDim = areaHeight >= areaWidth ? areaHeight : areaWidth;
          var offsetX = (maxDim / aDiv);
          var offsetY = (maxDim / aDiv);

          var myHeight = (maxDim) / aDiv;
          var myWidth = (maxDim) / aDiv;
          var myFontSize = (maxDim) / (aDiv * 8);

          minDim -= offsetX;
          maxDim -= offsetY;
          areaWidth -= offsetX;
          areaHeight -= offsetY;

          setParameters(areaWidth, areaHeight);

          // x-scale is always 0..1 and y-scale adjust based on the aspect ratio
          var myLeft = (scope.getLeft(scope.$index) * areaWidth);
          var myTop = (scope.getTop(scope.$index) * areaWidth);

          if (args.portrait && (myWidth >= areaWidth+offsetX)) {
            myLeft = 0;
            myWidth=areaWidth+offsetX;
            myHeight=areaWidth+offsetY;

            var myFontSize = myWidth / 10;

          }
          else if (!args.portrait && (myHeight >= areaHeight+offsetY)) {
            myTop =0;
            myHeight = areaHeight+offsetY;
            myWidth=areaHeight+offsetX;
            var myFontSize = myWidth / 10;

          }



          scope.myHeight = myHeight + 'px';
          scope.myWidth = myWidth + 'px';
          scope.myFontSize = myFontSize + 'px';
          scope.myLeft = myLeft + 'px';
          scope.myTop = myTop + "px";
          // $log.debug(scope.$index+": "+"X= " + myLeft + " Y= ", myTop + "   "+areaHeight + " " + myWidth);

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



