//去支付页面 控制器
yx_mallApp
    .controller("applyWayController",["$scope","$stateParams","appService","$window",function ($scope,$stateParams,appService,$window) {
        console.log($stateParams);
        $scope.apply={
            //订单ID
            orderId:$stateParams.OrderID,
            //订单数量
            orderNum:$stateParams.num,
            //商品的积分；
            surplusIn:$stateParams.point,
            //商品全额
            fullMoney:(parseInt($stateParams.point)+parseInt($stateParams.price)),
            //商品的现金数量
            surplusPrice:$stateParams.price,
            //支付种类 allpoint全积分 allcash全现金 cashandpoint现金和积分
            payment:"",
            //支付方式
            payment_way:"",
            token:localStorage.getItem("tokens"),
            way:localStorage.getItem("way"),
            goods_count:$stateParams.num,
            pan:['1','2','3','4','5','6','7','8','9','取消','0','删除'],
            psdArr:[],
            spd:"",
            //全积分是否展示
            isAllIn:true,
            //积分加现金是否显示
            isIn:true
        };
        $scope.UserApply=function (way) {
            switch (way)
            {
                case 0:
                    $scope.apply.payment = "allcash";
                    $scope.apply.payment_way = "13";
                    // $scope.applyApi($scope.apply.spd);
                    break;
                case 1:
                    $scope.apply.payment = "allcash";
                    $scope.apply.payment_way = "11";
                    $scope.applyApi($scope.apply.spd);
                    break;
                case 2:
                    $scope.apply.payment = "allpoint";
                    $scope.apply.payment_way = "";
                    $scope.secondPsd();
                    break;
                case 3:
                    $scope.apply.payment = "cashandpoint";
                    $scope.apply.payment_way = "13";
                    $scope.applyApi($scope.apply.spd);
                    break;
                case 4:
                    $scope.apply.payment = "cashandpoint";
                    $scope.apply.payment_way = "11";
                    $scope.applyApi($scope.apply.spd);
                    break;
            };
            console.log($scope.apply.payment);
            console.log($scope.apply.payment_way);

        };
        //调二级支付
        $scope.secondPsd=function () {
            $(".input_psd_container").animate({
                top:"0"
            },300);
            $scope.inputPsd=function (num) {
                switch (num){
                    case '取消':
                        // todo...
                        break;
                    case '删除':
                        try {
                            $scope.passwordGroup[$scope.currentInputIndex].value=null;
                            $scope.currentInputIndex--;
                        }catch (e){
                            return true;
                        }
                        break;
                    default:
                        $scope.currentInputIndex++;
                        $scope.passwordGroup[$scope.currentInputIndex].value=num;
                        break;
                }
            };
            $scope.currentInputIndex=-1;
            $scope.passwordGroup=[];
            for(var i=0;i<6;i++){
                $scope.passwordGroup.push({
                    value:null
                })
            };
            $scope.$watch('currentInputIndex',function(nv){
                if(nv){
                    if(nv==5){
                        try{
                            var afterInputPassword='';
                            angular.forEach($scope.passwordGroup,function(element){
                                afterInputPassword+=element.value;
                            });
                            $(".input_process_loading").animate({
                                top:"0"
                            },0)
                            $scope.currentInputIndex=-1;
                            $scope.apply.spd = afterInputPassword;
                            $scope.applyApi($scope.apply.spd);
                            //密码输入完成,afterInputPassword就是密码;直接发起请求;
                            //请求处理完毕,currentInputIndex重置为-1,遍历数组填充为{value:null}
                            //为防止请求期间网络问题，当用户输入完毕发起请求的同时，最好出现一个遮罩层,防止用户点击操作
                        }catch(e){
                            return true;
                        }
                    }else if(nv<-1){
                        $scope.currentInputIndex=-1;
                        //删除完毕;
                        //todo...
                    }
                }
            })
        };
        //调取支付接口
        $scope.applyApi=function (spd) {
            var userApply=appService._postData(URL+"index.php?s=/Api/Payment/onlinePayment",
                {
                    token:localStorage.getItem("tokens"),
                    way:localStorage.getItem("way"),
                    order_sn:$scope.apply.orderId,
                    payment:$scope.apply.payment,
                    payment_way:$scope.apply.payment_way,
                    goods_count:$stateParams.num,
                    pay_passwd:spd
                });
            userApply.then(function (e) {
                console.log(e)
                /*if(e.data.ret == "success"){
                   alert(e.data.msg)
                }else {
                    alert(e.data.msg);
                    $window.location.reload()
                }*/
            },function (e) {
                console.log(e)
            })
        };
        //获得用户的账户积分信息

        var userIn=appService._postData(URL+"index.php?s=/Api/Order/surplus_point",{token:localStorage.getItem("tokens"),
            way:localStorage.getItem("way")});
        userIn.then(function (e) {
            if(Math.floor($scope.apply.surplusIn).toFixed(2) > e.data.data){
                $scope.apply.isIn = false;
            }
            if( Math.floor($scope.apply.fullMoney).toFixed(2) > e.data.data){
                $scope.apply.isAllIn = false;
            }
            if($scope.apply.fullMoney == e.data.data){
                $scope.apply.isIn = true;
                $scope.apply.isAllIn = true;
            }
        },function (e) {
            console.log(e)
        })

    }])