// 财富 转化记录     控制器
yx_mallApp
    .controller("treasureConversionController", ["$scope", "appService", "$stateParams", "$state", function ($scope, appService, $stateParams, $state) {
        //    用户转化信息

        document.title="转化记录";
        $scope.treasureConversion={

            month:[],//月账单
            dayDetail:[{get_money:66,happiness:11,order_type:"541",createtime:"2018-01-11 00:11:12"},{get_money:16,happiness:10,order_type:"offline",createtime:"2018-01-01 10:31:12"}],
            selected:-1,//选中展示本月信息，默认选不中
            current:0,//本月转化，默认为零
            total:0//累计转化，默认为零
        };


//   初加载请求
//加载每月记录
        var conversion_record=appService._postData(URL+"index.php?s=/Api/wealth/conversion_record",{
            token: localStorage.getItem("tokens"),
            way:localStorage.getItem("way") });
        conversion_record.then(function(e){
            $scope.treasureConversion.month=e.data.data;
            $scope.treasureConversion.total=e.data.arr;
            $scope.treasureConversion.current=e.data.data[0].money;
            console.log(e);
        },function(e){
            console.log(e);
        });


//   初加载请求
//  操作ng-repeat生成的dom元素

        $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
            //这里写获取dom的操作，
            console.log(ngRepeatFinishedEvent);

        });

        //   点击请求加载本月数据
        $scope.change=function($index,time){
            //   点击请求加载本月数据
            $scope.treasureConversion.selected=$index;
            console.log($index);
            console.log($scope.treasureConversion.selected);
            console.log(time);

            var conversion_record=appService._postData(URL+"index.php?s=/Api/wealth/conversion_record_month",{
                token: localStorage.getItem("tokens"),
                way:localStorage.getItem("way"), time:time});
            conversion_record.then(function(e){
                $scope.treasureConversion.dayDetail=e.data.data;

                console.log(e);
            },function(e){
                console.log(e);
            })
            //   初加载请求

        }


    }]);
 