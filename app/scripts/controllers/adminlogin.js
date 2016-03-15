'use strict';

/**
 * @ngdoc function
 * @name bmadminApp.controller:AdminloginCtrl
 * @description
 * # AdminloginCtrl
 * Controller of the bmadminApp
 */
angular.module('bmadminApp')
  .controller('AdminloginCtrl', function ($scope,$http,$route,$location,logger) {
     $scope.login = function(form) {
    	if (form.$valid) {
    		var dataLogin = {
	    		tag: "adminLogin",
	    		email : form.email.$modelValue,
	    		password: form.password.$modelValue
	    	}

	    	httpAccess(dataLogin,$http).then(function(result){
	    		console.log(result);

	    		if (result.data.error == 0 ) {
	    			if (result.data.export.user.approved == 0 ) {
	    				$location.path("activeaccount/" + result.data.export.user.id);
	    			}else{

	    				window.localStorage["bmadminUser"] = angular.toJson(result.data.export.user);
		    			window.localStorage["bmadminlogin"] = 1;
		    			window.localStorage["bmadminlevel"] = result.data.export.user.level;
		    			window.localStorage['bmadminroles'] = angular.toJson(result.data.export.roles);
		    			$location.path("allpayments");
	    			}
	    			
	    		}
	    		if (result.data.error == 100 ) {
	    			logger.error("Invalid username and password");
	    		}
	    		if (result.data.error == 101 ) {
	    			logger.error("Your user name is banned, contact administrator.");
	    		}
	    	});


    	}else{
    		logger.error("Complete the form");
    	}
    }
  });
