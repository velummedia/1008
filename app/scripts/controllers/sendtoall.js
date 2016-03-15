'use strict';

/**
 * @ngdoc function
 * @name bmadminApp.controller:SendtoallCtrl
 * @description
 * # SendtoallCtrl
 * Controller of the bmadminApp
 */
angular.module('bmadminApp')
  .controller('SendtoallCtrl', function ($scope,$http) {
    $scope.formSent = function(form) {
    	var data = {
    		tag: 'sendToAll',
    		message: form.message.$modelValue,
    		subject: form.subject.$modelValue
    	}

    	httpAccess(data,$http).then(function(result){
    		console.log(result);
    	});
    }
  });
