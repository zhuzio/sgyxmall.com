yx_mallApp
    .controller("sendIntegralOrderController",["$scope","appService","$state","$stateParams","$window",function ($scope,appService,$state,$stateParams,$window) {
        document.title = "确认订单信息";
        $scope.sio={
            sioInfo:[],
            userInfo:[],
            sioInte:[],
            notice:"",
            //密码盘弹出
            psd:false,
            finalPsd:""
        };
        $scope.sio.sioInte = $stateParams;
        $scope.sio.userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (localStorage.getItem("finalOrder")){
            $scope.sio.sioInfo = JSON.parse(localStorage.getItem("finalOrder"));
        }else {
            $window.history.go(-1);
        }

        console.log($scope.sio.sioInfo)
        $scope.sendIG=function () {
            appService.conform("确认消费"+$scope.sio.sioInfo.finalIntegralNum+"积分?").then(function (value) {
                $(".input_psd_container").animate({
                    top:"0"
                },300);
            },function (reason) {
                appService.artTxt("取消支付");
            });
        };
        $scope.sendGo=function (psd) {
            var sendGo=appService._postData(URL+"index.php?s=Api/shop_center1/send_point",{
                token:$scope.sio.userInfo.token,
                way:$scope.sio.userInfo.way,
                mobile:$scope.sio.sioInfo.finalBuyerName,
                point:$scope.sio.sioInfo.finalIntegralNum,
                passwd:psd,
                money:$scope.sio.sioInfo.finalDealMoney,
                classid:JSON.parse(localStorage.getItem("mg")).class_id,
                remark:$scope.sio.notice
            });
                sendGo.then(function (value) {
                    console.log(value)
                    $scope.sio.psd = false;
                    if (value.data.ret == "ok"){
                        appService.artTxt(value.data.msg).then(function (value2) {
                            $state.go("buyAndSendIntegralDetail",{way:2})
                        })
                    }else {
                        appService.artTxt(value.data.msg).then(function (value2) {
                            $(".input_psd_container").animate({
                                top:"100%"
                            },300);
                            $(".input_process_loading").animate({
                                top:"100%"
                            },300);
                        });
                        return false;
                    }
                },function (reason) {
                    console.log(reason)
                })

        };

        //调取支付盘
        $scope.$on('applyInputSuccess',function(event,password){
            //passworc为密码
            $(".input_process_loading").animate({
                top:"0"
            },0);
            $scope.sio.psd = password;
            $scope.sendGo($scope.sio.psd);
        })
        $scope.$on('cancelApply',function(){
            //取消支付
            $(".input_psd_container").animate({
                top:"100%"
            },300);
        })
    }]);