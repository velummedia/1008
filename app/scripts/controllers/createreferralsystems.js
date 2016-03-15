'use strict';

/**
 * @ngdoc function
 * @name bmadminApp.controller:CreatereferralsystemsCtrl
 * @description
 * # CreatereferralsystemsCtrl
 * Controller of the bmadminApp
 */
angular.module('bmadminApp')
  .controller('CreatereferralsystemsCtrl', function ($scope,$http,logger) {

    function randomPassword(length) {
	    var chars = "abcdefghijklmnopqrstuvwxyz!@#$%^&*()-+<>ABCDEFGHIJKLMNOP1234567890";
	    var pass = "";
	    for (var x = 0; x < length; x++) {
	        var i = Math.floor(Math.random() * chars.length);
	        pass += chars.charAt(i);
	    }
	    return pass;
	}
	$scope.password = randomPassword(8);

	$scope.form = {
		dis: {}
	}
	///////////////////////////////////////////////////////////////////
	$scope.sendsuperadmin = function(form) {
		var access = $scope.user.roles,
			vAccess = [];

		angular.forEach($scope.user.roles, function(value) {
			vAccess.push({
				sid: value,
				dis: $scope.form.dis[value]
			});
		});

		console.log(vAccess);

		if (form.$valid) {
			var data = {
				tag : "createVisitor",
				name : form.name.$modelValue,
				email : form.email.$modelValue,
				phone : form.phone.$modelValue,
				password: $scope.password,
				va: vAccess
			}
			httpAccess(data,$http).then(function(result) {
				console.log(result);
		  		if (result.data.error == 0 ) {
		  			logger.success("User added successfully.");
		  		}
		  		if (result.data.error == 102) {
		  			logger.error("The user already has been registered.");
		  		}
		  	});
		}else{
			logger.error("Please complete the form");
		}
	}
  });
