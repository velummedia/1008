'use strict';

/**
 * @ngdoc function
 * @name bmadminApp.controller:ManagereferralsystemsCtrl
 * @description
 * # ManagereferralsystemsCtrl
 * Controller of the bmadminApp
 */
angular.module('bmadminApp')
  .controller('ManagereferralsystemsCtrl', function ($scope,$http) {
    var data = {tag:"fetchVisitors"};
  	httpAccess(data,$http).then(function(result) {
  		$scope.admins = result.data.export;
  	});
  });
