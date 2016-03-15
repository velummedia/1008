'use strict';

/**
 * @ngdoc function
 * @name bmadminApp.controller:ResetpasswordCtrl
 * @description
 * # ResetpasswordCtrl
 * Controller of the bmadminApp
 */
angular.module('bmadminApp')
  .controller('ResetpasswordCtrl', function ($scope,$http,logger,$location,$route,loading) {
    var key = $route.current.params.id;
    
    var checkKeyData = {
    	tag: "checkKeyData",
    	key: key
    }
    httpAccess(checkKeyData,$http).then(function(result){
		console.log(result);
		if(result.data.error == 404) {
			logger.error("The key is invalid or session is expired.");
			$location.path("login");
		}
	});

    $scope.login = function(form) {

    	if (form.$valid) {
    		loading.show("Please wait ...");
    		if ( form.password.$modelValue == form.repassword.$modelValue) {
	    		var dataLogin = {
		    		tag: "resetPassword",
		    		key : key,
		    		password : form.password.$modelValue
		    	}

		    	httpAccess(dataLogin,$http).then(function(result){
		    		console.log(result);
		    		loading.hide();
		    		if(result.data.error == 0) {
		    			logger.success("Your password has been changed. Please login.");
		    			$location.path("browsepackage");
		    		}
		    		if(result.data.error == 100) {
		    			logger.error("The key is invalid");
		    		}
		    	});

		    }else{
	    		logger.error("Passwords do not match.");
	    		$window.scrollTo(0,0);
	    		loading.hide();
		    }

    	}else{
    		logger.error("Please complete the fields.");
    		$window.scrollTo(0,0);
    	}
    }
  });
