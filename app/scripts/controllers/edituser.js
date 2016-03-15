'use strict';

/**
 * @ngdoc function
 * @name bmadminApp.controller:EdituserCtrl
 * @description
 * # EdituserCtrl
 * Controller of the bmadminApp
 */
angular.module('bmadminApp')
  .controller('EdituserCtrl', function ($scope,$http,$route) {
    var id = $route.current.params.id;
    var data = {tag:"fetchSingleUser",id : id};

    httpAccess(data,$http).then(function(result) {
  		console.log(result);
  		$scope.result = result.data.export;
  		var user = result.data.export.user;

  		$scope.form = {
  			'name': user.name,
  			'email' : user.email,
  			'phone' : user.phone
  		}


  		$scope.packages = [];
  		angular.forEach($scope.result.payments, function(value, key) {
  			$scope.packages.push(value.system);
		  });

  	});
  });
