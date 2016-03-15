'use strict';

/**
 * @ngdoc function
 * @name bmadminApp.controller:EditadminsCtrl
 * @description
 * # EditadminsCtrl
 * Controller of the bmadminApp
 */
angular.module('bmadminApp')
  .controller('EditadminsCtrl', function ($scope,$route,$http,logger) {
    var id = $route.current.params.id;
    var data = {tag:"fetchSingleAdmin",id : id};


    httpAccess(data,$http).then(function(result) {
  		console.log(result);
  		$scope.result = result.data.export;
  		var user = result.data.export.adminProfile.export;
  		$scope.form = {
  			'name': user.name,
  			'email' : user.email,
  			'phone' : user.phone
  		}

  		$scope.packages = result.data.export.adminAccess;
      console.log($scope.packages);
  	});

  	$scope.editProfile = function(form) {
  		if (form.$valid) {

  			var data = {
  				tag: "editAdminProfile",
  				id: id,
  				name: form.name.$modelValue,
  				email: form.email.$modelValue,
  				phone: form.phone.$modelValue,
  				aid: $scope.user.id
  			};
  			httpAccess(data,$http).then(function(result) {
		  		console.log(result);
		  		logger.success("Profile has been changed. ");
		  	});

  		}else{
  			logger.error("Please complete the form");
  		}
  	}

    $scope.banpackage = function(item,admin) {
      var sid = item.package.id;
      var banData = {
        tag: "banAdminByPackage",
        sid: sid,
        aid: $scope.user.id,
        taid: admin
      };
      httpAccess(banData,$http).then(function(result) {
        console.log(result);
        logger.success("Access status was changed.");

        httpAccess(data,$http).then(function(result) {
          $scope.result = result.data.export;
          var user = result.data.export.adminProfile.export;
          $scope.form = {
            'name': user.name,
            'email' : user.email,
            'phone' : user.phone
          }
          $scope.packages = result.data.export.adminAccess;
        });
      });
    }

    $scope.unbanpackage = function(item,admin) {
      var sid = item.package.id;
      var unbanData = {
        tag: "unBanAdminByPackage",
        sid: sid,
        aid: $scope.user.id,
        taid: admin
      };
      httpAccess(unbanData,$http).then(function(result) {
        console.log(result);
        logger.success("Access status was changed.");

        httpAccess(data,$http).then(function(result) {
          $scope.result = result.data.export;
          var user = result.data.export.adminProfile.export;
          $scope.form = {
            'name': user.name,
            'email' : user.email,
            'phone' : user.phone
          }
          $scope.packages = result.data.export.adminAccess;
        });
      });
    }
  });
