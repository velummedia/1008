'use strict';

angular.module('bmadminApp')
  .controller('ContactusCtrl', function ($scope,$http,logger,loading) {
    $scope.sendHelpMessage = function(form) {
    	console.log(form);
    	loading.show("Please wait we're sending you message.");
    	if (form.$valid) {
			var msg = {
				tag:"sendHelpMessage",
				name: $scope.user.name,
				email: $scope.user.email,
				subject: form.subject.$modelValue,
				message: form.message.$modelValue,

			};
		    httpAccess(msg,$http).then(function(result) {
		    	loading.hide();
		    	logger.success("You message has been sent.");
		    	var defaultForm = {
				  name : "",
				  // email : "",
				  message: ""
				};
				$scope.helpMessage.$setPristine();
				$scope.helpMessage = defaultForm;
		    });
    	}else{
    		logger.error("Please complete form.");
    		loading.hide();
    	}
    }
    
  });
