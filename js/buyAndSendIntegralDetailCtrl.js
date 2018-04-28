yx_mallApp
    .controller("buyAndSendIntegralDetailController",["$scope","appService","$state","$stateParams",function ($scope,appService,$state,$stateParams) {
        document.title='发购积分明细';
        $scope.bas={
            userInfo:[],
            tabClassBuy:true,
            tabClassSend:false,
            buyMonthInfo:[],
            buyIntInfo:[],

            sendMonthInfo:[],
            sendIntInfo:[],
            IntegralType:"buy_point",
            buyIntBlock:false,
            sendIntBlock:false,

            // 当前积分
            nowIntegral:"",
            // 累计购买积分
            totalBuyIntegral:"",
            // 累计发积分
            totalSendIntegral:"",
            // 累计积分
            totalIntegral:"",

            comeWay:$stateParams.way,

            buyMore:false,
            sendMore:false,
            buyPage:1,
            sendPage:1,
        };
        if (localStorage.getItem("finalOrder")){
            localStorage.removeItem("finalOrder");
        };
        $scope.bas.userInfo = JSON.parse(localStorage.getItem("userInfo"));
        // 获得 月份数据
        $scope.getBasData=function (IntegralType,idx) {
            var buyAndSendIntegral=appService._postData(URL+"index.php?s=Api/shopCenter1/shopPointmonth",{
                token:$scope.bas.userInfo.token,
                // way:$scope.bas.userInfo.way,
                point_type:IntegralType,
            });
            buyAndSendIntegral.then(function (value) {
                // console.log(value)
                switch (idx){
                    case 1:
                        $scope.bas.buyMonthInfo = value.data.data;
                        $scope.bas.nowIntegral = value.data.totalpage.newpoint;
                        $scope.bas.totalBuyIntegral = value.data.totalpage.buy_point;
                        break;
                    case 2:
                        $scope.bas.sendMonthInfo = value.data.data;
                        $scope.bas.nowIntegral = value.data.totalpage.newpoint;
                        $scope.bas.totalSendIntegral = value.data.totalpage.summoney;
                        $scope.bas.totalIntegral = value.data.totalpage.totalmoney
                        break;
                }
            },function (reason) {
                console.log(reason)
            });
        };
        if ($scope.bas.comeWay == 2){
            $scope.bas.IntegralType = "send_point";
            $scope.getBasData("send_point",2);
            $scope.bas.tabClassBuy = false;
            $scope.bas.tabClassSend = true;
        }else {
            $scope.getBasData("buy_point",1);
        };

        // 获得 每月份详细数据
        $scope.getBasMonthData=function (idx,pointType,month,page) {
            var getBasMonthData=appService._postData(URL+"index.php?s=Api/shopCenter1/shopPointmonthList",{
                token:$scope.bas.userInfo.token,
                // way:$scope.bas.userInfo.way,
                point_type:pointType,
                month:month,
                page:page
            });

            /*
            * is_pass  ：  0 未审核  1 已通过   2已驳回
            *
            * */
            getBasMonthData.then(function (value) {
                // console.log(value);
                var noData = value.data.data==null || value.data.data==""||value.data.data==undefined;
                switch (idx){
                    case 1:
                        if (page!=1){
                            if (noData){
                                $scope.bas.buyMore = false;
                            }else {
                                for (var i in value.data.data){
                                    $scope.bas.buyIntInfo.push((value.data.data)[i]);
                                };
                            };
                        }else {
                            if (noData){
                                appService.artTxt("暂无数据");
                            }else {
                                $scope.bas.buyIntInfo = value.data.data;
                                if (value.data.totalpage > 1){
                                    $scope.bas.buyMore = true;
                                };
                            };
                        };
                        break;
                    case 2:
                        if (page!=1){
                            if (noData){
                                $scope.bas.sendMore = false;
                            }else {

                                for (var i in value.data.data){
                                    $scope.bas.sendIntInfo.push((value.data.data)[i]);
                                };
                            };
                        }else {
                            if (noData){
                                appService.artTxt("暂无数据");
                            }else {
                                $scope.bas.sendIntInfo = value.data.data;
                                if (value.data.totalpage > 1){
                                    $scope.bas.sendMore = true;
                                };
                            };

                        };
                        break;
                };
            },function (reason) {
                console.log(reason)
            })
        };

        // 切换 tab 按钮
        $scope.changeBasTab=function (idx) {
            switch (idx){
                case 1:
                    $scope.bas.tabClassBuy = true;
                    $scope.bas.tabClassSend =false;
                    $scope.bas.IntegralType = "buy_point";
                    $scope.getBasData($scope.bas.IntegralType,idx);
                    break;
                case 2:
                    $scope.bas.tabClassBuy = false;
                    $scope.bas.tabClassSend = true;
                    $scope.bas.IntegralType = "send_point";
                    $scope.getBasData($scope.bas.IntegralType,idx);
                    break;
            };
        };
        // 点击月份 获得详细数据
        $scope.showBasIntDet=function (idx,intType,$index) {
            switch (idx){
                case 1:
                    $scope.bas.buyIntInfo = [];
                    intType.buyIntBlock = true;
                    angular.forEach($scope.bas.buyMonthInfo,function(element,index){
                        if(index!=$index){
                            element.buyIntBlock=false;
                        }
                    });
                    $scope.bas.buyMore = false;
                    $scope.bas.buyPage = 1;
                    $scope.getBasMonthData(idx,$scope.bas.IntegralType,intType.months,1);
                    break;
                case 2:
                    $scope.bas.sendIntInfo = [];
                    intType.sendIntBlock = true;
                    angular.forEach($scope.bas.sendMonthInfo,function(element,index){
                        if(index!=$index){
                            element.sendIntBlock=false;
                        }
                    });
                    $scope.bas.sendMore = false;
                    $scope.bas.sendPage = 1;
                    $scope.getBasMonthData(idx,$scope.bas.IntegralType,intType.months,1);
                    break;
            };
        };
        //点击加载更多
        $scope.basAddMore=function (idx,intType) {
            switch (idx){
                case 1:
                    $scope.bas.buyPage+=1;
                    $scope.getBasMonthData(idx,$scope.bas.IntegralType,intType.months,$scope.bas.buyPage);
                    break;
                case 2:
                    $scope.bas.sendPage+=1;
                    $scope.getBasMonthData(idx,$scope.bas.IntegralType,intType.months,$scope.bas.sendPage);
                    break;
            }
        }
    }]);
