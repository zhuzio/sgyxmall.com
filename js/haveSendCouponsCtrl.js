yx_mallApp
    .controller("haveSendCouponsController",["$scope","appService",function ($scope,appService) {
        document.title = "已发送优惠券"
        $scope.hsc={
            userInfo:[],
            hvcList:[]
        };
        $scope.hsc.userInfo = JSON.parse(localStorage.getItem("userInfo"));
        var hac = appService._postData(URL+"index.php?s=/Api/Coupon/my_store_coupon",{
            token:$scope.hsc.userInfo.token
        });
            hac.then(function (value) {
                console.log(value);
                $scope.hsc.hvcList = value.data.data;
            },function (reason) {
                console.log(reason)
            });
            $scope.delIt = function (e,i) {
                appService.conform("确定删除？删除以后此优惠券失效").then(function (value) {
                    $scope.hsc.hvcList.splice(i,1)
                    var delThis = appService._postData(URL+"index.php?s=/Api/Coupon/del_store_coupon",{
                        token:$scope.hsc.userInfo.token,
                        id:e.id
                    });
                        delThis.then(function (value2) {
                            console.log(value2)
                        },function (reason) {
                            console.log(reason)
                        })
                },function (reason) {
                    appService.artTxt("取消删除成功")
                })

            }
    }]);