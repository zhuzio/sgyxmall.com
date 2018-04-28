yx_mallApp
    .controller("upGradeKindController",["$scope","appService","$window","$stateParams",function ($scope,appService,$window,$stateParams) {
        document.title='选择代理位置';
        $scope.ugk={
            userInfo:[],
            province:[],
            provinceNum:"",
            provinceName:"",
            isP:true,

            city:[],
            cityNum:"",
            cityName:"",
            isC:false,

            area:[],
            areaNum:"",
            areaName:"",
            isA:false,

            adBox:false,

            upType:$stateParams.way,

            wayCity:false,
            wayArea:false,
        };
        $scope.ugk.userInfo = JSON.parse(localStorage.getItem("userInfo"));

        if ($scope.ugk.upType == 5){
            $scope.ugk.wayCity = true;
            $scope.ugk.wayArea = true;
        }else if($scope.ugk.upType == 6){
            $scope.ugk.wayCity = true;
            $scope.ugk.wayArea = false;
        }else if ($scope.ugk.upType == 7){
            $scope.ugk.wayCity = false;
            $scope.ugk.wayArea = false;
        };

        // 点击调出三级城市联动
        $scope.ugkAddress=function (idx) {
            $scope.ugk.adBox = true;
            switch (idx){
                case 0:
                    var ugkProvince = appService._postData(URL+"index.php?s=Api/address/address",{});
                        ugkProvince.then(function (value) {
                            $scope.ugk.province = value.data.data;
                        });
                    $scope.ugk.isP = true;
                    $scope.ugk.isC = false;
                    $scope.ugk.isA = false;
                    $scope.ugk.cityName = "";
                    $scope.ugk.areaName = "";
                    break;
                case 1:
                    var nowCity=appService._postData(URL+"index.php?s=Api/address/address",{id:$scope.ugk.provinceNum});
                        nowCity.then(function (value) {
                            $scope.ugk.city=value.data.data;
                        });
                    $scope.ugk.isP = false;
                    $scope.ugk.isC = true;
                    $scope.ugk.isA = false;
                    $scope.ugk.areaName = "";
                    break;
                case 2:
                    var nowArea=appService._postData(URL+"index.php?s=Api/address/address",{id:$scope.ugk.cityNum});
                        nowArea.then(function (value) {
                            $scope.ugk.area=value.data.data;
                        });
                    $scope.ugk.isP = false;
                    $scope.ugk.isC = false;
                    $scope.ugk.isA = true;
                    break;
            };
        };
        // 地址选择
        $scope.ugkAds=function (idx,ads) {
            switch (idx){
                case 0:
                    $scope.ugk.adBox = false;
                    $scope.ugk.provinceName = ads.name;
                    $scope.ugk.provinceNum = ads.id;
                    break;
                case 1:
                    $scope.ugk.adBox = false;
                    $scope.ugk.cityName = ads.name;
                    $scope.ugk.cityNum = ads.id;
                    break;
                case 2:
                    $scope.ugk.adBox = false;
                    $scope.ugk.areaName = ads.name;
                    $scope.ugk.areaNum = ads.id;
                    break;
            };
        };
        // 提交信息
        $scope.submitUpInfo=function () {
            var finalId;
            if ($scope.ugk.upType == 5){
                finalId = $scope.ugk.areaNum;
                if ($scope.ugk.provinceName == ""){
                    appService.artTxt("请选择省份！！");
                    return false;
                };
                if ($scope.ugk.cityName == ""){
                    appService.artTxt("请选择城市！！");
                    return false;
                };
                if ($scope.ugk.areaName == ""){
                    appService.artTxt("请选择市区！！");
                    return false;
                };
            };
            if ($scope.ugk.upType == 6){
                finalId = $scope.ugk.cityNum;
                if ($scope.ugk.provinceName == ""){
                    appService.artTxt("请选择省份！！");
                    return false;
                };
                if ($scope.ugk.cityName == ""){
                    appService.artTxt("请选择城市！！");
                    return false;
                };
            };
            if ($scope.ugk.upType == 7){
                finalId = $scope.ugk.provinceNum;
                if ($scope.ugk.provinceName == ""){
                    appService.artTxt("请选择省份！！");
                    return false;
                };
            };
            var upGradeKind = appService._postData(URL+"index.php?s=Api/userset/upgrade",{
                token:$scope.ugk.userInfo.token,
                // way:$scope.ugk.userInfo.way,
                type:$scope.ugk.upType,
                region_id:finalId
            });
                upGradeKind.then(function (value) {
                    if (value.data.ret == 'success'){
                        appService.artTxt(value.data.msg).then(function (value2) {
                            $window.history.go(-1)
                        })
                    }else {
                        appService.artTxt(value.data.msg);
                        return false;
                    }
                },function (reason) {
                    console.log(reason)
                })
        }
    }]);