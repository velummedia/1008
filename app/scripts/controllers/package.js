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
        console.log(pages);
        var p = $route.current.params.name;
        angular.forEach(pages,function(a){
            if (a.name.toLowerCase() == p) {
                $scope.pdata = a;
            }
        });
    });
