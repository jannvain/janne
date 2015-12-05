(function() {
  'use strict';

  angular
    .module('jv3')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
