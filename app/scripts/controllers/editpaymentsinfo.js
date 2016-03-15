'use strict';

/**
 * @ngdoc function
 * @name bmadminApp.controller:EditpaymentsinfoCtrl
 * @description
 * # EditpaymentsinfoCtrl
 * Controller of the bmadminApp
 */
angular.module('bmadminApp')
  .controller('EditpaymentsinfoCtrl', function ($scope,$http,logger,loading) {
    var data = {tag:"fetchUserCards",id:$scope.user.id};
    httpAccess(data,$http).then(function(result){
    	$scope.customerId = result.data.export.export.cus_id;
    	$scope.userId = result.data.export.export.uid;
    	$scope.userCards = result.data.export.cards;
    });

    $scope.removeCard = function(cardId) {
        loading.show("Please wait ...");
    	var removeCard = {
    		tag:"removeCustomerCard",
    		cardId: cardId,
    		customerId: $scope.customerId,
    		userId: $scope.userId
    	};
	    httpAccess(removeCard,$http).then(function(result){
            loading.hide();
	    	logger.success("You card has been removed successfully.");
            httpAccess(data,$http).then(function(result){
                $scope.customerId = result.data.export.export.cus_id;
                $scope.userId = result.data.export.export.uid;
                $scope.userCards = result.data.export.cards;
            });
	    });
    }
  });
