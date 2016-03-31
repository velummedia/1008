'use strict';

/**
 * @ngdoc function
 * @name bmadminApp.controller:PackageCtrl
 * @description
 * # PackageCtrl
 * Controller of the bmadminApp
 */
angular.module('bmadminApp')
.controller('PackageCtrl', function ($scope,$http,logger,pages,$route,fgDelegate,$timeout) {
    var p = $route.current.params.name;
    // console.log(p.replace(/-|\s/g," ").toLowerCase());
    $scope.$watch("packages",function(a) {
    	angular.forEach(a,function(i){
    		if (i.title.toLowerCase() == p.replace(/-|\s/g," ")) {
    			$scope.packageData = i;
    		}
    	});
    });
    
    var flow;
    $timeout( function(){
		flow = fgDelegate.new({
		  name:"demoGird",
		  minItemWidth:200,
		  container: document.getElementById("demogrid"),
		  itemSelector:".flowGridItem",
		})
	},300);




});
