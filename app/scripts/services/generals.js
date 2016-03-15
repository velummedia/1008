'use strict';

angular.module('bmadminApp')
  .service('generals', function ($rootScope) {
    return {
    	// rootDir : "/Users/viki-mac/Sites/BMAdmin_Back/",
    	rootUrl : "http://bmtracker.com/bmadmin/",
    	// httpUrl : "http://localhost/~viki-mac/BMAdmin_Back/connect.php",
    }
    
  });
