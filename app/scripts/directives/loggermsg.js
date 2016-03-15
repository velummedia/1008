'use strict';

/**
 * @ngdoc directive
 * @name bmadminApp.directive:loggerMsg
 * @description
 * # loggerMsg
 */
angular.module('bmadminApp')
  .directive('loggerMsg', function () {
  	var log = "",
 		replace = "",
 		lType = "",
 		aType = [],
 		rType = "";
    return {
      link: function(scope, element, attributes) {

      	log = JSON.parse(attributes.log);

      	var timestamp = log.reg_date;
		var date = new Date(timestamp * 1000);
		var datevalues = ('0' + date.getDate()).slice(-2) + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes();

      	switch (log.log_type) {
			case '1':
			case '2':
				lType = "Login Attempt";
				break;
			case '3':
				lType = "Stripe";
				break;
			case '4':
				lType = "Paypal";
				break;
		}
		switch (log.alert_type) {
			case '1':
				//Error//
				aType["text"] = "Error/Failed";
				aType["color"] = "#DC0202";
				element.addClass('danger');
				break;
			case '2':
				//Info//
				aType["text"] = "Info";
				aType["color"] = "#027BDC";
				element.addClass('info');
				break;
			case '3':
				//Success//
				aType["text"] = "Success";
				aType["color"] = "#37C404";
				element.addClass('success');
				break;
		}
		switch (log.reg_type) {
			case '1':
				rType = "System";
				break;
			case '2':
				rType = "Accounting";
				break;
			case '3':
				rType = "Payment";
				break;
		}

		replace = '<td>'+lType+'</td><td style="background-color:'+aType["color"]+'">'+aType["text"]+'</td><td>'+log.log_message+'</td><td>'+rType+'</td><td>'+datevalues+'</td>';
      	element.append(replace);

      },
      // template: "<button addbuttons>{{name}}</button>",
    };
  });
