'use strict';

/**
 * @ngdoc function
 * @name bmadminApp.controller:AdminloginCtrl
 * @description
 * # AdminloginCtrl
 * Controller of the bmadminApp
 */
angular.module('bmadminApp')
  .controller('AdminloginCtrl', function ($scope,$http,$route,$location,logger,$cookies) {
     $scope.login = function(form) {
    	if (form.$valid) {

    		var dataLogin = "pcode=1008&sysname=" + $scope.sysname +"&email=" + form.email.$modelValue + "&password=" + form.password.$modelValue;
	    	httpAccess(dataLogin,"adminLoginAccess",$http).then(function(result){
	    		if (result.data.e == 0 ) {
	    			logger.error("Invalid username and password");
	    		}
	    		if (result.data.e == 100 ) {
	    			var ld = {
						login: true,
						user: result.data.user,
						level: result.data.level
					}
					$cookies.remove('theiapanel');
					$cookies.putObject('theiapanel',ld);

	    			$location.path("allpayments");
	    		}
	    		if (result.data.e == 101 ) {
	    			logger.error("Your user name is banned, contact administrator.");
	    		}
	    	});

    	}else{
    		logger.error("Complete the form");
    	}
    }
  });
