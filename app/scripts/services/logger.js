'use strict';
angular.module('bmadminApp')
  .factory('logger', function ($timeout,$rootScope) {

    return {
      error: function (msg) {
        $rootScope.errorMsg = msg;
        $rootScope.errorType = 'error';
        $timeout(function() {
            $rootScope.errorShowing = true;
        }, 500);
        $timeout(function() {
            $rootScope.errorShowing = false;
        }, 5000);
      },
      success: function (msg) {
        $rootScope.errorMsg = msg;
        $rootScope.errorType = 'success';
        $timeout(function() {
            $rootScope.errorShowing = true;
        }, 500);
        $timeout(function() {
            $rootScope.errorShowing = false;
        }, 5000);
      }
    };
  });
