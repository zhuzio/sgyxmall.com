yx_mallApp
    .controller("integralReceiveController",["$scope","appService","$state",function ($scope,appService,$state) {
        document.title = "积分迁入";
        $scope.intRec={
            userInfo:[],
            intRecList:[],
            isImg:false,
        };
        $scope.intRec.userInfo = JSON.parse(localStorage.getItem("userInfo"));
        var intRecList = appService._postData(URL+"index.php?s=Api/user/userSubsidy",{
            token:$scope.intRec.userInfo.token,
        });
            intRecList.then(function (value) {
                // console.log(value)
                $scope.intRec.intRecList = value.data.data;
                if (value.data.data == "" || value.data.data == undefined || value.data.data == null){
                    $scope.intRec.isImg = true;
                }
            },function (reason) {
                console.log(reason)
            })
    }])