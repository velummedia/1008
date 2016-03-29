'use strict';

/**
 * @ngdoc function
 * @name bmadminApp.controller:PrevpackageCtrl
 * @description
 * # PrevpackageCtrl
 * Controller of the bmadminApp
 */
angular.module('bmadminApp')
.controller('PrevpackageCtrl', function ($scope,$http,logger) {
	var pack = JSON.parse(window.localStorage["tempPackage"]);

	console.log(pack);
});
