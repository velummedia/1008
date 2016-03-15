'use strict';

/**
 * @ngdoc function
 * @name bmadminApp.controller:ActiveaccountCtrl
 * @description
 * # ActiveaccountCtrl
 * Controller of the bmadminApp
 */
angular.module('bmadminApp')
  .controller('ActiveaccountCtrl', function ($scope,$http,$route,$location,logger) {
    var id = $route.current.params.id;

    $scope.active = function(form) {
    	var pass = form.password.$modelValue,
    		repass = form.repassword.$modelValue;

    	if (pass == repass) {
    		var data = {tag:"editPasswordAdmin", id:id, password:pass};
    		httpAccess(data,$http).then(function(result){
    			$location.path("adminlogin");
    		});
    	}else{
            logger.error("Passwords do not match.");
    	}
    }
  });
