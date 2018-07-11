yx_mallApp
    .controller("cashIntegralWithdrawalRecordController",["$scope","$state","appService",function ($scope,$state,appService) {
        document.title = '现金积分提现记录';
        $scope.ciwr ={
            userInfo:[],
            ciwrList:[],
            addMore:true,
            page:1,
            classNames:'',
            NoData:false
        };
        $scope.ciwr.userInfo = JSON.parse(localStorage.getItem("userInfo"));
        localStorage.removeItem("defCard")

        // 点击加载更多
        $scope.addMoreRec=function () {
            $scope.ciwr.page+=1;
            $scope.getRecWithdrawal($scope.ciwr.page)
        };
        // 获取数据
        $scope.getRecWithdrawal = function (_page) {
            var ciwData = appService._postData(URL+"index.php?s=/Api/CashPoints/pointsDepositList",{
                token:$scope.ciwr.userInfo.token,
                page:$scope.ciwr.page
            });
            ciwData.then(function (value) {
                var noDatas = value.data.data == "" || value.data.data == undefined ||value.data.data == null;
                if (noDatas){
                    $scope.ciwr.addMore = false;
                    $scope.ciwr.NoData = true
                }else {
                    angular.forEach(value.data.data,function(item){
                        switch (parseInt(item.ispay)){
                            case 0:
                                item.classNames = 'wait';
                                break;
                            case 1:
                                item.classNames = 'pass';
                                break;
                            case 2:
                                item.classNames = 'reject';
                                break;
                        };
                    });
                    if (value.data.totalpage == 1) {
                        $scope.ciwr.ciwrList = value.data.data;
                        console.log($scope.ciwr.ciwrList)
                        $scope.ciwr.addMore = false;
                    }else {
                        if (_page == 1){
                            $scope.ciwr.ciwrList = value.data.data;
                            $scope.ciwr.addMore = true;
                        }else {
                            if (_page == value.data.totalpage) {
                                $scope.ciwr.addMore = false;
                            };
                            for (var i in value.data.data){
                                $scope.ciwr.ciwrList.push((value.data.data)[i])
                            }

                        }
                    }
                }
            },function (reason) {
                console.log(reason)
            })
        };
        $scope.getRecWithdrawal(1)


    }])