'use strict';

angular.module('bmadminApp')
  .controller('DashboardCtrl', function ($scope,$http) {
    //FORM//
    $scope.form = {
      incomePackages: "0",
      monitorTypeChoose: "0",
      totalChart: "0",
      usersPackage: "0",
      totalIncome: "0",
      totalIncomePackage: "0",
      totalUsersPackage: "0"
    }
    ///////
    //CHART GENERATOR//
    $scope.chartOptions = {
      bezierCurve: false,
      pointDot : false,
      datasetFill : true,
      datasetStrokeWidth : 0,
      datasetStroke : false,
    };

    $scope.chartColors = ["#009933","#990000","#006699"];
    $scope.series = ['Sales', 'Users', 'Income'];
    
    ////// NOT USIABLE NOW ///////
    $scope.onClick = function (points, evt) {
      // console.log(points, evt);
    };
    //////////////////////////////

    function loadSideLegend(chart,users,income,sales) {
      var totalUsers = 0;
      angular.forEach(users,function(key,val){
        totalUsers += key;
      });
      var totalIncome = 0;
      angular.forEach(income,function(key,val){
        totalIncome += parseInt(key);
      });
      var totalSales = 0;
      angular.forEach(sales,function(key,val){
        totalSales += key;
      });
      switch(chart) {
        case "allCharts":
          $scope.allChartsUsers = totalUsers;
          $scope.allChartsSales = totalSales;
          $scope.allChartsIncome = totalIncome;
        break;
        case "allIncomeCharts":
          $scope.allIncomeChartsUsers = totalUsers;
          $scope.allIncomeChartsSales = totalSales;
          $scope.allIncomeChartsIncome = totalIncome;
        break;
        case "allIncomeChartsByPackage":
          $scope.allIncomeChartsUsers = totalUsers;
          $scope.allIncomeChartsSales = totalSales;
          $scope.allIncomeChartsIncome = totalIncome;
        break;
        case "monthUsersChartsIncome":
          $scope.monthLabelsChartsUsers = totalUsers;
          $scope.monthLabelsChartsSales = totalSales;
          $scope.monthLabelsChartsIncome = totalIncome;
        break;
        case "monthUsersChartsIncomeByPackage":
          $scope.monthLabelsChartsPackageUsers = totalUsers;
          $scope.monthLabelsChartsPackageSales = totalSales;
          $scope.monthLabelsChartsPackageIncome = totalIncome;
        break;

      }
    }


    function allCharts() {
      var chartAll = {tag:"totalChartAll",aid:$scope.user.id}
      httpAccess(chartAll,$http).then(function(result){
        var res = result.data.export;

        var preDataUsers = [];
        preDataUsers.push(res.users);
        preDataUsers.push(res.sales);

        $scope.dataUsers = preDataUsers;

        console.log($scope.dataUsers);

        $scope.labels = res.labels;
        $scope.seriesUsers = ['Users', 'Sales'];

        $scope.seriesIncome = ['Income'];
        var preDataIncome = [];
        preDataIncome.push(res.income);
        $scope.dataIncome = preDataIncome;


        loadSideLegend("allCharts", res.users,res.income,res.sales);
        loadSideLegend("allIncomeCharts", res.users,res.income,res.sales);
      });
    }

    allCharts();

    $scope.totalUsersChartPackageChange = function(id) {
      if (id == 0) {
        allCharts();
      }else{
        var chartAllByPackage = {tag:"totalChartByPackage",package:id}
        httpAccess(chartAllByPackage,$http).then(function(result){
          var res = result.data.export;
          var preDataUsers = [];
          preDataUsers.push(res.users);
          preDataUsers.push(res.sales);

          $scope.dataUsers = preDataUsers;
          $scope.labels = res.labels;
          $scope.seriesUsers = ['Users', 'Sales'];

          $scope.seriesIncome = ['Income'];
          var preDataIncome = [];
          preDataIncome.push(res.income);
          $scope.dataIncome = preDataIncome;

          loadSideLegend("allCharts", res.users,res.income,res.sales);
        });
      }
    }

    $scope.totalIncomePackageChange = function(id) {
      if (id == 0) {
        allCharts();
      }else{
        var chartAllByPackage = {tag:"totalChartByPackage",package:id}
        httpAccess(chartAllByPackage,$http).then(function(result){
          var res = result.data.export;
          var preDataUsers = [];
          preDataUsers.push(res.users);
          preDataUsers.push(res.sales);

          $scope.dataUsers = preDataUsers;
          $scope.labels = res.labels;
          $scope.seriesUsers = ['Users', 'Sales'];

          $scope.seriesIncome = ['Income'];
          var preDataIncome = [];
          preDataIncome.push(res.income);
          $scope.dataIncome = preDataIncome;

          loadSideLegend("allIncomeChartsByPackage", res.users,res.income,res.sales);
          loadSideLegend("allIncomeChartsByPackage", res.users,res.income,res.sales);
        });
      }
    }


    function monthCharts() {
      var monthAll = {tag:"monthlyChartAll",aid:$scope.user.id}
      httpAccess(monthAll,$http).then(function(result){
        var da = [];
        da.push(result.data.export.sales);
        da.push(result.data.export.users);
        $scope.monthDataUsers = da;

        var dl = [];
        for (var i = 1; i < result.data.export.income.length; i++) {
          dl.push(i);
        };

        $scope.monthLabels = dl;

        var dai = [];
        dai.push(result.data.export.income);
        $scope.monthDataIncome = dai;

        loadSideLegend("monthUsersChartsIncome", result.data.export.users,result.data.export.income,result.data.export.sales);
        loadSideLegend("monthUsersChartsIncomeByPackage", result.data.export.users,result.data.export.income,result.data.export.sales);
      });
    }
    monthCharts();

    $scope.totalMonthChartByPackage = function(id) {
      var monthAll = {tag:"monthlyChartByPackage",package:id}
      httpAccess(monthAll,$http).then(function(result){
        var da = [];
        da.push(result.data.export.sales);
        da.push(result.data.export.users);
        $scope.monthDataUsers = da;

        var dl = [];
        for (var i = 1; i < result.data.export.income.length; i++) {
          dl.push(i);
        };

        $scope.monthLabels = dl;

        var dai = [];
        dai.push(result.data.export.income);
        $scope.monthDataIncome = dai;

        loadSideLegend("monthUsersChartsIncomeByPackage", result.data.export.users,result.data.export.income,result.data.export.sales);


      });
    }


    ///////////////////
    var dataAll = {tag:"totalIncomeAll",aid:$scope.user.id}
    httpAccess(dataAll,$http).then(function(result){
      $scope.incomeInt = result.data.export.total;
    });

    $scope.incomePackageChange = function(id) {
      if (id == 0) {
        var dataAll = {tag:"totalIncomeAll",aid:$scope.user.id}
        httpAccess(dataAll,$http).then(function(result){
          $scope.incomeInt = result.data.export.total;
        });
      }else{
        var dataPack = {tag:"totalIncomeByPackage",package:id}
        httpAccess(dataPack,$http).then(function(result){
          if (result.data.export.total) {
            $scope.incomeInt = result.data.export.total;
          }else{
            $scope.incomeInt = 0.00
          }
        });
      }
    }

    var now = new Date();

    var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    var currentToday = Math.ceil(now/1000),
        startToday = currentToday/1000;

    $scope.monitorTypeChange = function(id) {
      var monitorData = {
        tag : "incomeMonitorByDate",
        t: id
      }
      httpAccess(monitorData,$http).then(function(result){
        $scope.monitorUser = result.data.export.totalUsers;
        if (result.data.export.totalPayment) {
          $scope.monitorIncome = result.data.export.totalPayment;
        }else{
          $scope.monitorIncome = 0.00;
        }
      });
    }
    $scope.monitorTypeChange(0);

    $scope.userPackageChange = function(id) {
      var monitorData = {
        tag : "userMonitorByDate",
        t: id
      }
      httpAccess(monitorData,$http).then(function(result){
        $scope.userDataMonitor = result.data.export.users;
      });
    }
    $scope.userPackageChange(0);















  });