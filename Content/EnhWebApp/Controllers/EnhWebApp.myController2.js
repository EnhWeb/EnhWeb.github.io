"use strict";

EnhWebApp.controller("myController2", function ($scope, $http, baseUrl) {
    $scope.Loading = true;
    $scope.isSuccess = true;

    //http://www.cnblogs.com/zshome/p/5811591.html
    $scope.myPage = {
        currentPage: 1,//访问第几页数据，从1开始
        totalItems: 0,//数据库中总共有多少条数据
        itemsPerPage: 5,//默认每页展示多少条数据，可更改
        pagesLength: 15,//显示多少个页码到页面中
        perPageOptions: [5, 10, 20, 30, 40, 50, 60]//可选择的每页展示多少条数据
    };
    

    $scope.LoadData = function () {
        $scope.Loading = true;
        $scope.isSuccess = true;

        //获取列表需要时，将页码重置为1
        if (typeof $scope.myPage.pageNub != "undefined") {
            $scope.myPage.currentPage = $scope.myPage.pageNub;
        }        

        setTimeout(function () {
            $http.get(
                baseUrl + "TestBaseInfo/GetCompanys", {
                    params: {
                        id: "833524802756018178",
                        "pageindex": $scope.myPage.currentPage,
                        "pagesize": $scope.myPage.itemsPerPage
                    }
                }
            ).then(function (response) {
                if (response.status == 200)
                {
                    $scope.isSuccess = response.data.isSuccess;

                    if ($scope.isSuccess == true) {
                        var Companys = response.data.data;
                        for (var i = 0; i < Companys.length; i++) {
                            Companys[i].cases = JSON.parse(Companys[i].casesjson.replace(/\\/g, ""));
                        }
                        $scope.Companys = Companys;

                        $scope.currentPageIndex = response.data.currentPageIndex;
                        $scope.pageSize = response.data.pageSize;
                        $scope.totalPageCount = response.data.totalPageCount;
                        $scope.startItemIndex = response.data.startItemIndex;
                        $scope.endItemIndex = response.data.endItemIndex;
                        $scope.totalItemCount = response.data.totalItemCount;

                        $scope.myPage.totalItems = response.data.totalItemCount;//当获取总数据后，修改默认值
                    } 
                } else {
                    $scope.isSuccess = false;
                }  

                $scope.Loading = false;
            });
        }, 500);
    };

    //监测当页码。总数据，每页展示数据个数变化时，重新加载数据
    $scope.$watch(function () {
        return $scope.myPage.itemsPerPage + ' ' + $scope.myPage.currentPage + ' ' + $scope.myPage.totalItems;
    }, $scope.LoadData);

    //$scope.LoadData();
});





/*

//    示例数据

{
    "data": [
        {
            "id": "833594110186094592",
            "comname": "湖南青铜时代创意策划有限公司",
            "logoimg": "http://cdn-resource-static.cost88.com/UploadFiles/Images/4B2A7B9FD0BC510220FE10AA1B386CB2DEEA7E4214C69D4C1E9E286F13904D9CE874137C6329E35E.png",
            "artimgurl": "http://cdn-resource-static.cost88.com",
            "businesslicensevpath": "http://cdn-resource-static.cost88.com",
            "comaddress": null,
            "comartificial": null,
            "combank": null,
            "comaccount": null,
            "insID": null,
            "comcapital": null,
            "taxno": null,
            "tel": null,
            "taxer": null,
            "regdate": "2016-01-08T00:00:00",
            "accountmanager": null,
            "scope": null,
            "seqno": 0,
            "isenable": false,
            "createuser": null,
            "lastedit": null,
            "createtime": "0001-01-01T00:00:00",
            "lastdate": "0001-01-01T00:00:00",
            "isdeleted": false,
            "reporttype": 0,
            "casesjson": "[{\"Id\":\"837586932400652288\",\"CaseDate\":\"2016-02\",\"State\":0,\"SeqNo\":1}]"
        },
        {
            "id": "833845063619444736",
            "comname": "长沙市易博云天信息科技有限公司",
            "logoimg": "http://cdn-resource-static.cost88.com/UploadFiles/Images/4B2A7B9FD0BC5102F684C9AF9C346B630A9958D13A9BD6A1EBE8D350F61F86421E89CB31B8682C36.png",
            "artimgurl": "http://cdn-resource-static.cost88.com",
            "businesslicensevpath": "http://cdn-resource-static.cost88.com",
            "comaddress": null,
            "comartificial": null,
            "combank": null,
            "comaccount": null,
            "insID": null,
            "comcapital": null,
            "taxno": null,
            "tel": null,
            "taxer": null,
            "regdate": "2016-01-11T00:00:00",
            "accountmanager": null,
            "scope": null,
            "seqno": 0,
            "isenable": false,
            "createuser": null,
            "lastedit": null,
            "createtime": "0001-01-01T00:00:00",
            "lastdate": "0001-01-01T00:00:00",
            "isdeleted": false,
            "reporttype": 0,
            "casesjson": "[{\"Id\":\"837586983650852864\",\"CaseDate\":\"2016-01\",\"State\":0,\"SeqNo\":1}]"
        },
        {
            "id": "833845771634737152",
            "comname": "长沙卓越物业管理有限公司",
            "logoimg": "http://cdn-resource-static.cost88.com/UploadFiles/Images/4B2A7B9FD0BC51028C1B1606E7FD25B039E4A2C8B51341580910E10049B43C7FF88EEB6417D38423.png",
            "artimgurl": "http://cdn-resource-static.cost88.com",
            "businesslicensevpath": "http://cdn-resource-static.cost88.com",
            "comaddress": null,
            "comartificial": null,
            "combank": null,
            "comaccount": null,
            "insID": null,
            "comcapital": null,
            "taxno": null,
            "tel": null,
            "taxer": null,
            "regdate": "2014-09-10T00:00:00",
            "accountmanager": null,
            "scope": null,
            "seqno": 0,
            "isenable": false,
            "createuser": null,
            "lastedit": null,
            "createtime": "0001-01-01T00:00:00",
            "lastdate": "0001-01-01T00:00:00",
            "isdeleted": false,
            "reporttype": 0,
            "casesjson": "[{\"Id\":\"837587050998792192\",\"CaseDate\":\"2016-01\",\"State\":0,\"SeqNo\":1}]"
        },
        {
            "id": "833848640257654784",
            "comname": "湖南省安德利物流有限公司",
            "logoimg": "http://cdn-resource-static.cost88.com/UploadFiles/Images/4B2A7B9FD0BC5102382E235FC7A15D19782F29E37B72574950B9CBC8AB0A2AFC.png",
            "artimgurl": "http://cdn-resource-static.cost88.com",
            "businesslicensevpath": "http://cdn-resource-static.cost88.com",
            "comaddress": null,
            "comartificial": null,
            "combank": null,
            "comaccount": null,
            "insID": null,
            "comcapital": null,
            "taxno": null,
            "tel": null,
            "taxer": null,
            "regdate": "2012-08-25T00:00:00",
            "accountmanager": null,
            "scope": null,
            "seqno": 0,
            "isenable": false,
            "createuser": null,
            "lastedit": null,
            "createtime": "0001-01-01T00:00:00",
            "lastdate": "0001-01-01T00:00:00",
            "isdeleted": false,
            "reporttype": 0,
            "casesjson": "[{\"Id\":\"837587650587131904\",\"CaseDate\":\"2016-06\",\"State\":0,\"SeqNo\":1}]"
        },
        {
            "id": "833858125831340032",
            "comname": "湖南九易广告传媒有限公司",
            "logoimg": "http://cdn-resource-static.cost88.com/UploadFiles/Images/4B2A7B9FD0BC510259EFBADA33D6547E9C8EFB52C50C767E61777BCC70027055C691D742A58D2AD9.png",
            "artimgurl": "http://cdn-resource-static.cost88.com",
            "businesslicensevpath": "http://cdn-resource-static.cost88.com",
            "comaddress": null,
            "comartificial": null,
            "combank": null,
            "comaccount": null,
            "insID": null,
            "comcapital": null,
            "taxno": null,
            "tel": null,
            "taxer": null,
            "regdate": "2014-07-01T00:00:00",
            "accountmanager": null,
            "scope": null,
            "seqno": 0,
            "isenable": false,
            "createuser": null,
            "lastedit": null,
            "createtime": "0001-01-01T00:00:00",
            "lastdate": "0001-01-01T00:00:00",
            "isdeleted": false,
            "reporttype": 0,
            "casesjson": "[{\"Id\":\"837588043450810368\",\"CaseDate\":\"2016-05\",\"State\":0,\"SeqNo\":1}]"
        }
    ],
    "isSuccess": true,
    "currentPageIndex": 1,
    "pageSize": 5,
    "totalPageCount": 3,
    "startItemIndex": 1,
    "endItemIndex": 5,
    "totalItemCount": 12
    }






PagerList[ScCompanyBean] {
data (Array[ScCompanyBean], optional): 数据实体 或者 数据实体列表 ,
isSuccess (boolean, optional): 查询是否成功 ,
currentPageIndex (integer, optional): 当前页码 Gets or sets the current page index. ,
pageSize (integer, optional): 页大小 Gets or sets the number of data items that are displayed for each page of data. ,
totalPageCount (integer, optional): 分页总页数 Gets or sets the total number of data items that are available for paging. ,
startItemIndex (integer, optional): 开始项索引 Gets the index of the first data item that is displayed on a page of data. ,
endItemIndex (integer, optional): 结束项索引 Gets the index of the last data item that is displayed on a page of data. ,
totalItemCount (integer, optional): 数据库中数据总条数 Gets or sets the total number of records that are available for paging.
}

ScCompanyBean {
id (string, optional): 主键 ,
comname (string, optional): 公司名称 ,
logoimg (string, optional): 公司LOGO图片 ,
artimgurl (string, optional): 结构图 ,
businesslicensevpath (string, optional): 营业执照照片 ,
comaddress (string, optional): 公司地址 ,
comartificial (string, optional): 公司法人 ,
combank (string, optional): 公司开户行 ,
comaccount (string, optional): 公司开户账户 ,
insID (string, optional): 行业Id ,
comcapital (string, optional): 注册资本 ,
taxno (string, optional): 纳税人识别码 ,
tel (string, optional): 联系电话 ,
taxer (string, optional): 纳税主体 ,
regdate (string, optional): 注册时间，公司注册时间 ,
accountmanager (string, optional): 会计主管 ,
scope (string, optional): 经营范围 ,
seqno (integer, optional): 序号 ,
isenable (boolean, optional): 启用，当前是否启用，0为未启用，1为已启用 ,
createuser (string, optional): 创建人 ,
lastedit (string, optional): 修改人 ,
createtime (string, optional): 创建时间，数据创建时间 ,
lastdate (string, optional): 修改时间 ,
isdeleted (boolean, optional): 是否已删除，0为未删除，1为已删除 ,
reporttype (integer, optional): 标识公司资产负债表利润表类型 ,
casesjson (string, optional): 期间信息Json，用来保存会计期间实体信息
}

*/