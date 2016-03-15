'use strict';

/**
 * @ngdoc function
 * @name bmadminApp.controller:EditreferralsystemsCtrl
 * @description
 * # EditreferralsystemsCtrl
 * Controller of the bmadminApp
 */
angular.module('bmadminApp')
  .controller('EditreferralsystemsCtrl', function ($scope,$http,$route,logger) {
  	var id = $route.current.params.id;
    var data = {tag:"fetchSingleVisotor",id:id};
  	httpAccess(data,$http).then(function(result) {
  		console.log(result);
  		var e = result.data.export;
  		$scope.form = {
  			name: e.name,
  			email: e.email,
  			phone: e.phone,
  			pourcentage: e.pourcentage
  		}
  	});
  	////////////////////////////////////////////////////////////////////////
  	$scope.sendsuperadmin = function(form) {
		var access = $scope.user.roles;

		if (form.$valid) {
			var data = {
				tag : "editVisitor",
				name : form.name.$modelValue,
				email : form.email.$modelValue,
				phone : form.phone.$modelValue,
				password: $scope.password,
				pourcentage : form.pourcentage.$modelValue,
				id:id
			}
			httpAccess(data,$http).then(function(result) {
		  		console.log(result);
		  		if (result.data.error == 0 ) {
		  			logger.success("Record has been updated successfully.");
		  		}
		  		if (result.data.error == 102) {
		  			logger.error("Duplicated.");
		  		}
		  	});
		}else{
			logger.error("Complete the form.");
		}
	}
  });
