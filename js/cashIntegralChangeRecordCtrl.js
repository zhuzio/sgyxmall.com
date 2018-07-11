yx_mallApp
    .controller("cashIntegralChangeRecordController",["$scope","appService","$state",function ($scope,appService,$state) {
        document.title = '现金积分转化记录';
        $scope.cicr={
            userInfo:[],
            monthList:[],
            eachList:[]
        };
        $scope.cicr.userInfo = JSON.parse(localStorage.getItem("userInfo"));
        // 获取月份
        var cicrData = appService._postData(URL+"index.php?s=/Api/CashPoints/convertListMonth",{
            token:$scope.cicr.userInfo.token
        });
            cicrData.then(function (value) {
                $scope.cicr.monthList = value.data.data
            },function (reason) {
                console.log(reason)
            })
        // 获取每个月的详细
        $scope.showCicrDetial = function (ele,idx) {
            $scope.cicr.eachList = [] ;
            ele.isShow = true;
            angular.forEach($scope.cicr.monthList,function (element,index) {
                if (index != idx){
                    element.isShow = false;
                }
            })
            $scope.getMonthCicrList(ele.times);

        };


        $scope.getMonthCicrList = function (month) {
            var getMonthDetialList = appService._postData(URL+"index.php?s=/Api/CashPoints/convertListDay",{
                token:$scope.cicr.userInfo.token,
                time:month
            });
            getMonthDetialList.then(function (value) {
                console.log(value)
                $scope.cicr.eachList = value.data.data;

            },function (reason) {
                console.log(reason)
            })
        }
    }])