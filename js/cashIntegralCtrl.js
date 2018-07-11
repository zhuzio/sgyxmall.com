yx_mallApp
    .controller("cashIntegralController",["$scope","appService",function ($scope,appService) {
        document.title = '现金积分';
        $scope.ci={
            userInfo:[],
            info:[]
        };
        $scope.ci.userInfo = JSON.parse(localStorage.getItem("userInfo"));
        var ciData = appService._postData(URL+'index.php?s=Api/CashPoints/getAvailablePoints',{
            token:$scope.ci.userInfo.token
        });
            ciData.then(function (value) {
                console.log(value)
                $scope.ci.info = value.data.data;
            },function (reason) {
                console.log(reason)
            })
    }])