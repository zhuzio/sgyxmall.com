yx_mallApp
    .controller("cashIntegralConsumptionRecordController",["$scope","appService",function ($scope,appService) {
        document.title  = '现金积分消费记录';
        $scope.csr={
            userInfo:[],
            cusMonth:[],
            cusMonthList:[],
        }
        $scope.csr.userInfo = JSON.parse(localStorage.getItem("userInfo"));
        // 获取消费记录列表
        var cusData = appService._postData(URL+'index.php?s=/Api/CashPoints/expensesRecordMonth',{
            token:$scope.csr.userInfo.token
        });
            cusData.then(function (value) {
                console.log(value);
                $scope.csr.cusMonth = value.data.data;
            },function (reason) {
                console.log(reason)
            })
        // 获取每月详细
        $scope.showCusDetial = function (ele,idx) {
            $scope.csr.cusMonthList = [] ;
            ele.isShow = true;
            angular.forEach($scope.csr.cusMonth,function (element,index) {
                if (index != idx){
                    element.isShow = false;
                }
            })
            $scope.getMonthCusList(ele.times);
        };
        $scope.getMonthCusList = function (month) {
            var getMonthDetialList = appService._postData(URL+"index.php?s=/Api/CashPoints/expensesRecordDay",{
                token:$scope.csr.userInfo.token,
                time:month
            });
            getMonthDetialList.then(function (value) {
                console.log(value)
                $scope.csr.cusMonthList = value.data.data;

            },function (reason) {
                console.log(reason)
            })
        }
    }])