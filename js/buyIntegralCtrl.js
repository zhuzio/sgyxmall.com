yx_mallApp
    .controller("buyIntegralController",["$scope","appService","$state",function ($scope,appService,$state) {
        document.title = "购积分";
        $scope.buyInt={
            userInfo:[],
            integralNum:"",
            isClass:false,
            orderId:"",
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
      /*  $scope.paymentForGoods=function () {
            console.log($scope.buyInt.integralNum)

        }*/
    }])