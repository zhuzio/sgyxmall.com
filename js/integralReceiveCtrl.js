yx_mallApp
    .controller("integralReceiveController",["$scope","appService","$state",function ($scope,appService,$state) {
        document.title = "积分迁入";
        $scope.intRec={
            userInfo:[],
            intRecList:[],
        };
        $scope.intRec.userInfo = JSON.parse(localStorage.getItem("userInfo"));
        var intRecList = appService._postData(URL+"index.php?s=Api/user/userSubsidy",{
            token:$scope.intRec.userInfo.token,
        });
            intRecList.then(function (value) {
                console.log(value)

                $scope.intRec.intRecList = value.data.data;
            },function (reason) {
                console.log(reason)
            })
    }])