'use strict';

angular.module('bmadminApp')
  .controller('PaymentsuserCtrl', function ($scope,$http,$route,$location,logger,loading,$window,$modal) {
  	
    var checkStatusUser = {
      tag: "userAccessPackage",
      pid: $route.current.params.id,
      uid: $scope.user.id
    }

    httpAccess(checkStatusUser,$http).then(function(result){
      if (result.data.error == 1) {
        logger.error("you have already bought this package.");
        $location.path("browsepackage");
      }
    });

    $scope.form = {
      prevCard: "0",
      saveC: false,
    }

    $scope.donePayment = false;
    $scope.goPayment = true;
    $scope.sidebarShowPayment = true;


  	$scope.couponActive = false;
    $scope.discount = 0;

    $scope.prevCardShow = false;

    $scope.addNewCard = function() {
      $scope.prevCardShow = true;
      $scope.form = {
        prevCard: "0",
        saveC: false
      }
    }
    $scope.oldCard = function(i) {
      console.log(i);
      if (i !== 0) {
        $scope.prevCardShow = false;
      }
    }


    $scope.openCvv = function() {
      var modalInstance = $modal.open({
        templateUrl: 'cvv.html',
        controller: 'cvvCtrl',
        windowClass: 'modal-class',
      });
    }


    //CHECK PAYPAL PAYMENT PROCCESS//
    var status = $route.current.params.status;
    if (status == 0) {
      logger.error("The payment has been canceled by you!");
      $window.scrollTo(0,0)
    }
    if (status ==1) {
      loading.show("Please wait while we proccessing your payments.");
      //Search Payment Info//
      var searchPaymentInfo = {
        tag:"fetchPaypalPayment",
        pid:$route.current.params.id , 
        uid: $scope.user.id,
        userEmail: $scope.user.email,
        userName: $scope.user.name
      };
      httpAccess(searchPaymentInfo,$http).then(function(result){
        console.log(result);
        loading.hide();
        $scope.invoiceId = result.data.export.user_invoice;
        $scope.donePayment = true;
        $scope.goPayment = false;
      });
    }
    ////////////////////////////////

  	var id = $route.current.params.id,
  		data = {tag:"loadSinglePackage", id:id};

  	httpAccess(data,$http).then(function(result){
  		$scope.package = result.data.export;
  		$scope.totalAmount = result.data.export.price;
      // $scope.vipUserAccess = true;
      // $scope.goPayment = false;
      if (result.data.export.price == 0) {
        $scope.vipUserAccess = true;
        $scope.goPayment = false;
      }
  	});

    var checkVip = {tag: "checkUserVip", sid: id, email:$scope.user.email}
    httpAccess(checkVip,$http).then(function(result){
      if (result.data.export.vip) {
        $scope.vipUserAccess = true;
        $scope.goPayment = false;
      }
    });


    $scope.vipBuy = function() {
      loading.show("Please wait while we proccessing your payments.");
      var checkVip = {tag: "checkUserVip", sid: $scope.package.id, email:$scope.user.email}
      httpAccess(checkVip,$http).then(function(result){
        if (result.data.export.vip) {
          var go = {
            tag: "goThroughVip",
            id: $scope.user.id,
            sid: $scope.package.id,
            price: $scope.package.price,
            userName: $scope.user.name,
            userEmail: $scope.user.email,
            vip: result.data.export.id
          }
          httpAccess(go,$http).then(function(result){
            console.log(result);
            // console.log(result);
            $scope.invoiceId = result.data.export.invoice;
            $scope.donePayment = true;
            $scope.goPayment = false;
            $scope.vipUserAccess = false;
            $scope.sidebarShowPayment = false;
            loading.hide();
          });
        }
      });
    }

  	var customerId = 0,
  		loadCards = {tag:"fetchUserCards", id:$scope.user.id};
  	httpAccess(loadCards,$http).then(function(result){
      if (result.data.error == 100 ){
        $scope.userCards = 0;
        customerId = 0;
      }else{
        $scope.userCards = result.data.export.cards;
        customerId = result.data.export.export.cus_id;
      }
  		
  	});

    $scope.cancel = function() {
      $location.path("browsepackage");
    }

    $scope.zeroPrice = false;
    var couponTag = 0;
  	$scope.addCoupon = function(tag) {
  		var loadCoupon = {tag:"loadCoupons", coupon:tag , id:$scope.package.id};
  		httpAccess(loadCoupon,$http).then(function(result){

  			if (result.data.error == 0) {
  				var findDis = parseInt($scope.totalAmount) - parseInt(result.data.export.price);
  				$scope.discount = "-" + findDis;
  				$scope.totalAmount = result.data.export.price;
          if ($scope.totalAmount == 0) {
            $scope.zeroPrice = true;
          }
  				$scope.couponActive = true;
          couponTag = tag;
  			}else{
  				logger.error("The coupon key is invalid.");
          $window.scrollTo(0,0);
  			}
	  	});
  	}


  	$scope.sendpaymentsuser = function(form) {  
  		if ($scope.totalAmount == 0) {
        var sendData = {
          tag: "createFreePayment",
          desc: $scope.package.description,
          price: $scope.totalAmount,
          sid: $scope.package.id,
          uid: $scope.user.id,
          cus: customerId,
          coupon: couponTag,
          userName: $scope.user.name,
          userEmail: $scope.user.email,
          savecard: 0
        }
        httpAccess(sendData,$http).then(function(result){
          console.log(result);
          loading.hide();
          $scope.invoiceId = result.data.export.invoice;
          $scope.donePayment = true;
          $scope.goPayment = false;
          $scope.sidebarShowPayment = false;
          loading.hide();
        });
      }else{
        if (form.$valid) {
          var sendData = {
            tag: "createPayment",
            desc: $scope.package.description,
            price: $scope.totalAmount,
            sid: $scope.package.id,
            uid: $scope.user.id,
            cus: customerId,
            coupon: couponTag,
            userName: $scope.user.name,
            userEmail: $scope.user.email,
            savecard: 0
          }

          var err = 0;
          if ($scope.prevCardShow) {
            if (form.exmonth.$modelValue !== 0 && form.exyear.$modelValue !== 0 && form.cvc.$modelValue && form.cardno.$modelValue) {
              sendData["card"] = 0;
              sendData["cardNo"] = form.cardno.$modelValue;
              sendData["exM"] = form.exmonth.$modelValue;
              sendData["exY"] = form.exyear.$modelValue;
              sendData["cvc"] = form.cvc.$modelValue;
              if (form.saveC.$modelValue){
                sendData["savecard"] = 1;
              }else{
                sendData["savecard"] = 0;
              }
            }else{
              err = 1;
            }
          }else{
            sendData["card"] = form.prevCard.$modelValue;
            sendData["cardNo"] = 0;
            sendData["exM"] = 0;
            sendData["exY"] = 0;
            sendData["cvc"] = 0;
          }

          if ( err == 0 ) {
            // console.log(sendData);
            loading.show("Please wait while we proccessing your payments.");
            httpAccess(sendData,$http).then(function(result){
              console.log(result);
              if (result.data.error == 0) {
                loading.hide();
                $scope.invoiceId = result.data.export.invoice;
                $scope.donePayment = true;
                $scope.goPayment = false;
                $scope.sidebarShowPayment = false;
                loading.hide();
              }else{
                logger.error("There's a problem with your credit card");
                $window.scrollTo(0,0);
                loading.hide();
              }
              
            });
          }else{
            logger.error("Please complete credit card information.");
          }
        }else{
          logger.error("Please complete form.");
          $window.scrollTo(0,0);
        } //form check
      }//Check if stuff is free
  	} 

    $scope.payWithPaypal = function() {
      if ($scope.form.terms == true) {
        loading.show("Please wait while redirecting to paypal.");
        var paypal = {
            tag:"createPaypalLink", 
            package:$scope.package.id,
            uid: $scope.user.id,
            pr: $scope.totalAmount,
            desc: $scope.package.description,
            title: $scope.package.name,
            rootDomain: "bmtracker.com/bmadmin"
          };
        httpAccess(paypal,$http).then(function(result){
          loading.hide();
          $window.location.href = result.data.export;
        });
      }else{
        logger.error("Please check the terms and condition first.");
        $window.scrollTo(0,0);
      }
    }
    
  })
  .controller('cvvCtrl', function ($scope, $modalInstance) {

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
  });
