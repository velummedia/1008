'use strict';

/**
 * @ngdoc function
 * @name bmadminApp.controller:AdminpanelsCtrl
 * @description
 * # AdminpanelsCtrl
 * Controller of the bmadminApp
 */
angular.module('bmadminApp')
  .controller('AdminpanelsCtrl', function ($scope,$http) {

    var data = {tag:"fetchPackagesAdmin", id:$scope.user.id}
	httpAccess(data,$http).then(function(result) {
		$scope.packages = result.data.export;
	});

  });
