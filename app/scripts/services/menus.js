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
          {
            name : 'Settings',
            page : 'sitesettings',
            type : 'head',
            icon : 'images/admin/settings.png',
            iconh : 'images/admin/settingsh.png',
            selected : false,
            child:0,
          },
          {
            name : 'Emails',
            page : 'emailsettings',
            type : 'head',
            icon : 'images/admin/emailsetting.png',
            iconh : 'images/admin/emailsettingh.png',
            selected : false,
            child:0,
          },
          {
            name : 'Admins',
            page : 'superadmins',
            type : 'head',
            icon : 'images/admin/superadmin.png',
            iconh : 'images/admin/superadminh.png',
            selected : false,
            child: [
              {
                name : 'Add C-Admin',
                page : 'createchildadmin',
                type : 'child',
                icon : ''
              },
              {
                name : 'Add S-Admin',
                page : 'createsuperadmin',
                type : 'child',
                icon : ''
              },
              {
                name : 'Manage',
                page : 'manageadmins',
                type : 'child',
                icon : ''
              },
            ]
          },
          
          // {
          //   name : 'Analytics',
          //   page : 'allanalytics',
          //   type : 'head',
          //   icon : 'images/admin/analytics.png',
          //   iconh : 'images/admin/analyticsh.png',
          //   selected : false,
          //   child: '0'
          // },
          {
            name : 'Package',
            page : '',
            type : 'head',
            icon : 'images/admin/allpackage.png',
            iconh : 'images/admin/allpackageh.png',
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
         
          // {
          //   name : 'Referral',
          //   page : 'referralsystems',
          //   type : 'head',
          //   icon : 'images/admin/referral.png',
          //   iconh : 'images/admin/referralh.png',
          //   selected : false,
          //   child: [
          //       {
          //         name : 'Create',
          //         page : 'createreferralsystems',
          //         type : 'child',
          //         icon : ''
          //       },
          //       {
          //         name : 'Manage',
          //         page : 'managereferralsystems',
          //         type : 'child',
          //         icon : ''
          //       },
          //       {
          //         name : 'Statistics',
          //         page : 'statisticsreferralsystems',
          //         type : 'child',
          //         icon : ''
          //       }
          //   ]
          // },
          {
            name : 'APIs',
            page : '0',
            type : 'head',
            icon : 'images/admin/referral.png',
            iconh : 'images/admin/referralh.png',
            selected : false,
            child: [
                // {
                //   name : 'New API',
                //   page : 'newapi',
                //   type : 'child',
                //   icon : ''
                // },
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
          icon : 'images/user/browse.png',
          iconh : 'images/user/browseh.png',
          selected : false,
          child : '0'
        },
        {
          name : 'Payments',
          page : 'allpaymentsuser',
          type : 'head',
          icon : 'images/user/payment.png',
          iconh : 'images/user/paymenth.png',
          selected : false,
          child: '0'
        },
        {
          name : 'Edit Profile',
          page : 'editprofile',
          type : 'head',
          icon : 'images/user/editprofile.png',
          iconh : 'images/user/editprofileh.png',
          selected : false,
          child : '0'
        },
        {
          name : 'Help',
          page : 'contactus',
          type : 'head',
          icon : 'images/user/help.png',
          iconh : 'images/user/helph.png',
          selected : false,
          child : '0'
        }
      ];
      return userMenu;
    }

    men.adminMenu = function($scope) {
      var adminMenu = [
        // {
        //   name : 'Panels',
        //   page : 'adminpanels',
        //   type : 'head',
        //   icon : 'images/user/browse.png',
        //   iconh : 'images/user/browseh.png',
        //   selected : false,
        //   child : '0'
        // },
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
        // {
        //   name : 'Admin',
        //   page : 'addnewadmin',
        //   type : 'head',
        //   icon : 'images/admin/users.png',
        //   iconh : 'images/admin/usersh.png',
        //   selected : false,
        //   child: [
        //         {
        //           name : 'Add New Admin',
        //           page : 'addnewadmin',
        //           type : 'child',
        //           icon : ''
        //         },
        //         {
        //           name : 'Manage',
        //           page : 'manageadmins2',
        //           type : 'child',
        //           icon : ''
        //         }
        //     ]
        // }
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

    men.adminMenu5 = function($scope) {
      var adminMenu5 = [
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

      return adminMenu5;
    }

    men.adminMenu4 = function($scope) {
      var adminMenu4 = [
        {
          name : 'Payments',
          page : 'allpayments',
          type : 'head',
          icon : 'images/admin/payment.png',
          iconh : 'images/admin/paymenth.png',
          selected : false,
          child: '0'
        },
      ];

      return adminMenu4;
    }

    men.adminMenu3 = function($scope) {
      var adminMenu3 = [
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