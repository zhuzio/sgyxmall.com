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
            userInt:[],
            finalData:[],
            worng:[],
            spd:"",
            res:[],
            choseApplyType:false,
            role:0,
            /*购物积分 3 货款 10*/
            payment:3,
        };
        $scope.scan.userInfo = JSON.parse(localStorage.getItem("userInfo"));
        $scope.scan.goodsInfo = JSON.parse(localStorage.getItem("weChatScan")).class_goods;
        $scope.scan.paySn = JSON.parse(localStorage.getItem("weChatScan")).pay_sn;
        $scope.scan.shopId =  JSON.parse(localStorage.getItem("weChatScan")).store_id;
        $scope.scan.shopName = JSON.parse(localStorage.getItem("weChatScan")).store_name;
        $scope.scan.role = JSON.parse(localStorage.getItem("userInfo")).type;

        //获取用户积分信息
        var userIntegral=appService._postData(URL+"index.php?s=Api/MemberWealth/pointTop",{
            token:$scope.scan.userInfo.token,
            // way:$scope.scan.userInfo.way,
        });
            userIntegral.then(function (value) {
                $scope.scan.userInt = value.data.data
            },function (reason) {
                console.log(reason)
            });
        //选择商品
        $scope.sc_cg=function () {
            $scope.scan.back = true;
        };

        //点击选择商品
        $scope.choseGoods=function (ele) {
            $scope.scan.back = false;
            $scope.scan.goodsName = ele.name;
            $scope.scan.goodsId = ele.class_id;
        };

        //  购买
        $scope.giveIntegral=function (psd) {
            var userIntegralPay=appService._postData(URL+"index.php?s=Api/shopCenter1/user_balance_pay",{
                token:$scope.scan.userInfo.token,
                // way:$scope.scan.userInfo.way,
                pay_passwd:psd,
                // 商家ID
                sj_id:$scope.scan.shopId,
                //商品id
                classid:$scope.scan.goodsId,
                // 成交金额
                money:$scope.scan.payMoney,
                // 订单号
                pay_sn:$scope.scan.paySn,
                payment:$scope.scan.payment,
            });
            userIntegralPay.then(function (value) {
                if (value.data.ret == "ok"){
                    var callback=appService._postData(URL+"index.php?s=Api/shopCenter1/goodspayback_offline",{
                        token:$scope.scan.userInfo.token,
                        // way:$scope.scan.userInfo.way,
                        order_sn:value.data.data.order_sn
                    });
                    callback.then(function (value2) {
                        $scope.scan.res = value2;
                        if (value2.data.ret == "success"){
                            appService.artTxt(value2.data.msg).then(function (value3) {
                                $state.go("allianceOrder")
                            })
                        }else {
                            appService.artTxt(value2.data.msg)
                        }
                    },function (reason) {
                        $scope.scan.worng = reason.data
                    })
                }else if (value.data.ret == "err"){
                    appService.artTxt(value.data.msg).then(function (value2) {
                        $(".input_psd_container").animate({
                            top:"100%"
                        },300);
                        $(".input_process_loading").animate({
                            top:"100%"
                        },300);
                    });
                }
            },function (reason) {
                $(".input_psd_container").animate({
                    top:"100%"
                },300);
                appService.artTxt(reason);
                return false;
            });
        };
        // 点击完成
        $scope.OverScanApply=function () {
            if ($scope.scan.payMoney == ""){
                appService.artTxt("订单金额不能为空！");
                return false;
            };
            if ($scope.scan.goodsName == ""){
                appService.artTxt("请选择商品名称！");
                return false;
            };
            if ($scope.scan.role == 2){
                $scope.scan.choseApplyType = true;
            }else {
                appService.conform("确认消费"+$scope.scan.payMoney+"积分?").then(function (value) {
                    $(".input_psd_container").animate({
                        top:"0"
                    },300);
                },function (reason) {
                    appService.artTxt("取消支付");
                });
            };


           /* appService.conform("确认消费"+$scope.scan.payMoney+"积分?").then(function (value) {
                $(".input_psd_container").animate({
                    top:"0"
                },300);
            },function (reason) {
                appService.artTxt("取消支付");
            });*/


        };
        $scope.applyFunction=function (idx) {
            switch (idx){
                case 1:
                    $scope.scan.payment = 10;
                    $scope.scan.choseApplyType = false;
                    break;
                case 2:
                    $scope.scan.payment = 3;
                    $scope.scan.choseApplyType = false;
                    break;
            };
            appService.conform("确认消费"+$scope.scan.payMoney+"积分?").then(function (value) {
                $(".input_psd_container").animate({
                    top:"0"
                },300);
            },function (reason) {
                appService.artTxt("取消支付");
            });
        };


        //调取支付盘
        $scope.$on('applyInputSuccess',function(event,password){
            //passworc为密码
            $(".input_process_loading").animate({
                top:"0"
            },0);
            $scope.scan.spd = password;
            $scope.giveIntegral($scope.scan.spd);
        })
        $scope.$on('cancelApply',function(){
            //取消支付
            $(".input_psd_container").animate({
                top:"100%"
            },300);
        })

    }])