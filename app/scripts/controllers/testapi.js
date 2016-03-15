'use strict';

/**
 * @ngdoc function
 * @name bmadminApp.controller:TestapiCtrl
 * @description
 * # TestapiCtrl
 * Controller of the bmadminApp
 */
angular.module('bmadminApp')
  .controller('TestapiCtrl', function ($scope,$http) {
    $scope.sendlogin = function(form) {
    	var s = {
    		tag: "loginApi",
    		username: form.username.$modelValue,
    		password: form.password.$modelValue,
    		packageid: form.package.$modelValue
    	}

    	httpAccess(s,$http).then(function(result) {
			console.log(result);
			$scope.vips = result.data.export;
		});
    }

    var data = {tag:"fetchPackages", approved: "all"}
	httpAccess(data,$http).then(function(result) {
		console.log(result);
		$scope.packages = result.data.export;
	});
  });
