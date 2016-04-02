'use strict';

/**
 * @ngdoc function
 * @name bmadminApp.controller:AddnewpackageCtrl
 * @description
 * # AddnewpackageCtrl
 * Controller of the bmadminApp
 */
angular.module('bmadminApp')
  .controller('AddnewpackageCtrl', function ($scope,$http,logger,Upload,cloudinary,fgDelegate,$timeout) {
    $scope.open = function($event) {
		$scope.opened = true;
	};

    $scope.topBanner = function(f) {
        console.log(f);
        $scope.form.topCover = f;
    }

    /******* Grid *******/
    $scope.faqdata = [];
    $scope.faqTitle = [];
    $scope.faqText = [];
    $scope.addFaq = function() {
        $scope.faqdata.push($scope.faqdata.length+1);
        $scope.liveFaq();

        var flow;
        $timeout( function(){
            flow = fgDelegate.new({
              name:"demoGird",
              minItemWidth:100,
              container: document.getElementById("demogrid"),
              itemSelector:".flowGridItem",
            })
            console.log(flow);
        },300);
    }



    
    //DEFAULT DATA//
    $scope.defaultTopCover = "http://res.cloudinary.com/velummedia/image/upload/v1458828609/members/banner_default.jpg";
    $scope.defaultAvatar = "http://res.cloudinary.com/velummedia/image/upload/v1458829160/members/avatar_default.jpg";
    $scope.secondAvatar = "http://res.cloudinary.com/velummedia/image/upload/v1458829161/members/second_default.jpg";
    $scope.moreInfoCover = "http://res.cloudinary.com/velummedia/image/upload/v1458828609/members/banner_default.jpg";
    $scope.prevTitle = "TITLE";
    $scope.prevDescription = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate dolores, earum quidem odit.";
    $scope.prevWelcome = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae harum laboriosam distinctio et suscipit, rerum pariatur unde natus hic eum cupiditate, alias laudantium labore magni voluptate voluptatibus nesciunt laborum esse.";
    $scope.prevCoachBio = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae harum laboriosam distinctio et suscipit.";
    $scope.PrevCoachName = "John Smith";
    $scope.prevPrice = "00.00";
    $scope.prevWelcomeReadMore = false;
    $scope.prevButton1Text = "Start your training today!";
    $scope.prevFaqTitle = false;
    $scope.prevMoreInfoTitle = false;

    ////////////////

    //PREVIEW TRAINING//
    $scope.liveTitle = function(a) {
        if (a.length == 0) {
            $scope.prevTitle = "TITLE";            
        }else{
            $scope.prevTitle = a;
        }
    }
    $scope.liveDescription = function(a) {
        if (a.length == 0) {
            $scope.prevDescription = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate dolores, earum quidem odit, quibusdam odio perferendis esse architecto maiores, sequi dolorem voluptatum suscipit fugit laborum assumenda fuga nam consectetur molestias.";
        }else{
            $scope.prevDescription = a;
        }
    }
    $scope.liveWelcome = function(a) {
        if (a.length == 0) {
            $scope.prevWelcome = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate dolores, earum quidem odit, quibusdam odio perferendis esse architecto maiores, sequi dolorem voluptatum suscipit fugit laborum assumenda fuga nam consectetur molestias.";
        }else{
            $scope.prevWelcome = a;
        }
    }
    $scope.liveCoachBio = function(a) {
        if (a.length == 0) {
            $scope.prevCoachBio = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate dolores, earum quidem odit,";
        }else{
            $scope.prevCoachBio = a;
        }
    }
    $scope.liveCoachName = function(a) {
        if (a.length == 0) {
            $scope.PrevCoachName = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate dolores, earum quidem odit,";
        }else{
            $scope.PrevCoachName = a;
        }
    }
    $scope.livePrice = function(a) {
        if (a.length == 0) {
            $scope.prevPrice = "00.00";
        }else{
            $scope.prevPrice = a;
        }
    }
    $scope.liveWelcomeReadMore = function(a) {
        if (a.length == 0) {
            $scope.prevWelcomeReadMore = false;
        }else{
            $scope.prevWelcomeReadMore = true;
        }
    }

      $scope.liveReadMore1 = function(a) {
          if (a.length == 0) {
              $scope.prevReadMore1 = false;
          }else{
              $scope.prevReadMore1 = true;
          }
      }

      $scope.liveReadMore2 = function(a) {
          if (a.length == 0) {
              $scope.prevReadMore2 = false;
          }else{
              $scope.prevReadMore2 = true;
          }
      }

    $scope.liveButton1Text = function(a) {
        if (a.length == 0) {
            $scope.prevButton1Text = "Start your training today!";
        }else{
            $scope.prevButton1Text = a;
        }
    }

    $scope.liveButton2Text = function(a) {
          if (a.length == 0) {
              $scope.prevButton2Text = "Start";
          }else{
              $scope.prevButton2Text = a;
          }
      }

    $scope.liveFaq = function() {
        if ($scope.faqdata.length == 0) {
            $scope.prevFaqTitle = false;
        }else{
            $scope.prevFaqTitle = true;
        }
    }
    $scope.liveMoreInfo = function() {
        if ($scope.moreinfo.length == 0) {
            $scope.prevMoreInfoTitle = false;
        }else{
            $scope.prevMoreInfoTitle = true;
        }
    }



    $scope.moreinfo = [];
    $scope.moreInfoImage = [];
    $scope.moreInfoTitle = [];
    $scope.moreInfoDesc = [];
    $scope.moreInfoLink = [];

    $scope.addMoreInfo = function() {
        $scope.moreinfo.push($scope.moreinfo.length+1);
        $scope.liveMoreInfo();
        
    }

    $scope.sendnewpackage = function(form) {
        if (form.$valid){
            var coach = {
                name: form.coachname.$modelValue,
                bio: form.coachbio.$modelValue
            }
            var prevewData = "sysname=" + $scope.sysname +
                "&button1text=" + form.button1text.$modelValue +
                "&button2text=" + form.button2text.$modelValue +
                "&coach=" + JSON.stringify(coach) +
                "&desc=" + form.desc.$modelValue +
                "&name=" + form.name.$modelValue +
                "&price=" + form.price.$modelValue +
                "&welcomemore=" + form.welcomemore.$modelValue +
                "&welcometext=" + form.welcometext.$modelValue +
                "&fontcolor=" + form.fontcolor.$modelValue +
                "&bgcolor=" + form.bgcolor.$modelValue;

            if ($scope.faqdata.length !== 0) {
                var faq = [];
                angular.forEach($scope.faqdata,function(a,k){
                    var nf = {
                        title: $scope.faqTitle[k],
                        text: $scope.faqText[k]
                    }
                    faq.push(nf);
                })
                prevewData += "&faq=" + JSON.stringify(faq);
            }

            if ($scope.moreinfo.length !== 0) {
                var moreinfo = [];
                angular.forEach($scope.moreinfo,function(a,k){
                    var nf = {
                        title: $scope.moreInfoTitle[k],
                        desc: $scope.moreInfoDesc[k],
                        link: $scope.moreInfoLink[k]
                    }
                    moreinfo.push(nf);
                    // console.log($scope.moreInfoImage[k]);
                })
                prevewData += "&moreinfo=" + JSON.stringify(moreinfo);


            }
            // console.log(prevewData);

            httpAccess(prevewData,"membersNewPackage",$http).then(function(result){
                console.log(result);
                if (result.data.e == 100) {
                    var id = result.data.export.insertedIds[1];

                    var avatar = "members_" + id + "_coachAvatar";
                    var topCover = "members_" + id + "_topCover";
                    var secondBanner = "members_" + id + "_secondBanner";


                    if ($scope.avatar) {
                        $scope.avatar.upload = Upload.upload({
                                url: "https://api.cloudinary.com/v1_1/" + cloudinary.config().cloud_name + "/upload",
                                data: {
                                    upload_preset: cloudinary.config().upload_preset,
                                    tags: 'members',
                                    context: 'photo=' + avatar,
                                    public_id: avatar,
                                    file: $scope.avatar
                                }
                        });
                    }

                    if ($scope.topCover) {
                        $scope.topCover.upload = Upload.upload({
                                url: "https://api.cloudinary.com/v1_1/" + cloudinary.config().cloud_name + "/upload",
                                data: {
                                    upload_preset: cloudinary.config().upload_preset,
                                    tags: 'members',
                                    context: 'photo=' + topCover,
                                    public_id: topCover,
                                    file: $scope.topCover
                                }
                        });
                    }

                    if ($scope.secondBanner) {
                        $scope.secondBanner.upload = Upload.upload({
                                url: "https://api.cloudinary.com/v1_1/" + cloudinary.config().cloud_name + "/upload",
                                data: {
                                    upload_preset: cloudinary.config().upload_preset,
                                    tags: 'members',
                                    context: 'photo=' + secondBanner,
                                    public_id: secondBanner,
                                    file: $scope.secondBanner
                                }
                        });
                    }

                    if ($scope.moreinfo.length !== 0) {
                        angular.forEach($scope.moreinfo,function(a,k){
                            // console.log($scope.moreInfoImage[k]);
                            var nn = "members_" + id + "_moreinfo_" + k;
                            $scope.moreInfoImage[k].upload = Upload.upload({
                                    url: "https://api.cloudinary.com/v1_1/" + cloudinary.config().cloud_name + "/upload",
                                    data: {
                                        upload_preset: cloudinary.config().upload_preset,
                                        tags: 'members',
                                        context: 'photo=' + nn,
                                        public_id: nn,
                                        file: $scope.moreInfoImage[k]
                                    }
                            });
                        })
                    }
                }//Success Add Record
                

                
            });

        }
    }

    
  });
