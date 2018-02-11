yx_mallApp
    .controller("buyAndSendIntegralDetailController",["$scope","appService","$state","$stateParams",function ($scope,appService,$state,$stateParams) {
        document.title='发购积分明细';
        $scope.basid={
            userInfo:[],
            //控制显示的模块
            buyIs:false,
            sendIs:true,
            // 购积分数据
            buyInt:{

            },
            // 发积分数据
            sendInt:{
                // 累计积分
                totalInt:"",
                // 已发积分
                haveSendInt:"",
                // 当前积分
                nowInt:"",
                //列表信息
                sendIntList:[]
            }
        };
        $scope.basid.userInfo = JSON.parse(localStorage.getItem("userInfo"));
        //获取发积分的信息
        var sendIntInfo=appService._postData(URL+"index.php?s=Api/ShopCenter1/shopSendPointList",{
            token:$scope.basid.userInfo.token,
            way:$scope.basid.userInfo.way
        });
            sendIntInfo.then(function (value) {
                console.log(value);
                $scope.basid.sendInt.sendIntList = value.data.data;
            },function (reason) {
                console.log(reason);
            });
    }])