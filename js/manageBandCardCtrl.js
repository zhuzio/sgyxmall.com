yx_mallApp
    .controller("manageBandCardController",["$scope","appService","$state","$window","$stateParams",function ($scope,appService,$state,$window,$stateParams) {
        document.title = "银行卡管理";
        $scope.userBCInfo={
            cardList:[],
            userInfo:[]
        };

        if(!localStorage.getItem("userInfo")){
            $state.go("login");
        };


        $scope.userBCInfo.userInfo = JSON.parse(localStorage.getItem("userInfo"));
        var cardList = appService._postData(URL+"index.php?s=Api/Userset/crad",{
            token:$scope.userBCInfo.userInfo.token,
            // way:$scope.userBCInfo.userInfo.way
        });
        cardList.then(function (value) {
                // console.log(value)
                $scope.userBCInfo.cardList = value.data.data;
            },
            function (reason) {
                console.log(reason)
            });
        //设为默认
        $scope.setDefBank=function (eve) {

            appService.conform("确认设为默认？").then(function (value) {
                var setDefBank = appService._postData(URL+"index.php?s=Api/Userset/setcard",{
                    token:$scope.userBCInfo.userInfo.token,
                    // way:$scope.userBCInfo.userInfo.way,
                    bank_id:eve.bank_id
                });
                setDefBank.then(function (value) {
                    // console.log(value);
                    if (value.data.ret == "success"){
                        appService.artTxt(value.data.msg).then(function (value) {
                            $window.location.reload();
                        });;
                    }else {
                        appService.artTxt(value.data.msg)
                    }

                },function (reason) {
                    console.log(reason)
                })
            },function (reason) {
                appService.artTxt("取消操作成功！").then(function (value) {
                    $window.location.reload();
                });
            });
        };
        //删除银行卡
        $scope.deleteBank=function (eve) {
            appService.conform("确认删除银行卡？").then(function (value) {
                var deleteBank = appService._postData(URL + "index.php?s=Api/Userset/delcard", {
                    token: $scope.userBCInfo.userInfo.token,
                    // way: $scope.userBCInfo.userInfo.way,
                    bank_id: eve.bank_id
                });
                deleteBank.then(function (value) {
                    if (value.data.ret == "success"){
                        appService.artTxt(value.data.msg).then(function (value2) {
                            $window.location.reload();
                        });

                    }else {
                        appService.artTxt(value.data.msg)
                    }
                },function (reason) {
                    console.log(reason)
                })
            },function (reason) {
                appService.artTxt("取消操作成功！")
            });
        }
        // 选择提现卡
       $scope.selected=function (a,b,c) {
            if ($stateParams.id == 1){
                if($scope.userBCInfo.userInfo.type=="2"){
                    $state.go("myGoodsWithdrawal",{id:a,name:b,num:c});
                }else {
                    $state.go("treasureWithdrawal",{id:a,name:b,num:c});
                }
            }else if ($stateParams.id == 2){
                var defBand = [] ;
                    defBand.push({id:a,name:b,num:c});
                localStorage.setItem("defCard",JSON.stringify(defBand));
                $window.history.go(-1);
            }else {
                return false;
            };
       };







    }])
