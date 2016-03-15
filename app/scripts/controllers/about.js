'use strict';

/**
 * @ngdoc function
 * @name bmadminApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the bmadminApp
 */
angular.module('bmadminApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
