'use strict';

/**
 * @ngdoc function
 * @name bmadminApp.controller:SendbulkpackageCtrl
 * @description
 * # SendbulkpackageCtrl
 * Controller of the bmadminApp
 */
angular.module('bmadminApp')
  .controller('SendbulkpackageCtrl', function ($scope,$http) {

    $scope.formSent = function(form) {
    	var data = {
    		tag: 'sendBulkByPackage',
    		sid: form.package.$modelValue,
    		message: form.message.$modelValue,
    		subject: form.subject.$modelValue
    	}

    	httpAccess(data,$http).then(function(result){
    		console.log(result);
    	});
    }

  });
