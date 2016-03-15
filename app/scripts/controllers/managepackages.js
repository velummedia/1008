'use strict';

/**
 * @ngdoc function
 * @name bmadminApp.controller:ManagepackagesCtrl
 * @description
 * # ManagepackagesCtrl
 * Controller of the bmadminApp
 */
angular.module('bmadminApp')
  .controller('ManagepackagesCtrl', function ($scope,$http) {
  	var data = {tag:"loadPackagesAdmin"}
  	httpAccess(data,$http).then(function(result){
  		console.log(result);
  		$scope.packagesList = result.data.export;
  	});
  	$scope.disableSystem = function(d) {
  		var disPackage = {tag:"disableSystem", id:d};
  		httpAccess(disPackage,$http).then(function(result){
  			if (result.data.error == 0) {
  				alert("System has been disabled successfully.");
  				httpAccess(data,$http).then(function(result){
			  		$scope.packagesList = result.data.export;
			  	});
  			}
  		});
  	}
  	$scope.enableSystem = function(d) {
  		var enPackage = {tag:"enableSystem", id:d};
  		httpAccess(enPackage,$http).then(function(result){
  			console.log(result);
  			if (result.data.error == 0) {
  				alert("System has been enabled successfully.");
  				httpAccess(data,$http).then(function(result){
			  		$scope.packagesList = result.data.export;
			  	});
  			}
  		});
  	}
    
  });
