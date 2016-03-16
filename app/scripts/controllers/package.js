'use strict';

/**
 * @ngdoc function
 * @name bmadminApp.controller:PackageCtrl
 * @description
 * # PackageCtrl
 * Controller of the bmadminApp
 */
angular.module('bmadminApp')
.controller('PackageCtrl', function ($scope,$http,logger,pages,$route) {
    // console.log(pages);
    var p = $route.current.params.name;
    angular.forEach(pages,function(a){
        if (a.name.toLowerCase() == p) {
            $scope.pdata = a;
        }
    });


    var data = {tag:"fetchPackages",approved: "1"}
	httpAccess(data,$http).then(function(result){
		angular.forEach(result.data.export,function(b){
	        if (b.name.replace(/\s+/g, '-').toLowerCase() == p) {
	            $scope.pdata["price"] = b.price;
	            $scope.pdata["pid"] = b.id;
	        }
	    });
	});
    
});
