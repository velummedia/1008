'use strict';

angular.module('bmadminApp')
.controller('BrowsepackageCtrl', function ($scope,$http,logger,pages) {
	$scope.todayTime = Math.floor(Date.now() / 1000);

	$scope.createMoreInfo = function(n) {
		return n.replace(/\s+/g, '-').toLowerCase();
	}

});
