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




    		// var dataLogin = {
	    	// 	tag: "adminLogin",
	    	// 	email : form.email.$modelValue,
	    	// 	password: form.password.$modelValue
	    	// }
	    	// httpAccess(dataLogin,$http).then(function(result){
	    	// 	console.log(result);

	    	// 	if (result.data.error == 0 ) {
	    	// 		if (result.data.export.user.approved == 0 ) {
	    	// 			$location.path("activeaccount/" + result.data.export.user.id);
	    	// 		}else{

	    	// 			window.localStorage["bmadminUser"] = angular.toJson(result.data.export.user);
		    // 			window.localStorage["bmadminlogin"] = 1;
		    // 			window.localStorage["bmadminlevel"] = result.data.export.user.level;
		    // 			window.localStorage['bmadminroles'] = angular.toJson(result.data.export.roles);
		    // 			$location.path("allpayments");
	    	// 		}
	    			
	    	// 	}
	    	// 	if (result.data.error == 100 ) {
	    	// 		logger.error("Invalid username and password");
	    	// 	}
	    	// 	if (result.data.error == 101 ) {
	    	// 		logger.error("Your user name is banned, contact administrator.");
	    	// 	}
	    	// });


    	}else{
    		logger.error("Complete the form");
    	}
    }
  });
