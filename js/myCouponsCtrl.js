yx_mallApp
    .controller("myCouponsController",["$scope","$state","appService","$window",function ($scope,$state,appService,$window){
        document.title = '我的优惠券';
        $scope.mcc={
            userInfo:[],
            tabList:["未使用","已使用","已失效"],
            mccList:[],
            tabIdx:0,
            className:"",
            noData:false,
            info:[],
            userType:""
        };
        $scope.mcc.userInfo =  JSON.parse(localStorage.getItem("userInfo"));
        console.log($scope.mcc.userInfo)
        $scope.mcc.userType =  $scope.mcc.userInfo.type;

        $scope.getMyCoupons = function (sta,idx) {
            var myCoupons =appService._postData(URL+"/index.php?s=/Api/Coupon/my_member_coupon",{
                token:$scope.mcc.userInfo.token,
                status:sta
            });
                myCoupons.then(function (value) {
                    console.log(value.data.data)
                    var NoData = value.data.data==undefined || value.data.data =='' || value.data.data == null;
                    $scope.mcc.mccList = value.data.data;
                    switch (idx) {
                        case 0:
                            if (NoData) {
                                $scope.mcc.noData = true;
                            }else {
                                $scope.mcc.className = 'noUse'
                            }
                            break;
                        case 1:
                            if (NoData) {
                                $scope.mcc.noData = true;
                            }else {
                                $scope.mcc.className = 'haveUse'
                            }
                            break;
                        case 2:
                            if (NoData) {
                                $scope.mcc.noData = true;
                            }else {
                                $scope.mcc.className = 'failUse'
                            }
                            break;
                        default:
                            return false;
                    }
                },function (reason) {
                    console.log(reason)
                })
        };
        $scope.getMyCoupons(0,0)
        $scope.getMyCouponsType = function (i) {
            $scope.mcc.tabIdx = i;
            $scope.mcc.noData = false;
            $scope.getMyCoupons(i,i)
        };
        $scope.useIt =function (e) {
            appService.conform("确定现在使用？").then(function (value) {
                var useIt = appService._postData(URL+"/index.php?s=/Api/Coupon/member_use_coupon",{
                    token:$scope.mcc.userInfo.token,
                    id:e.id
                });
                    useIt.then(function (value2) {
                        console.log(value2)
                        if (value2.data.ret == "success") {
                            appService.artTxt(value2.data.msg).then(function (value3) {
                                $window.location.reload();
                            });
                        }
                    },function (reason) {
                        console.log(reason)
                    })
            },function (reason) {
                appService.artTxt("取消使用成功");
                return false;
            })
        }
    }])