'use strict';

angular.module('bmadminApp')
  .controller('VloginCtrl', function ($scope,$http,$location,logger) {
    $scope.login = function(form) {
    	if (form.$valid) {
    		var dataLogin = {
	    		tag: "visitorLogin",
	    		email : form.email.$modelValue,
	    		password: form.password.$modelValue
	    	}

	    	httpAccess(dataLogin,$http).then(function(result){
	    		console.log(result);
	    		if (result.data.error == 0 ) {
	    			window.localStorage["bmadminUser"] = angular.toJson(result.data.export);
	    			window.localStorage["bmadminlogin"] = 1;
	    			window.localStorage["bmadminlevel"] = 9;
	    			$location.path("vdash");
	    		}else{
	    			logger.error("Invalid username or password.");
	    		}
	    	});

    	}else{
    		logger.error("Please complete the fields.");
    	}
    }
  });
