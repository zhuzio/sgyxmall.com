//我的地址页面 控制器
yx_mallApp
    .controller("addressController",["$scope","appService","$window","$stateParams","$state",function ($scope,appService,$window,$stateParams,$state) {
        $scope.address={
            txt:"编辑",
            addressInfo:[],
            userInfo:[]
        };
        $scope.address.userInfo = JSON.parse(localStorage.getItem("userInfo"));
        // 获取收货地址列表
        var addressList = appService._postData(URL+"index.php?s=/Api/user/getAddress",{
            token:$scope.address.userInfo.token,
            // way:$scope.address.userInfo.way,
            apiType:"all"
        });
            addressList.then(function (value) {
                // console.log(value);
                $scope.address.addressInfo = value.data.data
            },function (reason) {
                console.log(reason)
            })
        //点击 出现 编辑 或者 完成
        $scope.checkis=function (e) {
            if(e.isCheck){
                $scope.address.txt = "完成";
                $('.ads_delete').animate({
                    right:"0"
                },300);
            }else {
                $scope.address.txt = "编辑";
                $('.ads_delete').animate({
                    right:"-20%"
                },300);
            }
        };
        //删除地址
        $scope.deleteAddress=function (ele,idx,ads) {
            ele.splice(idx,1);
            var delAddress=appService._postData(URL+"index.php?s=/Api/user/delAddress",{
                token:$scope.address.userInfo.token,
                // way:$scope.address.userInfo.way,
                addr_id:ads.addr_id
            });
                delAddress.then(function (value) {
                    if (value.data.ret == "success"){
                        appService.artTxt(value.data.msg);
                    }else {
                        appService.artTxt(value.data.msg);
                        return false;
                    }
                },function (reason) {
                    console.log(reason)
                });
                var defAd = JSON.parse(localStorage.getItem("choseAds"));
                if (defAd){
                    localStorage.removeItem("choseAds");
                };
        };
        //判断进入的页面
        $scope.goWhere=function (ads) {
            localStorage.setItem("choseAds",JSON.stringify(ads));
            // console.log(JSON.parse(localStorage.getItem("choseAds")));
            if ($stateParams.url == "clear"){
                $window.history.go(-1);
            }else {
                $state.go("addAddress",{url:"modify"})
            }
        }

    }])