'use strict';

/**
 * @ngdoc function
 * @name bmadminApp.controller:EditpackageCtrl
 * @description
 * # EditpackageCtrl
 * Controller of the bmadminApp
 */
angular.module('bmadminApp')
  .controller('EditpackageCtrl', function ($scope,$http,$route,logger) {
    $scope.open = function($event) {
		$scope.opened = true;
	};

	$scope.open1 = function($event) {
		$scope.opened1 = true;
	};

    var id = $route.current.params.id,
    	data = {tag:"loadSinglePackage", id:id};

    httpAccess(data,$http).then(function(result){
    	if (result.data.error == 0) {
    		var d = result.data.export;
    		$scope.form = {
    			name: d.name,
    			desc: d.description,
    			price: d.price,
    			sdate: d.start_date*1000,
    			edate: d.end_date*1000,
    			checkyes: d.coupon
    		};

    		if (d.coupon == 1) {
    			var getCoupon = {tag:"loadCouponsList",id:d.id};
    			httpAccess(getCoupon,$http).then(function(result){
    				console.log(result);
    				$scope.coupons = result.data.export;
    			});
    		}
    	}else{
            logger.error("Cannot find package.");
    	}
    });


    var coupon = [1];
    $scope.couponArray = coupon;

    $scope.addCoupon = function() {
    	var l = coupon[coupon.length-1];
    	coupon.push(l+1);
    	$scope.couponArray = coupon;
    }

    $scope.removeCoupan = function(d) {
    	coupon.splice(d, 1);
    	$scope.coupon = coupon;
    }

    $scope.sendnewpackage = function(form) {
    	if (form.$valid) {
    		var editC = {
    			tag: "editSystem",
    			name: form.name.$modelValue,
    			description: form.desc.$modelValue,
    			price: form.price.$modelValue,
    			start_date: Date.parse(form.sdate.$modelValue)/1000,
    			end_date: Date.parse(form.edate.$modelValue)/1000,
    			id: id
    		}

    		if (form.checkyes.$modelValue) {
    			var coupansToSend = [];
    			angular.forEach(coupon, function(index) {
				  coupansToSend.push({
				  	ctag: $scope.form.coupontag[index],
				  	cprice: $scope.form.couponprice[index]
				  })
				});
    			console.log(coupansToSend);
				editC["coupons"] = coupansToSend;
    		}

    		httpAccess(editC,$http).then(function(result) {
    			console.log(result);
    			if (result.data.error == 0) {
                    logger.success("The package has been updated successfully.");
    			}else{
                    logger.error("There's an unknown error");
    			}
    		});


    	}else{

    	}
    }

  });
