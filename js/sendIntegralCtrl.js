yx_mallApp
    .controller("sendIntegralController",["$scope","appService","$state",function ($scope,appService,$state) {
        document.title = "发积分";
        $scope.sendInfo={
            buyerName:"",
            sendIntegralNum:"",
            dealMoney:"",
            sendInfos:[],
            sendGoodsName:"",
            finalOrder:[],
            //商家可用积分
            merchantPoint:"",
            userInfo:[]
        };
        $scope.sendInfo.userInfo = JSON.parse(localStorage.getItem("userInfo"));
        //获得商品名称
        if (localStorage.getItem("mg")){
            $scope.sendInfo.sendGoodsName=JSON.parse(localStorage.getItem("mg")).name
        }else {
            $scope.sendInfo.sendGoodsName = "请选择"
        };
        //获得选择商品名字时的送用户的积分
        $scope.sendInfo.sendInfos=JSON.parse(localStorage.getItem("sendInfo"));
        $scope.sendInfo.finalOrder = JSON.parse(localStorage.getItem("finalOrder"));
        // console.log($scope.sendInfo.finalOrder)
        if ($scope.sendInfo.sendInfos){
            $scope.sendInfo.buyerName = $scope.sendInfo.sendInfos.buyerName;
            $scope.sendInfo.sendIntegralNum = $scope.sendInfo.sendInfos.sendIntegralNum;
            $scope.sendInfo.dealMoney = $scope.sendInfo.sendInfos.dealMoney;
        }else if ( $scope.sendInfo.finalOrder){
            $scope.sendInfo.buyerName = $scope.sendInfo.finalOrder.finalBuyerName;
            $scope.sendInfo.sendIntegralNum = $scope.sendInfo.finalOrder.finalIntegralNum;
            $scope.sendInfo.dealMoney = $scope.sendInfo.finalOrder.finalDealMoney;
        }else {
            $scope.sendInfo.buyerName = "";
            $scope.sendInfo.sendIntegralNum = "";
            $scope.sendInfo.dealMoney = ""
        };
        //去选择商品名字
        $scope.goChoseGoods=function () {
            localStorage.setItem("sendInfo",JSON.stringify($scope.sendInfo));
            $state.go("merchantAddGoods");
        };
        //去确认订单
        $scope.goConformSendOrder=function () {
            var z_tel=/^1[34578]\d{9}$/;
            if ($scope.sendInfo.buyerName == "" || z_tel.test($scope.sendInfo.buyerName) == false){
                appService.artTxt("买家账号不能为空或格式错误！！！");
                return false;
            };
            if ($scope.sendInfo.sendIntegralNum == ""){
                appService.artTxt("赠送积分不能为空！！！");
                return false;
            };
            if ($scope.sendInfo.dealMoney == ""){
                appService.artTxt("成交金额不能为空！！！");
                return false;
            };
            if ($scope.sendInfo.sendGoodsName == "请选择" || $scope.sendInfo.sendGoodsName == ""){
                appService.artTxt("商品名称不能为空！！！");
                return false;
            };

            var memberAbout=appService._postData(URL+"index.php?s=Api/shop_center1/send_point_step1",{
                token:$scope.sendInfo.userInfo.token,
                // way:$scope.sendInfo.userInfo.way,
                mobile:$scope.sendInfo.buyerName,
                point:$scope.sendInfo.sendIntegralNum
            });
            memberAbout.then(function (value) {
                // console.log(value);
                if (value.data.ret=="ok"){
                    var finalOrder={
                        finalBuyerName:"",
                        finalIntegralNum:"",
                        finalDealMoney:"",
                        finalGoodsName:""
                    };
                    finalOrder.finalBuyerName = $scope.sendInfo.buyerName;
                    finalOrder.finalIntegralNum = $scope.sendInfo.sendIntegralNum;
                    finalOrder.finalDealMoney = $scope.sendInfo.dealMoney;
                    finalOrder.finalGoodsName = $scope.sendInfo.sendGoodsName;
                    localStorage.setItem("finalOrder",JSON.stringify(finalOrder));
                    localStorage.removeItem("sendInfo");
                    $state.go("sendIntegralOrder",{sP:value.data.data.system_point,uP:value.data.data.user_point,uN:value.data.data.username});
                }else {
                    appService.artTxt(value.data.msg);
                    return false
                }
            },function (reason) {
                console.log(reason)
            })





        };
        //获取商家可用积分
        var getMPoint=appService._postData(URL+"index.php?s=Api/shop_center1/user_point",{
            token: $scope.sendInfo.userInfo.token,
            // way: $scope.sendInfo.userInfo.way
        });
            getMPoint.then(function (value) {
                $scope.sendInfo.merchantPoint = value.data.data;
            },function (reason) {
                console.log(reason)
            })
    }]);