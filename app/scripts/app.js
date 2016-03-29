'use strict';

/**
 * @ngdoc overview
 * @name bmadminApp
 * @description
 * # bmadminApp
 *
 * Main module of the application.
 */
angular
    .module('bmadminApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'ui.bootstrap',
        'checklist-model',
        'textAngular',
        'ngFx',
        'chart.js',
        'ngFlowGrid',
        'colorpicker.module',
        'cloudinary',
        'ngFileUpload'

    ])
    .config(function (cloudinaryProvider,$sceDelegateProvider,$routeProvider) {
        $sceDelegateProvider.resourceUrlWhitelist(['**']);
        
        cloudinaryProvider
          .set("cloud_name", "velummedia")
          .set("upload_preset", "r45kpdzi");

        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/about', {
                templateUrl: 'views/about.html',
                controller: 'AboutCtrl'
            })
            .when('/payment', {
                templateUrl: 'views/payment.html',
                controller: 'PaymentCtrl'
            })
            .when('/allusers', {
                templateUrl: 'views/allusers.html',
                controller: 'AllusersCtrl'
            })
            .when('/createsuperadmin', {
                templateUrl: 'views/superadmin/createsuperadmin.html',
                controller: 'CreatesuperadminCtrl'
            })
            .when('/addnewpackage', {
                templateUrl: 'views/superadmin/addnewpackage.html',
                controller: 'AddnewpackageCtrl'
            })
            .when('/managepackages', {
                templateUrl: 'views/superadmin/managepackages.html',
                controller: 'ManagepackagesCtrl'
            })
            .when('/createchildadmin', {
                templateUrl: 'views/superadmin/createchildadmin.html',
                controller: 'CreatechildadminCtrl'
            })
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl'
            })
            .when('/login/:key', {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl'
            })
            .when('/paymentsuser/:id', {
                templateUrl: 'views/user/paymentsuser.html',
                controller: 'PaymentsuserCtrl'
            })
            .when('/paymentsuser/:id/:status', {
                templateUrl: 'views/user/paymentsuser.html',
                controller: 'PaymentsuserCtrl'
            })
            .when('/browsepackage', {
                templateUrl: 'views/user/browsepackage.html',
                controller: 'BrowsepackageCtrl'
            })
            .when('/allpayments', {
                templateUrl: 'views/allpayments.html',
                controller: 'AllpaymentsCtrl'
            })
            .when('/addadmin', {
                templateUrl: 'views/superadmin/addadmin.html',
                controller: 'AddadminCtrl'
            })
            .when('/adminlogin', {
                templateUrl: 'views/adminlogin.html',
                controller: 'AdminloginCtrl'
            })
            .when('/manageadmins', {
                templateUrl: 'views/superadmin/manageadmins.html',
                controller: 'ManageadminsCtrl'
            })
            .when('/editprofile', {
                templateUrl: 'views/editprofile.html',
                controller: 'EditprofileCtrl',
            })
            .when('/editpaymentsinfo', {
                templateUrl: 'views/user/editpaymentsinfo.html',
                controller: 'EditpaymentsinfoCtrl',
            })
            .when('/allpaymentsuser', {
                templateUrl: 'views/user/allpaymentsuser.html',
                controller: 'AllpaymentsuserCtrl',
            })
            .when('/viewpayment/:id', {
                templateUrl: 'views/superadmin/viewpayment.html',
                controller: 'ViewpaymentCtrl'
            })
            .when('/editpackage/:id', {
                templateUrl: 'views/superadmin/editpackage.html',
                controller: 'EditpackageCtrl'
            })
            .when('/activeaccount/:id', {
                templateUrl: 'views/activeaccount.html',
                controller: 'ActiveaccountCtrl'
            })
            .when('/adminpanels', {
                templateUrl: 'views/adminpanels.html',
                controller: 'AdminpanelsCtrl'
            })
            .when('/addvip', {
                templateUrl: 'views/addvip.html',
                controller: 'AddvipCtrl'
            })
            .when('/managevips', {
                templateUrl: 'views/managevips.html',
                controller: 'ManagevipsCtrl'
            })
            .when('/addnewadmin', {
                templateUrl: 'views/addnewadmin.html',
                controller: 'AddnewadminCtrl'
            })
            .when('/manageadmins2', {
                templateUrl: 'views/manageadmins2.html',
                controller: 'Manageadmins2Ctrl'
            })
            .when('/createreferralsystems', {
                templateUrl: 'views/createreferralsystems.html',
                controller: 'CreatereferralsystemsCtrl'
            })
            .when('/managereferralsystems', {
                templateUrl: 'views/managereferralsystems.html',
                controller: 'ManagereferralsystemsCtrl'
            })
            .when('/editreferralsystems/:id', {
                templateUrl: 'views/editreferralsystems.html',
                controller: 'EditreferralsystemsCtrl'
            })
            .when('/sendsingle', {
                templateUrl: 'views/sendsingle.html',
                controller: 'SendsingleCtrl'
            })
            .when('/sendbulkpackage', {
                templateUrl: 'views/sendbulkpackage.html',
                controller: 'SendbulkpackageCtrl'
            })
            .when('/sendtoall', {
                templateUrl: 'views/sendtoall.html',
                controller: 'SendtoallCtrl'
            })
            .when('/vlogin', {
                templateUrl: 'views/vlogin.html',
                controller: 'VloginCtrl'
            })
            .when('/vdash', {
                templateUrl: 'views/vdash.html',
                controller: 'VdashCtrl'
            })
            .when('/emailsettings', {
                templateUrl: 'views/emailsettings.html',
                controller: 'EmailsettingsCtrl'
            })
            .when('/edituser/:id', {
                templateUrl: 'views/edituser.html',
                controller: 'EdituserCtrl'
            })
            .when('/manageapis', {
                templateUrl: 'views/manageapis.html',
                controller: 'ManageapisCtrl'
            })
            .when('/editadmins/:id', {
                templateUrl: 'views/editadmins.html',
                controller: 'EditadminsCtrl'
            })
            .when('/testapi', {
                templateUrl: 'views/testapi.html',
                controller: 'TestapiCtrl'
            })
            .when('/contactus', {
                templateUrl: 'views/user/contactus.html',
                controller: 'ContactusCtrl'
            })
            .when('/sitesettings', {
                templateUrl: 'views/sitesettings.html',
                controller: 'SitesettingsCtrl'
            })
            .when('/forgotpassword', {
                templateUrl: 'views/forgotpassword.html',
                controller: 'ForgotpasswordCtrl'
            })
            .when('/resetpassword/:id', {
                templateUrl: 'views/resetpassword.html',
                controller: 'ResetpasswordCtrl'
            })
            .when('/activation/:id', {
                templateUrl: 'views/activation.html',
                controller: 'ActivationCtrl'
            })
            .when('/dashboard', {
                templateUrl: 'views/dashboard.html',
                controller: 'DashboardCtrl'
            })
            .when('/package/:name', {
                templateUrl: 'views/package.html',
                controller: 'PackageCtrl'
            })
            .when('/prevpackage', {
              templateUrl: 'views/prevpackage.html',
              controller: 'PrevpackageCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
