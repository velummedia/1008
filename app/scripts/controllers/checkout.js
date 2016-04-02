'use strict';

angular.module('bmadminApp')
  .controller('CheckoutCtrl', function ($scope,$http,$route,$location,logger,loading,$window) {
  	
    //Default Varabiles and Functions
    var sid = $route.current.params.id; 
    var customerId = 0;   
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
    $scope.userCards = [];
    /////////////////////////////////

    

    // LOAD SINGLE TRAINING DATA BY ID //
    $scope.$watch("packages",function(a){
      angular.forEach($scope.packages,function(n){
        if (n._id == sid) {
          console.log(n);
          $scope.package = n;
          $scope.totalAmount = n.price;
          if (n.price == 0) {
            $scope.vipUserAccess = true;
            $scope.goPayment = false;
          }
        }
      });
    });
    
    // //////////////////////////////////
    // LOAD USER SAVED CARDS //
    var getCustomerCards = "uid=" + $scope.userinfo.user._id + "&sysname=" + $scope.sysname;
    httpAccess(getCustomerCards,"getCustomersCard",$http).then(function(result){
      console.log(result);
      if (result.data.e !== 0) {
        $scope.userCards = result.data.customer.sources.data;
      }
      // customerId = result.data.export.export.cus_id;
    });
    // //////////////////////////////////
  	


    // Clickble Functions //
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
    $scope.cancel = function() {
      $location.path("browsepackage");
    }
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
    // ////////////////////////
    

    // var checkVip = {tag: "checkUserVip", sid: id, email:$scope.user.email}
    // httpAccess(checkVip,$http).then(function(result){
    //   if (result.data.export.vip) {
    //     $scope.vipUserAccess = true;
    //     $scope.goPayment = false;
    //   }
    // });


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
        }else{
          var go = {
            tag: "goFreeAccess",
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

    $scope.zeroPrice = false;
    var couponTag = 0;
  	
    $scope.sendpaymentsuser = function(form) {  
      if ($scope.totalAmount == 0) {
        var sendData = "sysname=" + $scope.sysname +
          "&desc=" + "Event ticket " + $scope.eventdet.raw.name +
          "&plugin=1009" +
          "&price=" + $scope.totalAmount +
          "&sid=" + $scope.eventdet.raw._id +
          "&uid=" + $scope.userinfo.user._id +
          "&coupon=" + form.couponTag.$modelValue +
          "&userName=" + $scope.userinfo.user.name +
          "&userEmail=" + $scope.userinfo.user.email +
          "&savecard=" + 0 +
          "&card=" + 0 + 
          "&cardNo=" + 0 +
          "&exM=" + 0 +
          "&exY=" + 0 +
          "&cvc=" + 0 +
          "&tickets=" + JSON.stringify($scope.ticketCookie);

        httpAccess(sendData,"eventRegisterFreeTickets",$http).then(function(result){
          console.log(result);
          $scope.invoiceId = result.data.invoice;
          loading.hide();
          $scope.donePayment = true;
          $scope.goPayment = false;
          $scope.sidebarShowPayment = false;
          loading.hide();
        });
      }else{
        if (form.$valid) {
          var sendData = {}

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

          var couponTag = 0;
          if ($scope) {
            couponTag = form.couponTag.$modelValue;
          }


          var pData = "sysname=" + $scope.sysname + 
                      "&desc=" + "Members Training " + $scope.package.title +
                      "&plugin=1008" +
                      "&price=" + $scope.totalAmount +
                      "&sid=" + sid +
                      "&uid=" + $scope.userinfo.user._id +
                      // "&cus=" + customerId +
                      // "&coupon=" + couponTag +
                      "&userName=" + $scope.userinfo.user.name +
                      "&userEmail=" + $scope.userinfo.user.email +
                      "&savecard=" + sendData["savecard"] +
                      "&card=" + sendData["card"] + 
                      "&cardNo=" + sendData["cardNo"] +
                      "&exM=" + sendData["exM"] +
                      "&exY=" + sendData["exY"] +
                      "&cvc=" + sendData["cvc"];

          if ( err == 0 ) {
            // console.log(sendData);
            loading.show("Please wait while we proccessing your payments.");
            httpAccess(pData,"paymentHandler",$http).then(function(result){
              console.log(result);
              if (result.data.e == 100) {
                $scope.invoiceId = result.data.invoice;
                loading.hide();
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
    }//END Form Sent 

  	// $scope.sendpaymentsuser = function(form) {  
  	// 	if ($scope.totalAmount == 0) {
   //      var sendData = {
   //        tag: "createFreePayment",
   //        desc: $scope.package.description,
   //        price: $scope.totalAmount,
   //        sid: $scope.package.id,
   //        uid: $scope.user.id,
   //        cus: customerId,
   //        coupon: couponTag,
   //        userName: $scope.user.name,
   //        userEmail: $scope.user.email,
   //        savecard: 0
   //      }
   //      httpAccess(sendData,$http).then(function(result){
   //        console.log(result);
   //        loading.hide();
   //        $scope.invoiceId = result.data.export.invoice;
   //        $scope.donePayment = true;
   //        $scope.goPayment = false;
   //        $scope.sidebarShowPayment = false;
   //        loading.hide();
   //      });
   //    }else{
   //      if (form.$valid) {
   //        var sendData = {
   //          tag: "createPayment",
   //          desc: $scope.package.description,
   //          price: $scope.totalAmount,
   //          sid: $scope.package.id,
   //          uid: $scope.user.id,
   //          cus: customerId,
   //          coupon: couponTag,
   //          userName: $scope.user.name,
   //          userEmail: $scope.user.email,
   //          savecard: 0
   //        }

   //        var err = 0;
   //        if ($scope.prevCardShow) {
   //          if (form.exmonth.$modelValue !== 0 && form.exyear.$modelValue !== 0 && form.cvc.$modelValue && form.cardno.$modelValue) {
   //            sendData["card"] = 0;
   //            sendData["cardNo"] = form.cardno.$modelValue;
   //            sendData["exM"] = form.exmonth.$modelValue;
   //            sendData["exY"] = form.exyear.$modelValue;
   //            sendData["cvc"] = form.cvc.$modelValue;
   //            if (form.saveC.$modelValue){
   //              sendData["savecard"] = 1;
   //            }else{
   //              sendData["savecard"] = 0;
   //            }
   //          }else{
   //            err = 1;
   //          }
   //        }else{
   //          sendData["card"] = form.prevCard.$modelValue;
   //          sendData["cardNo"] = 0;
   //          sendData["exM"] = 0;
   //          sendData["exY"] = 0;
   //          sendData["cvc"] = 0;
   //        }

   //        if ( err == 0 ) {
   //          // console.log(sendData);
   //          loading.show("Please wait while we proccessing your payments.");
   //          httpAccess(sendData,$http).then(function(result){
   //            console.log(result);
   //            if (result.data.error == 0) {
   //              loading.hide();
   //              $scope.invoiceId = result.data.export.invoice;
   //              $scope.donePayment = true;
   //              $scope.goPayment = false;
   //              $scope.sidebarShowPayment = false;
   //              loading.hide();
   //            }else{
   //              logger.error("There's a problem with your credit card");
   //              $window.scrollTo(0,0);
   //              loading.hide();
   //            }
              
   //          });
   //        }else{
   //          logger.error("Please complete credit card information.");
   //        }
   //      }else{
   //        logger.error("Please complete form.");
   //        $window.scrollTo(0,0);
   //      } //form check
   //    }//Check if stuff is free
  	// } 
    
  })
;
