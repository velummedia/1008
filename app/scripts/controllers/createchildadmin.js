'use strict';

/**
 * @ngdoc function
 * @name bmadminApp.controller:CreatechildadminCtrl
 * @description
 * # CreatechildadminCtrl
 * Controller of the bmadminApp
 */
angular.module('bmadminApp')
  .controller('CreatechildadminCtrl', function ($scope,$http,logger) {
  	//GENERATING PASSWORD//
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
	////////////////////////////////////
	$scope.form = {
		vip: false,
		emailsettings: false,
		refund: false,
		siteinfo: false
	}
	$scope.sendsuperadmin = function(form) {
		var access = $scope.user.roles;
		if (form.$valid) {
			if ($scope.user.roles){

				var data = {
					tag : "createAdmin",
					name : form.name.$modelValue,
					email : form.email.$modelValue,
					phone : form.phone.$modelValue,
					password: $scope.password,
					level: 6,
					access : access,
					vip:form.vip.$modelValue,
					emailsettings:form.emailsettings.$modelValue,
					refund:form.refund.$modelValue,
					siteinfo:form.siteinfo.$modelValue
				}

				httpAccess(data,$http).then(function(result) {
			  		console.log(result);
			  		if (result.data.error == 0 ) {
			  			logger.success("The C-Admin has been added successfully.");
			  		}
			  		if (result.data.error == 102) {
			  			logger.error("This user has been already added.");
			  		}
			  	});
			}else{
				logger.error("Please select at least one package.");
			}
			
		}else{
			logger.error("Please complete the form");
		}
	}
  });
