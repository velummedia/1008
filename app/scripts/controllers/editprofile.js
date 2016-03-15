'use strict';

/**
 * @ngdoc function
 * @name bmadminApp.controller:EditprofileCtrl
 * @description
 * # EditprofileCtrl
 * Controller of the bmadminApp
 */
angular.module('bmadminApp')
  .controller('EditprofileCtrl', function ($scope,$http,$route,logger,loading,$modal) {
    var u = $scope.user;
    $scope.form = {
    	name: u.name,
    	email: u.email,
    	phone: u.phone
    }

    var loadCardData = {tag:"fetchUserCards",id:$scope.user.id};
    httpAccess(loadCardData,$http).then(function(result){
    	$scope.customerId = result.data.export.export.cus_id;
    	$scope.userId = result.data.export.export.uid;
    	$scope.userCards = result.data.export.cards;
    });

    $scope.removeCard = function(cardId) {
        var items = {id:cardId};
        var modalInstance = $modal.open({
          templateUrl: 'myModalContent.html',
          controller: 'ModalInstance1Ctrl',
          windowClass: 'modal-class',
          backdrop: 'static',
          resolve: {
            items: function () {
              return items;
            }
          }
        });

        modalInstance.result.then(function (selectedItem) {
            loading.show("Please wait ...");
            var removeCard = {
                tag:"removeCustomerCard",
                cardId: selectedItem,
                customerId: $scope.customerId,
                userId: $scope.userId
            };
            httpAccess(removeCard,$http).then(function(result){
                loading.hide();
                logger.success("You card has been removed successfully.");
                httpAccess(loadCardData,$http).then(function(result){
                    $scope.customerId = result.data.export.export.cus_id;
                    $scope.userId = result.data.export.export.uid;
                    $scope.userCards = result.data.export.cards;
                });
            });
        }, function () {
        });
    }

    $scope.editProfile = function(form) {
    	if (form.$valid) {
			var data = {
	    		tag: "editProfileUser",
	    		id: $scope.user.id
	    	}
	    	switch(form.$name) {
	    		case "nameForm":
	    			data["name"] = form.name.$modelValue;
	    			data["phone"] = $scope.user.phone;
	    			data["email"] = $scope.user.email;
	    		break;
	    		case "emailForm":
	    			data["email"] = form.email.$modelValue;
	    			data["phone"] = $scope.user.phone;
	    			data["name"] = $scope.user.name;
	    		break;
	    		case "phoneForm":
	    			data["phone"] = form.phone.$modelValue;
	    			data["name"] = $scope.user.name;
	    			data["email"] = $scope.user.email;
	    		break;
	    	}
	    	httpAccess(data,$http).then(function(result){
	    		if (result.data.error == 0 ) {
	    			logger.success("Profile updated Successfull");
	    			window.localStorage["bmadminUser"] = angular.toJson(result.data.export);
	    			$route.reload();
	    		}
	    	});
    	}else{
    		logger.error("Please complete the form");
    	}
    }
    $scope.passUser = function(form) {
    	if (form.$valid) {
    		if ( form.password.$modelValue == form.repassword.$modelValue) {
    			var data = {
		    		tag: "editPasswordUser",
		    		password: form.password.$modelValue,
		    		id: $scope.user.id
		    	}

		    	httpAccess(data,$http).then(function(result){
		    		if (result.data.error == 0 ) {
		    			logger.success("Your password has been changed. ");
		    			$route.reload();
		    		}
		    	});
    		}else{
	    		logger.error("Password and retype is wrong");
		    }
    	}else{
    		logger.error("Please complete the form");
    	}
    }

    $scope.openEditModal = function(t) {
    	switch(t) {
    		case "name": 
    			$scope.nameEdit = true;
    		break;
    		case "email": 
    			$scope.emailEdit = true;
    		break;
    		case "phone": 
    			$scope.phoneEdit = true;
    		break;
    		case "password": 
    			$scope.passwordEdit = true;
    		break;
    	}
    }
    $scope.closeEditModal = function(t) {
    	switch(t) {
    		case "name": 
    			$scope.nameEdit = false;
    		break;
    		case "email": 
    			$scope.emailEdit = false;
    		break;
    		case "phone": 
    			$scope.phoneEdit = false;
    		break;
    		case "password": 
    			$scope.passwordEdit = false;
    		break;
    	}
    }



  })
.controller('ModalInstance1Ctrl', function ($scope, $modalInstance, items) {

      $scope.items = items;

      $scope.approve = function () {
        $modalInstance.close(items.id);
      };

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
  });
