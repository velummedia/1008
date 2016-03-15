'use strict';

/**
 * @ngdoc function
 * @name bmadminApp.controller:ManagevipsCtrl
 * @description
 * # ManagevipsCtrl
 * Controller of the bmadminApp
 */
angular.module('bmadminApp')
  .controller('ManagevipsCtrl', function ($scope,$http) {
    
    var data = { tag:"fetchVips", id:$scope.user.id }
	httpAccess(data,$http).then(function(result) {
		console.log(result);
		$scope.vips = result.data.export;
	});
  });
