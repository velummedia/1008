'use strict';

angular.module('bmadminApp')
  .factory('menus', function () {
    
    var men = {}; 

    men.superAdmin = function($scope) {
      var superAdmin = [
          {
            name : 'Dashboard',
            page : 'dashboard',
            type : 'head',
            icon : 'images/admin/dashboardg.png',
            iconh : 'images/admin/dashboardw.png',
            selected : false,
            child: '0'
          },
          {
            name : 'Payments',
            page : 'allpayments',
            type : 'head',
            icon : 'images/admin/paysg.png',
            iconh : 'images/admin/paysw.png',
            selected : false,
            child: '0'
          },
          {
            name : 'Settings',
            page : 'sitesettings',
            type : 'head',
            icon : 'images/admin/settingg.png',
            iconh : 'images/admin/settingw.png',
            selected : false,
            child:0,
          },
          {
            name : 'Emails',
            page : 'emailsettings',
            type : 'head',
            icon : 'images/admin/emailg.png',
            iconh : 'images/admin/emailw.png',
            selected : false,
            child:0,
          },
          {
            name : 'Package',
            page : '',
            type : 'head',
            icon : 'images/admin/packageg.png',
            iconh : 'images/admin/packagew.png',
            selected : false,
            child: [
               {
                  name : 'Create',
                  page : 'addnewpackage',
                  type : 'child',
                  icon : ''
                },
                {
                  name : 'Manage',
                  page : 'managepackages',
                  type : 'child',
                  icon : ''
                },
            ]
          },
          {
            name : 'APIs',
            page : '0',
            type : 'head',
            icon : 'images/admin/apisg.png',
            iconh : 'images/admin/apisw.png',
            selected : false,
            child: [
                {
                  name : 'Manage',
                  page : 'manageapis',
                  type : 'child',
                  icon : ''
                },
            ]
          },
          
        ];

      return superAdmin;

    }

    men.userMenu = function($scope) {
      var userMenu = [
        {
          name : 'Browse',
          page : 'browsepackage',
          type : 'head',
          icon : 'images/user/browseg.png',
          iconh : 'images/user/browsew.png',
          selected : false,
          child : '0'
        },
        {
          name : 'Payments',
          page : 'allpaymentsuser',
          type : 'head',
          icon : 'images/user/paymentg.png',
          iconh : 'images/user/paymentw.png',
          selected : false,
          child: '0'
        },
        {
          name : 'Edit Profile',
          page : 'editprofile',
          type : 'head',
          icon : 'images/user/editprofileg.png',
          iconh : 'images/user/editprofilew.png',
          selected : false,
          child : '0'
        },
        {
          name : 'Help',
          page : 'contactus',
          type : 'head',
          icon : 'images/user/helpg.png',
          iconh : 'images/user/helpw.png',
          selected : false,
          child : '0'
        }
      ];
      return userMenu;
    }

    men.adminMenu = function($scope) {
      var adminMenu = [
        {
          name : 'Dashboard',
          page : 'dashboard',
          type : 'head',
          icon : 'images/admin/payment.png',
          iconh : 'images/admin/paymenth.png',
          selected : false,
          child: '0'
        },
        {
          name : 'Payments',
          page : 'allpayments',
          type : 'head',
          icon : 'images/admin/payment.png',
          iconh : 'images/admin/paymenth.png',
          selected : false,
          child: '0'
        },
        {
          name : 'Users',
          page : 'allusers',
          type : 'head',
          icon : 'images/admin/users.png',
          iconh : 'images/admin/usersh.png',
          selected : false,
          child: '0'
        },
      ];
      if ($scope.roles.vip == true) {
        adminMenu.push({
                        name : 'VIPs',
                        page : 'vipusers',
                        type : 'head',
                        icon : 'images/admin/users.png',
                        iconh : 'images/admin/usersh.png',
                        selected : false,
                        child: [
                              {
                                name : 'Add New VIP',
                                page : 'addvip',
                                type : 'child',
                                icon : ''
                              },
                              {
                                name : 'Manage',
                                page : 'managevips',
                                type : 'child',
                                icon : ''
                              }
                          ]
                      });
      }
      if ($scope.roles.emailsettings == true) {
        adminMenu.push({
                        name : 'Emails',
                        page : 'emailsettings',
                        type : 'head',
                        icon : 'images/admin/users.png',
                        iconh : 'images/admin/usersh.png',
                        selected : false,
                        child: 0
                      });
      }
      if ($scope.roles.siteinfo == true) {
        // adminMenu.push({
        //                 name : 'Settings',
        //                 page : 'settings',
        //                 type : 'head',
        //                 icon : 'images/admin/users.png',
        //                 iconh : 'images/admin/usersh.png',
        //                 selected : false,
        //                 child: 0
        //               });
      }
      return adminMenu;
    }

    return men;


    
    
    

    

    

    

    

    // return {
    //   loadSuperAdminMenus: superAdmin,
    //   loadUsersMenus: userMenu,
    //   loadChildMenus: adminMenu,
    //   loadAdmin5: adminMenu5,
    //   loadAdmin4: adminMenu4,
    //   loadAdmin3: adminMenu3,
    // };

    
  });