'use strict';

/**
 * @ngdoc function
 * @name bmadminApp.controller:AddnewpackageCtrl
 * @description
 * # AddnewpackageCtrl
 * Controller of the bmadminApp
 */
angular.module('bmadminApp')
  .controller('AddnewpackageCtrl', function ($scope,$http,logger) {
    var coupon = [1];
    $scope.couponArray = coupon;

    $scope.open = function($event) {
		$scope.opened = true;
	};

	$scope.open1 = function($event) {
		$scope.opened1 = true;
	};

    $scope.addCoupon = function() {
    	var l = coupon[coupon.length-1];
    	coupon.push(l+1);
    	$scope.couponArray = coupon;
    }

    $scope.removeCoupan = function(d) {
    	var r = d.$index+1;
    	coupon.splice(r, 1);
    	$scope.coupon = coupon;
    }

    $scope.sendnewpackage = function(form) {
    	if (form.$valid) {
    		var data = {
    			tag: "createNewSystem",
    			name: form.name.$modelValue,
    			description: form.desc.$modelValue,
                price: form.price.$modelValue,
                url: form.url.$modelValue,
    			loginurl: form.loginurl.$modelValue,
    			start_date: Date.parse(form.sdate.$modelValue)/1000,
    			end_date: Date.parse(form.edate.$modelValue)/1000,
    			uid: 1,
    		}

    		if (form.checkyes.$modelValue) {
    			var coupansToSend = [];
    			angular.forEach(coupon, function(index) {
				  coupansToSend.push({
				  	ctag: $scope.form.coupontag[index],
				  	cprice: $scope.form.couponprice[index]
				  })
				});

				data["coupons"] = coupansToSend;
    		}

    		httpAccess(data,$http).then(function(result) {
    			if (result.data.error == 0) {
                    logger.success("The package has been added successfully.")
                    
                    var defaultForm = {
                        name:'',
                        description:'',
                        price:'',
                        url:'',
                        loginurl:'',
                    };
                    $scope.addnewpackage.$setPristine();
                    $scope.addnewpackage = defaultForm;
    			}else{
                    logger.error("There's an error with adding the package.");
    			}
    		});


    	}else{

    	}
    }

  });
