'use strict';

/**
 * @ngdoc function
 * @name bmadminApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the bmadminApp
 */
angular.module('bmadminApp')
  .controller('LoginCtrl', function ($scope,$http,$route,$location,logger,loading,$window,$rootScope) {

  	$scope.blurForm = function(i,d) {
  		console.log(d);
  		switch(i) {
  			case 'name':
  				if (d == undefined) {
  					$scope.name_fieldSuccess = 0;
  				}else{
  					if (d.length > 2) {
	  					$scope.name_fieldSuccess = 1;
	  				}else{
	  					$scope.name_fieldSuccess = 0;
	  				}
  				}
  			break;
  			case 'email':
  				if (d == undefined) {
  					$scope.email_fieldSuccess = 0;
  				}else{
  					if (d.length > 2) {
	  					$scope.email_fieldSuccess = 1;
	  				}else{
	  					$scope.email_fieldSuccess = 0;
	  				}
  				}
  			break;
  			case 'password':
  				if (d == undefined) {
  					$scope.password_fieldSuccess = 0;
  				}else{
	  				$scope.password_fieldSuccess = 1;
  				}
  			break;
  		}

  	}

  	var key = $route.current.params.key;
  	
    $scope.hideLoginSection = true;
  	$scope.hideRegisterSection = false;
  	$rootScope.loginSectionActive = true;

    $scope.signup = function(form) {
    	console.log(form);
    	if (form.$valid) {
    		loading.show("Please wait ...");
    		if ( form.password.$modelValue == form.repassword.$modelValue) {
    			var data = {
		    		tag: "signup",
		    		name: form.name.$modelValue,
		    		email: form.email.$modelValue,
		    		phone: form.phone.$modelValue,
		    		password: form.password.$modelValue,
		    		ref : false
		    	}
		    	if (key) {
			  		data["ref"] = true;
			  	}

		    	httpAccess(data,$http).then(function(result){
		    		if (result.data.error == 0 ) {
		    			logger.success("Thank You");
		    			var dataLogin = {
				    		tag: "login",
				    		email : form.email.$modelValue,
				    		password: form.password.$modelValue,
				    		ref: 0
				    	}
				    	httpAccess(dataLogin,$http).then(function(result){
				    		console.log(result);
				    		loading.hide();
				    		if (result.data.error == 0 ) {
				    			window.localStorage["bmadminUser"] = angular.toJson(result.data.export.user);
				    			window.localStorage["bmadminlogin"] = 1;
				    			window.localStorage["bmadminlevel"] = result.data.export.user.level;
				    			$scope.userLogin = true;
				    			$location.path("browsepackage");
				    		}else{
				    			logger.error("Invalid username or password.");
				    			$window.scrollTo(0,0);
				    			loading.hide();
				    		}
				    	});
		    		}else{
		    			logger.error("This email address already has been registered.");
						$window.scrollTo(0,0);
		    			loading.hide();
		    		}
		    	});
    		}else{
	    		logger.error("Passwords do not match.");
	    		$window.scrollTo(0,0);
	    		loading.hide();
		    }
    	}else{
    		var containsDigits = /[0-9]/.test(form.password.$modelValue)
			var containsUpper = /[A-Z]/.test(form.password.$modelValue)
			var containsLower = /[a-z]/.test(form.password.$modelValue)
			console.log(form.password.$modelValue);
			console.log(containsDigits);
			console.log(containsUpper);
			console.log(containsUpper);

    		if (form.password.$invalid) {
    			logger.error("Password is invalid.");
    		}else{
    			logger.error("Please complete the form.");
    		}
    		$window.scrollTo(0,0);
    		loading.hide();
    	}
    }

    $scope.login = function(form) {
    	if (form.$valid) {
    		loading.show("Please wait ...");
    		var dataLogin = {
	    		tag: "login",
	    		email : form.email.$modelValue,
	    		password: form.password.$modelValue,
	    		ref: 0
	    	}
	    	if (key) {
		  		dataLogin["ref"] = key;
		  	}

	    	httpAccess(dataLogin,$http).then(function(result){
	    		console.log(result);
	    		if (result.data.error == 0 ) {
	    			window.localStorage["bmadminUser"] = angular.toJson(result.data.export.user);
	    			window.localStorage["bmadminlogin"] = 1;
	    			window.localStorage["bmadminlevel"] = result.data.export.user.level;
	    			switch(result.data.export.ref.error) {
	    				case 100:
	    					$location.path("browsepackage");
	    				break;
	    				case 20:
	    					$location.path("browsepackage");
	    					logger.error("The package is disabled right now.");
	    				break;
	    				case 21:
	    					$location.path("browsepackage");
	    					logger.error("You've already registered this package.");
	    				break;
	    				case 0:
	    					$location.path("paymentsuser/" + result.data.export.ref.pid);
	    				break;
	    				
	    			}
	    			loading.hide();
	    		}else{
	    			logger.error("Invalid username or password.");
	    			$window.scrollTo(0,0);
	    			loading.hide();
	    		}
	    	});

    	}else{
    		logger.error("Please complete the fields.");
    		$window.scrollTo(0,0);
    	}
    }


    $scope.hideLoginSectionButton = function() {
    	$scope.hideLoginSection = true;
    	$scope.hideRegisterSection = false;
    }
    $scope.hideRegisterSectionButton = function() {
    	$scope.hideLoginSection = false;
    	$scope.hideRegisterSection = true;
    }


    if(window.localStorage["bmadminlogin"] == 1) {
    	$location.path("browsepackage");
    }
    

  });
