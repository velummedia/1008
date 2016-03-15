'use strict';

angular.module('bmadminApp')
  .controller('AllpaymentsCtrl', function ($scope,$http) {
  	var data = {tag:"fetchPayments",level : $scope.user.level , id: $scope.user.id}
  	httpAccess(data,$http).then(function(result) {
  		console.log(result);
  		$scope.users = result.data.export;
  	});
  });
