"use strict";

EnhWebApp.controller("myController1", function ($scope, $http, baseUrl) {
    $scope.Loading = true;
    $scope.isSuccess = true;
    $scope.Industrys = [];
    $scope.alert = function (msg) {
        window.alert(msg);
    };

    $scope.LoadData = function () {
        $scope.Loading = true;
        setTimeout(function () {
            $http.get(baseUrl + "TestBaseInfo/GetIndustrys").then(function (response) {
                if (response.status == 200) {
                    $scope.Industrys = response.data;
                } else {
                    $scope.isSuccess = false;
                }

                $scope.Loading = false;
            });
        }, 150);
    };

    $scope.LoadData();
});




/*


[
  {
    "id": "833524802756018176",
    "industryname": "商贸业",
    "filepath": "http://cdn-resource-static.cost88.com/UploadFiles/SiteDefaultImages/Industry/pic01.png",
    "filepath1": "http://cdn-resource-static.cost88.com/UploadFiles/SiteDefaultImages/Industry/hover01.png",
    "filepath2": "http://cdn-resource-static.cost88.com",
    "seqno": 0,
    "isenable": false,
    "createuser": null,
    "lastupdateuser": null,
    "createtime": "0001-01-01T00:00:00",
    "lastupdatetime": "0001-01-01T00:00:00",
    "isdeleted": false
  },
  {
    "id": "833524802756018177",
    "industryname": "工业",
    "filepath": "http://cdn-resource-static.cost88.com/UploadFiles/SiteDefaultImages/Industry/pic02.png",
    "filepath1": "http://cdn-resource-static.cost88.com/UploadFiles/SiteDefaultImages/Industry/hover02.png",
    "filepath2": "http://cdn-resource-static.cost88.com",
    "seqno": 0,
    "isenable": false,
    "createuser": null,
    "lastupdateuser": null,
    "createtime": "0001-01-01T00:00:00",
    "lastupdatetime": "0001-01-01T00:00:00",
    "isdeleted": false
  },
  {
    "id": "833524802756018178",
    "industryname": "服务业",
    "filepath": "http://cdn-resource-static.cost88.com/UploadFiles/SiteDefaultImages/Industry/pic03.png",
    "filepath1": "http://cdn-resource-static.cost88.com/UploadFiles/SiteDefaultImages/Industry/hover03.png",
    "filepath2": "http://cdn-resource-static.cost88.com",
    "seqno": 0,
    "isenable": false,
    "createuser": null,
    "lastupdateuser": null,
    "createtime": "0001-01-01T00:00:00",
    "lastupdatetime": "0001-01-01T00:00:00",
    "isdeleted": false
  },
  {
    "id": "833524802756018179",
    "industryname": "金融业",
    "filepath": "http://cdn-resource-static.cost88.com/UploadFiles/SiteDefaultImages/Industry/pic04.png",
    "filepath1": "http://cdn-resource-static.cost88.com/UploadFiles/SiteDefaultImages/Industry/hover04.png",
    "filepath2": "http://cdn-resource-static.cost88.com",
    "seqno": 0,
    "isenable": false,
    "createuser": null,
    "lastupdateuser": null,
    "createtime": "0001-01-01T00:00:00",
    "lastupdatetime": "0001-01-01T00:00:00",
    "isdeleted": false
  },
  {
    "id": "833524802756018180",
    "industryname": "房地产",
    "filepath": "http://cdn-resource-static.cost88.com/UploadFiles/SiteDefaultImages/Industry/pic05.png",
    "filepath1": "http://cdn-resource-static.cost88.com/UploadFiles/SiteDefaultImages/Industry/hover05.png",
    "filepath2": "http://cdn-resource-static.cost88.com",
    "seqno": 0,
    "isenable": false,
    "createuser": null,
    "lastupdateuser": null,
    "createtime": "0001-01-01T00:00:00",
    "lastupdatetime": "0001-01-01T00:00:00",
    "isdeleted": false
  },
  {
    "id": "833524802756018181",
    "industryname": "外贸",
    "filepath": "http://cdn-resource-static.cost88.com/UploadFiles/SiteDefaultImages/Industry/pic06.png",
    "filepath1": "http://cdn-resource-static.cost88.com/UploadFiles/SiteDefaultImages/Industry/hover06.png",
    "filepath2": "http://cdn-resource-static.cost88.com",
    "seqno": 0,
    "isenable": false,
    "createuser": null,
    "lastupdateuser": null,
    "createtime": "0001-01-01T00:00:00",
    "lastupdatetime": "0001-01-01T00:00:00",
    "isdeleted": false
  },
  {
    "id": "833524802756018182",
    "industryname": "建筑业",
    "filepath": "http://cdn-resource-static.cost88.com/UploadFiles/SiteDefaultImages/Industry/pic07.png",
    "filepath1": "http://cdn-resource-static.cost88.com/UploadFiles/SiteDefaultImages/Industry/hover07.png",
    "filepath2": "http://cdn-resource-static.cost88.com",
    "seqno": 0,
    "isenable": false,
    "createuser": null,
    "lastupdateuser": null,
    "createtime": "0001-01-01T00:00:00",
    "lastupdatetime": "0001-01-01T00:00:00",
    "isdeleted": false
  },
  {
    "id": "833524802756018183",
    "industryname": "行政事业单位",
    "filepath": "http://cdn-resource-static.cost88.com/UploadFiles/SiteDefaultImages/Industry/pic08.png",
    "filepath1": "http://cdn-resource-static.cost88.com/UploadFiles/SiteDefaultImages/Industry/hover08.png",
    "filepath2": "http://cdn-resource-static.cost88.com",
    "seqno": 0,
    "isenable": false,
    "createuser": null,
    "lastupdateuser": null,
    "createtime": "0001-01-01T00:00:00",
    "lastupdatetime": "0001-01-01T00:00:00",
    "isdeleted": false
  },
  {
    "id": "833524802756018184",
    "industryname": "餐饮业",
    "filepath": "http://cdn-resource-static.cost88.com/UploadFiles/SiteDefaultImages/Industry/pic09.png",
    "filepath1": "http://cdn-resource-static.cost88.com/UploadFiles/SiteDefaultImages/Industry/hover09.png",
    "filepath2": "http://cdn-resource-static.cost88.com",
    "seqno": 0,
    "isenable": false,
    "createuser": null,
    "lastupdateuser": null,
    "createtime": "0001-01-01T00:00:00",
    "lastupdatetime": "0001-01-01T00:00:00",
    "isdeleted": false
  },
  {
    "id": "833524802756018185",
    "industryname": "农林牧渔",
    "filepath": "http://cdn-resource-static.cost88.com/UploadFiles/SiteDefaultImages/Industry/pic10.png",
    "filepath1": "http://cdn-resource-static.cost88.com/UploadFiles/SiteDefaultImages/Industry/hover10.png",
    "filepath2": "http://cdn-resource-static.cost88.com",
    "seqno": 0,
    "isenable": false,
    "createuser": null,
    "lastupdateuser": null,
    "createtime": "0001-01-01T00:00:00",
    "lastupdatetime": "0001-01-01T00:00:00",
    "isdeleted": false
  }
]








Inline Model [
Inline Model 1
]

Inline Model 1 {
id (string, optional): 主键 ,
industryname (string, optional): 行业名称 ,
filepath (string, optional): 主图片地址 ,
filepath1 (string, optional): 次图片地址 ,
filepath2 (string, optional): 案例列表图片 ,
seqno (integer, optional): 序号，排序编号 ,
isenable (boolean, optional): 启用，是否启用当前行业，0为未启用，1为已启用 ,
createuser (string, optional): 创建人 ,
lastupdateuser (string, optional): 修改人，最后修改人 ,
createtime (string, optional): 创建时间 ,
lastupdatetime (string, optional): 修改时间 ,
isdeleted (boolean, optional): 是否已删除，1为已删除，0为未删除
}

*/