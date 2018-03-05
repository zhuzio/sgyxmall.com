//我的  收入明细
yx_mallApp
    .controller("myIncomeDetailController",["$scope","appService","$state","$stateParams",function($scope,appService,$state,$stateParams){
        document.title="我的收入明细";

        $scope.Withdrawal={


            month:[],//月账单
            dayDetail:[{money:66,buyer_name:"yanxu",order_sn:"35544541",pay_time:"2018-01-11 00:11:12",is_check:0,info:"xiaom"},
                {money:16,buyer_name:"闫旭",order_sn:"56654212135",pay_time:"2018-01-01 10:31:12",is_check:1,info:"xiaom"}],
            selected:-1,//选中展示本月信息，默认选不中
            current:0,//本月转化，默认为零
            total:0,//累计转化，默认为零
            oldselected:-2,
            page:1,
        };


//   初加载请求
//加载每月记录
        var conversion_record=appService._postData(URL+"index.php?s=/Api/wealth/shop_income_month",{
            token: localStorage.getItem("tokens"),
            way:localStorage.getItem("way") });
        conversion_record.then(function(e){
            $scope.Withdrawal.month=e.data.data;
            $scope.Withdrawal.total=e.data.totalpage;
            $scope.Withdrawal.current=e.data.data[0].order_amount;
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


            $scope.Withdrawal.oldselected=$scope.Withdrawal.selected;

            $scope.Withdrawal.selected=$index;
            if($scope.Withdrawal.oldselected==$scope.Withdrawal.selected){
                $scope.Withdrawal.oldselected=-2;
                $scope.Withdrawal.selected=-1;
                $scope.Withdrawal.dayDetail=[];
                $scope.Withdrawal.page=1;
                return false;
            }

            var conversion_record=appService._postData(URL+"index.php?s=/Api/wealth/shop_income_list",{
                token: localStorage.getItem("tokens"),
                way:localStorage.getItem("way"), month:time});
            conversion_record.then(function(e){
                $scope.Withdrawal.dayDetail=e.data.data.data;

                console.log(e);
            },function(e){
                console.log(e);
            })
            //   初加载请求

        };

            $scope.more=function(e){
                $scope.Withdrawal.page=$scope.Withdrawal.page+1;
                var conversion_record=appService._postData(URL+"index.php?s=/Api/wealth/shop_income_list",{
                    token: localStorage.getItem("tokens"),
                    way:localStorage.getItem("way"), month:e,page:$scope.Withdrawal.page});
                conversion_record.then(function(e){
                    if(e.data.data.data.length == 0 ){
                        $(".more").html("暂无更多")
                    }else {

                        $scope.Withdrawal.dayDetail.concat(e.data.data.data);
                        console.log(e);
                    }




                    console.log(e);
                },function(e){
                    console.log(e);
                })


            }


    }]);