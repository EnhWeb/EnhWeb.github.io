"use strict";

EnhWebApp.controller("myController1", function ($scope, $http, baseUrl) {
    //console.log("baseUrl：", baseUrl);
    $scope.Industrys = [];
    $scope.alert = function (msg) {
        window.alert(msg);
    };

    $http.get(baseUrl + "TestBaseInfo/GetIndustrys", {}).success(function (data, textStatus, jqXHR) {
        $scope.Industrys = data;
    });
});