"use strict";

var EnhWebApp = (function ($) {
    var app = $.module("EnhWebApp", ["mePagination", "ngRoute","angular-loading-bar"]);

    /**
     * 是否为调试模式 默认值为 true;
     */
    var IsDebug = true;
    /**
     * 调式时是否显示更多调试信息
     */
    var IsDebugFull = false;

    /*
        定义常量
    */
    var _baseUrl = IsDebug ? "http://localhost:63919/Api/" : "http://sc-webapi-dev-test-webenh.cost88.com";
    app.constant("baseUrl", _baseUrl);
    if (IsDebug) console.log("baseUrl:", _baseUrl);

    /*
        启用路由
    */
    app.config(function ($routeProvider) {

        $routeProvider.when("/home", {
            controller: "homeController",
            templateUrl: "/app/views/home.html"
        });

        $routeProvider.when("/login", {
            controller: "loginController",
            templateUrl: "/app/views/login.html"
        });

        $routeProvider.when("/signup", {
            controller: "signupController",
            templateUrl: "/app/views/signup.html"
        });

        $routeProvider.when("/orders", {
            controller: "ordersController",
            templateUrl: "/app/views/orders.html"
        });

        $routeProvider.when("/refresh", {
            controller: "refreshController",
            templateUrl: "/app/views/refresh.html"
        });

        $routeProvider.when("/tokens", {
            controller: "tokensManagerController",
            templateUrl: "/app/views/tokens.html"
        });

        $routeProvider.otherwise({ redirectTo: "/home" });

    });

    /*
        启用Cookie支持
    */
    app.config(function ($httpProvider) {
        $httpProvider.defaults.withCredentials = true;
    });

    /*
        启用错误处理 和 调式信息输出
    */
    app.config(function ($httpProvider) {
        $httpProvider.interceptors.push(function () {
            return {
                request: function (config) {
                    if (IsDebug && IsDebugFull) {
                        console.log(new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString() + " config:", config);
                        console.log(new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString() + " request:arguments", arguments);
                    }
                    return config;
                },
                requestError: function (error) {
                    if (IsDebug && IsDebugFull) {
                        console.log(new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString() + " requestError:error", error);
                    }
                    return error;
                },
                response: function (response) {
                    if (IsDebug && IsDebugFull) {
                        console.log(new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString() + " response:", response);
                        console.log(new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString() + " response:arguments", arguments);
                    }
                    
                    return response;
                },
                responseError: function (error) {
                    if (IsDebug) {
                        console.log(new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString() + " responseError:error", error);
                    }
                    switch (error.status) {
                        case 0:
                            layer.msg("网络断开了，请检查您的网络连接！");
                            break;
                        case -1:
                            layer.msg("服务器维护中，请稍后！");
                            break;
                        case 200:
                            break;
                        case 401:
                            layer.msg("登录超时，请重新登录！" + "statusText:" + error.statusText);
                            break;
                        case 403:
                            layer.msg("一人一账号限制，您的账号已在其它地方登录！如非本人操作，请修改密码！" + "statusText:" + error.statusText);
                            break;
                        case 500:
                            layer.msg("服务忙，请稍后重试！");
                            break;
                        default:
                            break;
                    }
                    return error;
                }
            };
        });
    });

    return app;
})(angular);

