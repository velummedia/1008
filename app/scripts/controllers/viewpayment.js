'use strict';

/**
 * @ngdoc function
 * @name bmadminApp.controller:ViewpaymentCtrl
 * @description
 * # ViewpaymentCtrl
 * Controller of the bmadminApp
 */
angular.module('bmadminApp')
  .controller('ViewpaymentCtrl', function ($scope,$route,$http,$modal) {
    var id= $route.current.params.id;
    var data = {tag:"fetchSinglePayment",id : id};

  	httpAccess(data,$http).then(function(result) {
  		console.log(result);
  		$scope.result = result.data.export;
  	});


  	$scope.refund = function(pid) {
  		var items = {pid:pid}
  		var modalInstance = $modal.open({
	      templateUrl: 'myModalContent.html',
	      controller: 'ModalInstanceCtrl',
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
	    		tag: "refundPayment",
	    		pid: selectedItem,
	    		aid: $scope.user.id
	    	}
	    	httpAccess(redundData,$http).then(function(result) {
		  		console.log(result);
		  		alert("refund has been saved successfully.");
		  		httpAccess(data,$http).then(function(result) {
			  		$scope.result = result.data.export;
			  	});
		  	});
	    }, function () {

	    });
  	}
  })
  .controller('ModalInstanceCtrl', function ($scope, $modalInstance, items) {

	  $scope.items = items;

	  $scope.approve = function () {
	    $modalInstance.close(items.pid);
	  };

	  $scope.cancel = function () {
	    $modalInstance.dismiss('cancel');
	  };
  });
