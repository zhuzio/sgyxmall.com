yx_mallApp
    .controller("buyIntegralController",["$scope","appService","$state","$window",function ($scope,appService,$state,$window) {
        document.title = "购积分";
        $scope.buyInt={
            userInfo:[],
            integralNum:"",
            isClass:false,
            orderId:"",
            applyPsd:""
        };
        $scope.buyInt.userInfo = JSON.parse(localStorage.getItem("userInfo"));
        //去支付
        $scope.goBuy=function () {
            if ($scope.buyInt.integralNum == ""){
                appService.artTxt("请输入你要购买的积分数量！！").then(function (value) {
                    return false;
                });
                return false;
            };
            if (parseInt($scope.buyInt.integralNum) < 1){
                appService.artTxt("积分数量不能小于1积分！！").then(function (value) {
                    return false;
                });
                return false;
            }
            var paymentForGoods=appService._postData(URL+"index.php?s=Api/payment/shopPointOrder",{
                token:$scope.buyInt.userInfo.token,
                // way:$scope.buyInt.userInfo.way,
                money:$scope.buyInt.integralNum
            });
            paymentForGoods.then(function (value) {
                $scope.buyInt.orderId = value.data.data;
            },function (reason) {
                console.log(reason)
            })
            $scope.buyInt.isClass = true ;
        };
        //货款支付
        $scope.paymentForGoods=function () {
            // console.log($scope.buyInt.integralNum)
            $scope.secondPsd();
            $scope.buyInt.isClass = false ;

        };


        //调二级支付
        $scope.secondPsd=function () {
            $(".input_psd_container").animate({
                top:"0"
            },300);
        };
        //调取支付接口
        $scope.applyApi=function (spd) {
            var userApply=appService._postData(URL+"index.php?s=/Api/Payment/onlinePayment",
                {
                    token: $scope.buyInt.userInfo.token,
                    order_sn:$scope.buyInt.orderId,
                    payment:"buypoint",
                    payment_way:10,
                    pay_passwd:spd,
                });
            userApply.then(function (e) {
                // console.log(e)
                if(e.data.ret == "success"){
                    appService.artTxt(e.data.msg).then(function (value) {
                        $(".input_process_loading").animate({
                            top:"100%"
                        },0);
                        $(".input_psd_container").animate({
                            top:"100%"
                        },300);

                        $state.go("buyAndSendIntegralDetail");
                    })
                }else {

                    appService.artTxt(e.data.msg).then(function (value) {
                        $window.location.reload()
                    });

                }
            },function (e) {
                console.log(e)
            })
        };
        $scope.$on('applyInputSuccess',function(event,password){
            //passworc为密码
            $(".input_process_loading").animate({
                top:"0"
            },0);
            $scope.buyInt.applyPsd = password;
            $scope.applyApi( $scope.buyInt.applyPsd);
        });
        $scope.$on('cancelApply',function(){
            //取消支付
            $(".input_psd_container").animate({
                top:"100%"
            },300);
        });
    }])