/**
 * Created by vainio6 on 29/11/15.
 */

(function() {
  'use strict';


  angular

    .module('jv3')
    .controller('ModalInstanceCtrl', ModalInstanceCtrl);

  /** @ngInject */
  function ModalInstanceCtrl($scope, $timeout, $uibModalInstance, items) {

    $scope.items = items;
    $scope.selected = {
      item: $scope.items[0]
    };

    $scope.ok = function () {
      $uibModalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  }
})();

