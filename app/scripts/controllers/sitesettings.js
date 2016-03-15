'use strict';

angular.module('bmadminApp')
  .controller('SitesettingsCtrl', function ($scope,$http,logger,loading) {

  	// loading.show();
  	var data = {
  		tag: "loadSettings",
  	};
    httpAccess(data,$http).then(function(result){
		// loading.hide();
		console.log(result);
		var d = result.data.export;
		$scope.global = {
			sitename: d.site_name,
			siteurl: d.site_url,
			description: d.site_description,
		}
		$scope.admin = {
			admin_email: d.admin_email,
			support_email: d.support_email
		}
	});


	$scope.saveGlobal = function(form) {
		loading.show();
		if (form.$valid) {

			var url = form.siteurl.$modelValue;
			if (url.indexOf("http://") >= 0) {
				var saveGlobalA = {
					tag: "saveSettings",
					type: "global",
					sitename: form.sitename.$modelValue,
					siteurl: form.siteurl.$modelValue,
					description: form.description.$modelValue,
					uid: $scope.user.id,
					uemail: $scope.user.email,
				}
				httpAccess(saveGlobalA,$http).then(function(result){
					loading.hide();
					console.log(result);
					logger.success("Your changes have been saved successfuly.");
				});
			}else{
				loading.hide();
				logger.error("Site url must start with http://");
			}
		}else{
			loading.hide();
			logger.error("You can't leave form empty.");
		}
	}
	$scope.saveAdmin = function(form) {
		loading.show();
		if (form.$valid) {
			var saveAdminA = {
				tag: "saveSettings",
				type: "admin",
				admin_email: form.admin_email.$modelValue,
				support_email: form.support_email.$modelValue,
				uid: $scope.user.id,
				uemail: $scope.user.email,
			}
			httpAccess(saveAdminA,$http).then(function(result){
				loading.hide();
				console.log(result);
				logger.success("Your changes have been saved successfuly.");
			});
		}else{
			loading.hide();
			logger.error("You can't leave form empty.");
		}
	}
  });
