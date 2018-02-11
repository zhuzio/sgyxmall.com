yx_mallApp
    .controller("manageBandCardController",["$scope","appService","$state","$window",function ($scope,appService,$state,$window) {
        document.title = "银行卡管理";
        $scope.userBCInfo={
            cardList:[],
            userInfo:[]
        };
        $scope.userBCInfo.userInfo = JSON.parse(localStorage.getItem("userInfo"));
        var cardList = appService._postData(URL+"index.php?s=Api/Userset/crad",{token:$scope.userBCInfo.userInfo.token,way:$scope.userBCInfo.userInfo.way});
            cardList.then(function (value) {
                console.log(value)
                    $scope.userBCInfo.cardList = value.data.data;
                },
            function (reason) {
                console.log(reason)
            });
        //设为默认
        $scope.setDefBank=function (eve) {
            var r =confirm("确认设为默认？");
            if (r){
                var setDefBank = appService._postData(URL+"index.php?s=Api/Userset/setcard",{
                    token:$scope.userBCInfo.userInfo.token,
                    way:$scope.userBCInfo.userInfo.way,
                    bank_id:eve.bank_id
                });
                setDefBank.then(function (value) {
                    console.log(value);
                    if (value.data.ret == "success"){
                        alert(value.data.msg);
                        $window.location.reload();
                    }else {
                        alert(value.data.msg)
                    }

                },function (reason) {
                    console.log(reason)
                })
            };

        };
        //删除银行卡
        $scope.deleteBank=function (eve) {
            var r =confirm("确认删除银行卡？");
            if (r) {
                var deleteBank = appService._postData(URL + "index.php?s=Api/Userset/delcard", {
                    token: $scope.userBCInfo.userInfo.token,
                    way: $scope.userBCInfo.userInfo.way,
                    bank_id: eve.bank_id
                });
                    deleteBank.then(function (value) {
                        if (value.data.ret == "success"){
                            alert(value.data.msg);
                            $window.location.reload();
                        }else {
                            alert(value.data.msg)
                        }
                    },function (reason) {
                        console.log(reason)
                    })
            }else {
                return false;
            }
        }
    }])