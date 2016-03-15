'use strict';

/**
 * @ngdoc function
 * @name bmadminApp.controller:EmailsettingsCtrl
 * @description
 * # EmailsettingsCtrl
 * Controller of the bmadminApp
 */
angular.module('bmadminApp')
  .controller('EmailsettingsCtrl', function ($scope,$http,$modal,logger) {
    $scope.open = function(content) {
    	var getEmailData = {
    		tag: "getEmailContent",
    		email: content
    	}

    	httpAccess(getEmailData,$http).then(function(result) {
    		var items = {content:result.data.export}
	    	var modalInstance = $modal.open({
		      templateUrl: 'editemail.html',
		      controller: 'EditEmailCtrl',
		      windowClass: 'modal-class',
		      backdrop: 'static',
		      resolve: {
		        items: function () {
		          return items;
		        }
		      }
		    });

		    modalInstance.result.then(function (selectedItem) {
		    	var redundData = {
		    		tag: "editEmail",
		    		email: content,
		    		content: selectedItem
		    	}
		    	httpAccess(redundData,$http).then(function(result) {
		    		console.log(result);
		    		logger.success("Email's content has been changed.");
			  	});
		    }, function () {

		    });
    	});



	    
    }
    
  })
  .controller('EditEmailCtrl', function ($scope, $modalInstance, items) {

	  $scope.message = items.content;

	  $scope.approve = function () {
	    $modalInstance.close($scope.message);
	  };

	  $scope.cancel = function () {
	    $modalInstance.dismiss('cancel');
	  };
  });
