'use strict';

/**
 * @ngdoc function
 * @name bmadminApp.controller:AddvipCtrl
 * @description
 * # AddvipCtrl
 * Controller of the bmadminApp
 */
angular.module('bmadminApp')
  .controller('AddvipCtrl', function ($scope,$http,logger) {
    $scope.sendnewpackage = function(form) {
    	var data = {
    		tag:"addToVip", 
    		id:$scope.user.id,
    		email: form.email.$modelValue,
    		plist: form.plist.$modelValue
    	}
		httpAccess(data,$http).then(function(result) {
			if (result.data.error == 0) {
                logger.success("User has been added successfully.");
			}
			if (result.data.error == 102) {
                logger.error("This user has already been added.");
			}
		});
    }
  });
