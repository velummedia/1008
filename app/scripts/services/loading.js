'use strict';

angular.module('bmadminApp')
  .factory('loading', function ($timeout,$rootScope) {
    return {
      show: function (msg) {
        $rootScope.loadinMsg = msg;
        $timeout(function() {
            $rootScope.loadingShow = true;
        }, 500);
        
      },
      hide: function() {
        $timeout(function() {
            $rootScope.loadingShow = false;
        }, 500);
      }
    };

  });
