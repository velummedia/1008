'use strict';

/**
 * @ngdoc function
 * @name bmadminApp.controller:ManageadminsCtrl
 * @description
 * # ManageadminsCtrl
 * Controller of the bmadminApp
 */
angular.module('bmadminApp')
  .controller('ManageadminsCtrl',  function ($scope,$http) {
  	
    var data = {tag:"fetchAdmins"};
  	httpAccess(data,$http).then(function(result) {
  		$scope.admins = result.data.export;
  	});
  });
