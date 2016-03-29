'use strict';

/**
 * @ngdoc function
 * @name bmadminApp.controller:AddnewpackageCtrl
 * @description
 * # AddnewpackageCtrl
 * Controller of the bmadminApp
 */
angular.module('bmadminApp')
  .controller('AddnewpackageCtrl', function ($scope,$http,logger,Upload,cloudinary) {
    $scope.open = function($event) {
		$scope.opened = true;
	};

    $scope.topBanner = function(f) {
        console.log(f);
        $scope.form.topCover = f;
    }

    $scope.faqdata = [];
    $scope.faqTitle = [];
    $scope.faqText = [];
    $scope.addFaq = function() {
        $scope.faqdata.push($scope.faqdata.length+1);
    }


    $scope.moreinfo = [];
    $scope.moreInfoImage = [];
    $scope.moreInfoTitle = [];
    $scope.moreInfoDesc = [];
    $scope.moreInfoLink = [];

    $scope.addMoreInfo = function() {
        $scope.moreinfo.push($scope.faqdata.length+1);
    }

    $scope.sendnewpackage = function(form) {
        if (form.$valid){
            var coach = {
                name: form.coachname.$modelValue,
                bio: form.coachbio.$modelValue
            }
            var prevewData = "sysname=" + $scope.sysname +
                "&button1text=" + form.button1text.$modelValue +
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
