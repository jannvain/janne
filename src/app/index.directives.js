// This directive change global windows resize-event into Angular-event, which all required angular modules and
// directives can listen (scope.$on(...) without need to mess with windows-element. It will also send the current
// window size, its minimum dimensions and portrait-flag (true if portrait, false if landscape.

(function() {
  'use strict';

  angular
    .module('jv3')
    .directive('resize', resize);

  /** @ngInject */
  function resize($window, $timeout) {
    var directive = {
      restrict: 'A',

      replace: true,
      link: function checkResize(scope, element, attrs) {

        var getWinDim = function(){
          var windowWidth = $window.innerWidth;
          var windowHeight = $window.innerHeight;
          return {
            portrait: windowHeight >= windowWidth,
            windowWidth: windowWidth,
            windowHeight: windowHeight,
            minDim: windowHeight >= windowWidth ? windowWidth : windowHeight
          }
        }

        $timeout(function(){
          scope.$broadcast('resize::resize', getWinDim());
        }, 0);


        angular.element($window).on('resize', function(e) {
          // Namespacing events with name of directive + event to avoid collisions
          scope.$broadcast('resize::resize', getWinDim());
        });
      }
    }
    return directive;
  }

})();
