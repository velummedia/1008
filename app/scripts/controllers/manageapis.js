'use strict';

angular.module('bmadminApp')
  .controller('ManageapisCtrl', function ($scope,$http) {
    var data = {tag:"loadApisList"}
  	httpAccess(data,$http).then(function(result){
  		console.log(result);
  		$scope.apis = result.data.export;
  	});
  });
