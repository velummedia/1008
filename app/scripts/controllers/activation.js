'use strict';

/**
 * @ngdoc function
 * @name bmadminApp.controller:ActivationCtrl
 * @description
 * # ActivationCtrl
 * Controller of the bmadminApp
 */
angular.module('bmadminApp')
  .controller('ActivationCtrl', function ($scope,$http,$route,logger,$location) {
    var id = $route.current.params.id;
    var data = {tag:"activeAccount",key:id};
    httpAccess(data,$http).then(function(result){
    	if (result.data.error == 100) {
    		logger.success("Your account has been activated successfully.");
    		$location.path("login");
    	}else{
    		logger.error("The confirmation key is not correct.");
    	}
    });

  });
