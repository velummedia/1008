'use strict';

/**
 * @ngdoc function
 * @name bmadminApp.controller:AllpaymentsuserCtrl
 * @description
 * # AllpaymentsuserCtrl
 * Controller of the bmadminApp
 */
angular.module('bmadminApp')
  .controller('AllpaymentsuserCtrl', function ($scope,$http) {
  	var id = $scope.user.id,
  		data = {tag:"fetchPaymentsUser", id:id};

  	httpAccess(data,$http).then(function(result){
  		$scope.userPayments = result.data.export;
  	});
  });
