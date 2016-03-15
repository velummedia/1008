'use strict';

/**
 * @ngdoc function
 * @name bmadminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the bmadminApp
 */
angular.module('bmadminApp')
  .controller('MainCtrl', function ($scope,$http,logger,pages) {
      $scope.todayTime = Math.floor(Date.now() / 1000);
      var data = {tag:"fetchPackagesUsers", id:$scope.user.id, email:$scope.user.email}
      httpAccess(data,$http).then(function(result) {
          console.log(result);
          $scope.packages = result.data.export;
      });
      $scope.createMoreInfo = function(n) {
          return n.replace(/\s+/g, '-').toLowerCase();
      }
      $scope.loadBackgroundImage = function(n) {
          var e = "";
          angular.forEach(pages,function(a){
              if (a.name.toLowerCase() == n.replace(/\s+/g, '-').toLowerCase()) {
                  e = a.cover;
              }
          });
          return e;
      }
  });
