'use strict';
angular.module('bmadminApp')
  .controller('AllusersCtrl', function ($scope,$http,logger) {
  	// 
  	$scope.changeUsers = function(p) {
  		var p = JSON.parse(p);
  		var data = {tag:"fetchUsers",level:$scope.user.level, id:$scope.user.id, sid:p.id};
  		httpAccess(data,$http).then(function(result) {
	  		$scope.users = result.data.export;
	  		$scope.packName = p.name;
	  	});
  	}

  	$scope.disableSystem = function(id,p) {
  		var p = JSON.parse(p);
  		var banData = {
  			tag: "banUserByPackage",
  			aid: $scope.user.id,
  			sid: p.id,
  			uid: id
  		}
  		httpAccess(banData,$http).then(function(result) {
        console.log(result);
        logger.success("User has been banned for the package.");
	  		var data = {tag:"fetchUsers",level:$scope.user.level, id:$scope.user.id, sid:p.id};
	  		httpAccess(data,$http).then(function(result) {
		  		$scope.users = result.data.export;
		  	});
	  	});
  	}
  	$scope.enableSystem = function(id,p) {
		var p = JSON.parse(p);
  		var banData = {
  			tag: "unBanUserByPackage",
  			aid: $scope.user.id,
  			sid: p.id,
  			uid: id
  		}
  		httpAccess(banData,$http).then(function(result) {
        console.log(result);
        logger.success("User has been liffted ban for the package.");
	  		var data = {tag:"fetchUsers",level:$scope.user.level, id:$scope.user.id, sid:p.id};
	  		httpAccess(data,$http).then(function(result) {
		  		$scope.users = result.data.export;
		  	});
	  	});
  	}

  });
