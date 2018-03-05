yx_mallApp
    .controller("scanApplyController",["$scope","appService","$state",function ($scope,appService,$state) {
        document.title = "付款详情";
        $scope.scan={
            userInfo:[],
            nowIntegral:"",
            goodsInfo:[],
            goodsName:"",
            goodsId:"",
            shopId:"",
            shopName:"",
            shopPhone:"",
            paySn:"",
            //成交金额
            payMoney:"",
            back:false,
            userInt:[]
        };
        $scope.scan.userInfo = JSON.parse(localStorage.getItem("userInfo"));
        $scope.scan.goodsInfo = JSON.parse(localStorage.getItem("weChatScan")).class_goods;
        $scope.scan.shopName = JSON.parse(localStorage.getItem("weChatScan")).store_name;
        //获取用户积分信息
        var userIntegral=appService._postData(URL+"index.php?s=Api/MemberWealth/pointTop",{
            token:$scope.scan.userInfo.token,
            way:$scope.scan.userInfo.way,
        });
            userIntegral.then(function (value) {
                $scope.scan.userInt = value.data.data
            },function (reason) {
                console.log(reason)
            })
        //选择商品
        $scope.sc_cg=function () {
            $scope.scan.back = true;
        };

        //点击选择商品
        $scope.choseGoods=function (ele) {
            $scope.scan.back = false;
            $scope.scan.goodsName = ele.name;
            $scope.scan.goodsId = ele.class_id;
        }
    }])