"use strict";

var EnhWebApp = (function ($) {
    var app = $.module("EnhWebApp", []);

    /**
     * 是否为调试模式 默认值为 true;
     */
    var IsDebug = true;

    /*
        定义常量
    */
    var _baseUrl = IsDebug ? "http://localhost:57227/Api/" : "http://sc-webapi-dev-test-webenh.cost88.com";
    app.constant("baseUrl", _baseUrl);
    if (IsDebug) console.log("baseUrl:", _baseUrl);

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
                    if (IsDebug) {
                        console.log(new Date().toLocaleDateString() + " config:", config);
                        console.log(new Date().toLocaleDateString() + " request:arguments", arguments);
                    }
                    return config;
                },
                requestError: function () {
                    if (IsDebug) {
                        console.log(new Date().toLocaleDateString() + " requestError:arguments", arguments);
                    }
                },
                response: function (response) {
                    if (IsDebug) {
                        console.log(new Date().toLocaleDateString() + " response:", response);
                        console.log(new Date().toLocaleDateString() + " response:arguments", arguments);
                    }
                    return response;
                },
                responseError: function () {
                    if (IsDebug) {
                        console.log(new Date().toLocaleDateString() + " responseError:arguments", arguments);
                    }
                }
            };
        });
    });

    return app;
})(angular);

