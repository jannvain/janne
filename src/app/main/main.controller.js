(function() {
  'use strict';



  angular

    .module('jv3')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope, $rootScope, $timeout, $window, $log, webDevTec, toastr, $uibModal) {

    var vm = this;

    vm.portrait = true;
    vm.landscapeImage = '../assets/images/me1280gray.jpg';
    vm.portraitImage = '../assets/images/me1280gray.jpg';

    vm.bgImage = vm.portraitImage;

    vm.awesomeThings = [];
    vm.classAnimation = '';
    vm.creationDate = 1448377960312;
    vm.showToastr = showToastr;
    vm.itemSize = 25;

    activate();

    function activate() {
      getWebDevTec();
      $timeout(function() {
        vm.classAnimation = 'rubberBand';
      }, 4000);
    }

    vm.open = function (jItem) {
      $log.debug(jItem);
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'app/modal/modal.html',
        controller: 'ModalInstanceCtrl',
        size: "",
        resolve: {
          items: jItem
        }
      });

      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };

    function showToastr() {
      toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
      vm.classAnimation = '';
    }

    function getWebDevTec() {
      vm.jItems = webDevTec.getTec();

      angular.forEach(vm.jItems, function(jItem) {
        jItem.rank = Math.random();
      });
    }
  }
})();
