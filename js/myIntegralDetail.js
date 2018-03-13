//我的  发购积分明细
yx_mallApp
    .controller("myIntegralDetailController",["$scope","appService","$state","$stateParams",function($scope,appService,$state,$stateParams){
        document.title="我的发购积分明细";

        $scope.Withdrawal={
            status_fa:true,
            status_gou:false,
            fa_month:[],//发积分月账单
            gou_month:[],//购积分月账单
            fa_dayDetail:[],//发积分月详细账单
            gou_dayDetail:[],//购积分月详细账单
            gou_selected:-1,//选中展示本月信息，默认选不中
            fa_selected:-1,//选中展示本月信息，默认选不中
            current:0,//本月转化，默认为零
            gou_oldselected:-2,//上次选中状态
            fa_oldselected:-2,//上次选中状态
            fa_total:0,//发积分
            gou_total:0,//购积分
            fa_page:1,//发积分页数
            gou_page:1,//购积分页数
        };


        $scope.show1=function(a){
//   	判断显示发积分还是购积分
            if(a==1){
                $(".treCon_score").removeClass("bg");
                $(".tre_middle_fen").removeClass("tre_middle_b");
                $(".tre_span3").addClass("tre_ba");
                $(".tre_span4").removeClass("tre_ba");

                $scope.Withdrawal.status_fa=true;
                $scope.Withdrawal.status_gou=false;

            }else if(a==2){
                $(".treCon_score").addClass("bg");
                $(".tre_middle_fen").addClass("tre_middle_b");
                $(".tre_span3").removeClass("tre_ba");
                $(".tre_span4").addClass("tre_ba");
                $scope.Withdrawal.status_fa=false;
                $scope.Withdrawal.status_gou=true;
            }
        };





//   初加载请求

//加载每月记录        购买积分请求
        var Integral1=appService._postData(URL+"index.php?s=/Api/wealth/shop_point_month",{
            token: localStorage.getItem("tokens"),
            way:localStorage.getItem("way") });
        Integral1.then(function(e){

            if(!e.data){
              return false;
            }
            $scope.Withdrawal.gou_month=e.data.data.data;
            $scope.Withdrawal.gou_total=e.data.data.total_money;//累计购买总积分
            $scope.Withdrawal.current=e.data.data.new_money;//当前积分

        },function(e){
            console.log(e);
        });
//加载每月记录        送积分请求
        var Integral=appService._postData(URL+"index.php?s=/Api/wealth/shop_send_point_month",{
            token: localStorage.getItem("tokens"),
            way:localStorage.getItem("way") });
        Integral.then(function(e){

            if(!e.data){
                return false;
            }
            $scope.Withdrawal.fa_month=e.data.data.data;
            $scope.Withdrawal.fa_total=e.data.data.total_money;//累计购买总积分
            $scope.Withdrawal.current=e.data.data.new_money;//当前积分

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


            // $scope.Withdrawal.oldselected=$scope.Withdrawal.selected;
            //
            // $scope.Withdrawal.selected=$index;
            // if($scope.Withdrawal.oldselected==$scope.Withdrawal.selected){
            //     $scope.Withdrawal.oldselected=-2;
            //     $scope.Withdrawal.selected=-1;
            //     $scope.Withdrawal.dayDetail=[];
            //
            //     return false;
            // }else {
            //     $scope.Withdrawal.fa_page=1;
            //     $scope.Withdrawal.gou_page=1;
            // }
            if($scope.Withdrawal.status_gou){
                $scope.Withdrawal.gou_oldselected=$scope.Withdrawal.gou_selected;

                $scope.Withdrawal.gou_selected=$index;
                if($scope.Withdrawal.gou_oldselected==$scope.Withdrawal.gou_selected){
                    $scope.Withdrawal.gou_oldselected=-2;
                    $scope.Withdrawal.gou_selected=-1;
                    $scope.Withdrawal.gou_dayDetail=[];

                    return false;
                }else {
                    $scope.Withdrawal.fa_page=1;
                    $scope.Withdrawal.gou_page=1;
                }

            }else {
                $scope.Withdrawal.fa_oldselected=$scope.Withdrawal.fa_selected;

                $scope.Withdrawal.fa_selected=$index;
                if($scope.Withdrawal.fa_oldselected==$scope.Withdrawal.fa_selected){
                    $scope.Withdrawal.fa_oldselected=-2;
                    $scope.Withdrawal.fa_selected=-1;
                    $scope.Withdrawal.fa_dayDetail=[];

                    return false;
                }else {
                    $scope.Withdrawal.fa_page=1;
                    $scope.Withdrawal.gou_page=1;
                }
            }

            if($scope.Withdrawal.status_gou){



                var conversion_record=appService._postData(URL+"index.php?s=/Api/wealth/shop_point_detail",{
                    token: localStorage.getItem("tokens"),
                    way:localStorage.getItem("way"), month:time});
                conversion_record.then(function(e){
                    $scope.Withdrawal.gou_dayDetail=e.data.data;

                },function(e){
                    console.log(e);
                });


            }else {





                var conversion_record=appService._postData(URL+"index.php?s=/Api/wealth/shop_send_point_detail",{
                    token: localStorage.getItem("tokens"),
                    way:localStorage.getItem("way"), month:time});
                conversion_record.then(function(e){
                    $scope.Withdrawal.fa_dayDetail=e.data.data;

                },function(e){
                    console.log(e);
                })

            }



            //   初加载请求

        };

       // 加载更多
        $scope.more=function (time) {

// 判断是发积分还是购买积分
            if($scope.Withdrawal.status_gou){
                $scope.Withdrawal.gou_page=$scope.Withdrawal.gou_page+1;

                var conversion_record=appService._postData(URL+"index.php?s=/Api/wealth/shop_point_detail",{
                    token: localStorage.getItem("tokens"),
                    way:localStorage.getItem("way"), month:time,page:$scope.Withdrawal.gou_page});
                conversion_record.then(function(e){

                    if(e.data == "" ){
                        $(".more").html("暂无更多")
                    }else {

                        $scope.Withdrawal.gou_dayDetail=$scope.Withdrawal.gou_dayDetail.concat(e.data.data);

                    }

                },function(e){
                    console.log(e);
                })



            }else {
                $scope.Withdrawal.fa_page=$scope.Withdrawal.fa_page+1;

                var conversion_record=appService._postData(URL+"index.php?s=/Api/wealth/shop_send_point_detail",{
                    token: localStorage.getItem("tokens"),
                    way:localStorage.getItem("way"), month:time,page:$scope.Withdrawal.fa_page});
                conversion_record.then(function(e){
                    if(e.data== "" ){
                        $(".more").html("暂无更多")
                    }else {

                        $scope.Withdrawal.fa_dayDetail=$scope.Withdrawal.fa_dayDetail.concat(e.data.data);

                    }

                },function(e){
                    console.log(e);
                });

            }







        }


    }]);