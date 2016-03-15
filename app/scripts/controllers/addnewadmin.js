'use strict';

/**
 * @ngdoc function
 * @name bmadminApp.controller:AddnewadminCtrl
 * @description
 * # AddnewadminCtrl
 * Controller of the bmadminApp
 */
angular.module('bmadminApp')
  .controller('AddnewadminCtrl', function ($scope,$http,logger) {
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
	////////////////////////////////////////////////////////////////////////////////
	$scope.form = {
		adminLevel: "5",
	}

	$scope.formSent = function(form) {
		if (form.$valid) {
			var data = {
				tag : "createAdmin2",
				name : form.name.$modelValue,
				email : form.email.$modelValue,
				phone : form.phone.$modelValue,
				password: $scope.password,
				level: form.adminLevel.$modelValue,
				plist: form.selectedPackage.$modelValue,
			}
			httpAccess(data,$http).then(function(result) {
		  		if (result.data.error == 0 ) {
		  			logger.success("The admin has been added successfully");
		  		}
		  		if (result.data.error == 102) {
		  			logger.error("This admin has been already added.");
		  		}
		  	});
		}else{
			logger.error("Please complete the form");
		}
	}
  });
