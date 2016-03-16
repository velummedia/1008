'use strict';

/*
vAdmin - Beta 2
Version 0.1.2
Release date : 12/19/2015
Velum Media 
http://velummedia.com
 */

function httpAccess(data,$http) {
	return $http({
		    // url: 'https://bmtracker.com/bmadmin/mirror/api.php',
		    url: 'https://bmtracker.com/bmadmin/api.php',
		    method: 'POST',
		    data: data,
		    headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			}
		})
		.then(function(result) {
		        return result;
		    }
		);
}
angular.module('bmadminApp')
  .controller('GlobalCtrl', function ($scope,generals,menus,$http,$rootScope,$location,$route,$window,logger) {
    $rootScope.loadingShow = false;
    $rootScope.isActive = false;
    $rootScope.loginSectionActive = false;



    $scope.$watch(function () { return window.localStorage["bmadminlogin"]; },function(newVal,oldVal){
      if (newVal == 1) {
        $rootScope.headerMenusLinks = false;
      }else{
        $rootScope.headerMenusLinks = true;
        $scope.userInitialName = "BM";
      }
    });
    
  	$rootScope.colors = [
      "#913ccd",
      "#f15f74",
      "#f76d3c",
      "#f39c12",
      "#2ca8c2",
      "#98cb4a",
      "#839098",
      "#5481e6",
      "#913ccd",
      "#f15f74",
      "#f76d3c",
      "#f39c12",
      "#2ca8c2",
      "#98cb4a",
      "#839098",
      "#5481e6",
      "#913ccd",
      "#f15f74",
      "#f76d3c",
      "#f39c12",
      "#2ca8c2",
      "#98cb4a",
      "#839098",
      "#5481e6"
    ];
  	
    function checkAccess(menus,ulevel,currentPage) {
      var keys = [];
      var c = currentPage.substring(1);
      angular.forEach(menus, function(key) {
          keys.push(key.page);
      });
    }
    //SUB-MENU OPENS BY CLICK//
  	$scope.clickMe = function (a,b,i,p){
      $rootScope.sidebarOpen = false;
      angular.forEach($rootScope.links, function(key) {
          if (key.selected == true)
            key.selected = false;
      });
      if (a!=0) {
      		if ($rootScope.links[i].selected == false) {
      			$rootScope.links[i].selected = true;
            $rootScope.sidebarOpen = true;
      		}else{
      			$rootScope.links[i].selected = false;
            $rootScope.sidebarOpen = false;
      		}
      }else{
        $rootScope.sidebarOpen = false;
        angular.forEach($rootScope.links, function(key) {
          if (key.selected == true)
            key.selected = false;
        });
        $scope.isActive = false;
        $location.path(p);
      }
    }  		
  	////////////////

  	$rootScope.sidebarShow = true;
  	$rootScope.headerShow = true;

    $rootScope.showRightSidebar = false;
    $rootScope.fullWidth = true;

  	$rootScope.$on("$routeChangeSuccess", function (event, currentRoute, previousRoute) {
      window.scrollTo(0,0);
      // For Page Title
      switch(currentRoute.$$route.originalPath){
        case '/browsepackage':
          $rootScope.pageTitle = "Browse Package";
        break;
        case '/allpaymentsuser':
        case '/allpayments':
          $rootScope.pageTitle = "All Payments";
        break;
        case '/editprofile':
          $rootScope.pageTitle = "Edit Profile";
        break;
        case '/allusers':
          $rootScope.pageTitle = "All Users";
        break;
        case '/managevips':
          $rootScope.pageTitle = "VIPs/Manage VIPs";
        break;
        case '/paymentsuser/:id':
          $rootScope.pageTitle = "Order a Package";
        break;
        case '/sendbulkpackage':
          $rootScope.pageTitle = "Bulk By Package";
        break;
        case '/sendtoall':
          $rootScope.pageTitle = "Send To All";
        break;
        case '/createchildadmin':
          $rootScope.pageTitle = "New Child Admin";
        break;
        case '/createreferralsystems':
          $rootScope.pageTitle = "Create Referral";
        break;
        case '/vdash':
          $rootScope.pageTitle = "Dashboard";
        break;
        case '/emailsettings':
          $rootScope.pageTitle = "Email Settings";
        break;
        case '/addnewpackage':
          $rootScope.pageTitle = "Add New Package";
        break;
        case '/managepackages':
          $rootScope.pageTitle = "Manage Packages";
        break;
        case '/manageadmins':
          $rootScope.pageTitle = "Manage Admins";
        break;
        case '/managereferralsystems':
          $rootScope.pageTitle = "Manage Refrreals";
        break;
        case '/addvip':
          $rootScope.pageTitle = "Add New VIP";
        break;
        case '/addnewadmin':
          $rootScope.pageTitle = "Add New Admin";
        break;
        case '/edituser/:id':
          $rootScope.pageTitle = "Edit User";
        break;
        case '/contactus':
          $rootScope.pageTitle = "Help";
        break;
        case '/sitesettings':
          $rootScope.pageTitle = "Site Settings";
        break;

        default :
          $rootScope.pageTitle = "";
        break;
      }
      // End of Page Title
      // 

      if (currentRoute.$$route.originalPath == '/login' ||
  		  currentRoute.$$route.originalPath == '/login/:key' ||
          currentRoute.$$route.originalPath == '/adminlogin' || 
          currentRoute.$$route.originalPath == '/vlogin' || 
          currentRoute.$$route.originalPath == '/forgotpassword' || 
          currentRoute.$$route.originalPath == '/resetpassword/:id' || 
          currentRoute.$$route.originalPath == '/activation/:id' || 
          currentRoute.$$route.originalPath == '/activeaccount/:id') {
  			$rootScope.sidebarShow = false;
  			$rootScope.headerShow = false;
  		}else{
  			$rootScope.sidebarShow = true;
  			$rootScope.headerShow = true;
            $rootScope.loginSectionActive = false;

        if (window.localStorage['bmadminlogin'] == 1) {
          $rootScope.user = JSON.parse(window.localStorage['bmadminUser']);       
          $rootScope.userLevel = window.localStorage['bmadminlevel'];
          $rootScope.userLogin = true;
          //FIND INITIALS//
          if ($scope.user) {
            var name = $scope.user.name.split(" "),
            initial = "";
            angular.forEach(name, function(value) {
              initial += value[0] + ".";
          });
          $scope.userInitialName = initial;
          };
          /////////////////
          if (window.localStorage['bmadminlevel'] == 6) {
            $rootScope.roles = JSON.parse(window.localStorage['bmadminroles']);
          }
          /////////////////
          var r = checkAccess($scope.links,$scope.userLevel,currentRoute.$$route.originalPath);
          if (!r) {
            // $location.path(r.red);
          }


          // Load Packages By USER LEVEL //
          switch(window.localStorage['bmadminlevel']){
            case '1': 
              $rootScope.links= menus.userMenu($scope);
              var data = {tag:"fetchPackages",approved: "1"}
              httpAccess(data,$http).then(function(result){
                $rootScope.filterPackages = result.data.export;
              });
              // $location.path('/browsepackage');
            break;
            case '6': 
              $rootScope.links= menus.adminMenu($scope);
              var data = {tag:"fetchPackagesAdmin",approved: "1", id:$scope.user.id}
              httpAccess(data,$http).then(function(result){
                $rootScope.filterPackages = result.data.export;
              });
            break;
            case '5': 
              $rootScope.links= menus.loadAdmin5($scope);
              var data = {tag:"fetchPackagesAdmin",approved: "1", id:$scope.user.id}
              httpAccess(data,$http).then(function(result){
                $rootScope.filterPackages = result.data.export;
              });
              
            break;
            case '4': 
              $rootScope.links= menus.loadAdmin4($scope);
              var data = {tag:"fetchPackagesAdmin",approved: "1", id:$scope.user.id}
              httpAccess(data,$http).then(function(result){
                $rootScope.filterPackages = result.data.export;
              });
            break;
            case '3': 
              $rootScope.links= menus.loadAdmin3($scope);
              var data = {tag:"fetchPackagesAdmin",approved: "1", id:$scope.user.id}
              httpAccess(data,$http).then(function(result){
                $rootScope.filterPackages = result.data.export;
              });
            break;
            case '2': 
              $rootScope.links= menus.loadAdmin2($scope);
              var data = {tag:"fetchPackagesAdmin",approved: "1", id:$scope.user.id}
              httpAccess(data,$http).then(function(result){
                $rootScope.filterPackages = result.data.export;
              });
            break;
            case '7': 
              $rootScope.links= menus.superAdmin($scope);
              var data = {tag:"fetchPackages",approved: "all"}
              httpAccess(data,$http).then(function(result){
                $rootScope.filterPackages = result.data.export;
              });
            break;
          }
          /////////////////////////////////
        }else{
            if(currentRoute.$$route.originalPath !== '/main'
                && currentRoute.$$route.originalPath !== '/'
                &&  currentRoute.$$route.originalPath !== '/package/:name'){
              $location.path("/login");
              $rootScope.showRightSidebar = true;
              $rootScope.fullWidth = false;
            }
          }
  		}


  	});


  	$scope.logout = function() {
  		window.localStorage["bmadminUser"] = 0;
  		window.localStorage["bmadminlogin"] = 0;
  		window.localStorage["bmadminlevel"] = 0;
      $rootScope.userLogin = false;
  		$location.path("login");
      $route.reload();
    }

    $rootScope.forCloseMenu = function() {
      if ($scope.isActive == true) {
        $scope.isActive = false;
      }else{
        console.log("D");
        return true; 
      }
    }

    $rootScope.activeMenu = function() {
      $scope.isActive = !$scope.isActive;
    }  

    $rootScope.openPage = function(page) {
      $scope.isActive = false;
      $location.path(page);
    }

    $rootScope.reSendOrderConfirmation = function(pid) {
      var data = {tag:"reSendOrderConfirmation",pid: pid}
      httpAccess(data,$http).then(function(result){
        logger.success("Email confirmation was sent successfully");
      });
    }


    $rootScope.$on("$routeChangeSuccess", function (event, currentRoute, previousRoute) {
      if($window.location.protocol == "http:") {
        // $window.location.href = "https://" + $location.$$host + "/#" +  $location.$$url;
      }

      if ( window.localStorage["bmadminlogin"] && window.localStorage["bmadminlogin"] == 1 && window.localStorage["bmadminlevel"] == 1) {

        //var checkLoginUser = {
        //  tag:"checkUserSession",
        //  email: $scope.user.email
        //}
        //
        //httpAccess(checkLoginUser,$http).then(function(result){
        //  if (result.data.export.session == 0) {
        //    $scope.logout();
        //  }
        //});
      }


    });
  });
