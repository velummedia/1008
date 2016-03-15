'use strict';

/**
 * @ngdoc function
 * @name bmadminApp.controller:ForgotpasswordCtrl
 * @description
 * # ForgotpasswordCtrl
 * Controller of the bmadminApp
 */
angular.module('bmadminApp')
  .controller('ForgotpasswordCtrl', function ($scope,$http,loading,$location,logger) {
    $scope.login = function(form) {
    	if (form.$valid) {
    		loading.show("Please wait ...");
    		var dataLogin = {
	    		tag: "forgotPassword",
	    		email : form.email.$modelValue,
	    	}

	    	httpAccess(dataLogin,$http).then(function(result){
	    		console.log(result);
	    		loading.hide();
	    		if(result.data.error == 0) {
	    			logger.success("Recovering password email has been sent.");
	    		}
	    		if(result.data.error == 100) {
	    			logger.error("Invalid email address.");
	    		}
	    		// $location.path("browsepackage");
	    	});

    	}else{
    		logger.error("Please complete the fields.");
    		$window.scrollTo(0,0);
    	}
    }
  });
