//去支付页面 控制器
yx_mallApp
    .controller("applyWayController",["$scope","$stateParams","appService","$window","$state",function ($scope,$stateParams,appService,$window,$state) {
        document.title = "去支付";
        // console.log($stateParams);
        $scope.apply={
            //订单ID
            orderId:$stateParams.OrderID,
            //订单数量
            orderNum:$stateParams.num,
            //商品的积分；
            surplusIn:$stateParams.point,
            //商品全额
            fullMoney:parseFloat($stateParams.price),
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
            yx_money:true,//判断严选积分是否充足，不充足或为0，会员购买不予展示
            //全积分是否展示
            isAllIn:true,
            //积分加现金是否显示
            isIn:true,
            sc_id:$stateParams.sc_id,
            // 是否是严选商品
            isY:$stateParams.isY,
            userInfo:[],

            isFullIntegral:true,
            userStrictIntegral:0,
            goodsStrictIntegral:$stateParams.point
        };
        console.log($stateParams.point)
        $scope.apply.userInfo = JSON.parse(localStorage.getItem("userInfo"));
        $scope.apply.orderId = ($stateParams.OrderID).split(",");
        console.log( $scope.apply.orderId)
        $scope.UserApply=function (way) {
            switch (way)
            {
                case 0:
                    $scope.apply.payment = "allcash";
                    $scope.apply.payment_way = "13";
                    // $scope.applyApi($scope.apply.spd);
                    break;
                case 1:
                   /* $scope.apply.payment = "allcash";
                    $scope.apply.payment_way = "11";
                    $scope.applyApi($scope.apply.spd);*/
                    break;
                case 2:
                    appService.artTxt("暂不支持积分购买，请选择其他支付方式")
                    return false;
                   /* $scope.apply.payment = "allpoint";
                    $scope.apply.payment_way = "";
                    $scope.secondPsd();*/
                    break;
                case 3:
                    $scope.apply.payment = "cashandpoint";
                    $scope.apply.payment_way = "13";
                    console.log($scope.apply.spd)
                    $scope.applyApi($scope.apply.spd);
                    break;
                case 4:
                    $scope.apply.payment = "cashandpoint";
                    $scope.apply.payment_way = "11";
                    $scope.applyApi($scope.apply.spd);
                    break;
            };
            // console.log($scope.apply.payment);
            // console.log($scope.apply.payment_way);

        };
        //调二级支付
        $scope.secondPsd=function () {
            $(".input_psd_container").animate({
                top:"0"
            },300);
        };
        //调取支付接口
        $scope.applyApi=function (spd) {
            var userApply=appService._postData(URL+"index.php?s=/Api/Payment/onlinePayment",
                {
                    token:$scope.apply.userInfo.token,
                    // way:localStorage.getItem("way"),
                    order_sn:$scope.apply.orderId,
                    payment:$scope.apply.payment,
                    payment_way:$scope.apply.payment_way,
                    goods_count:$stateParams.num,
                    pay_passwd:spd,
                    sc_id:$scope.apply.sc_id,
                });
            userApply.then(function (e) {
                console.log(e)
                if(e.data.ret == "success"){
                    appService.artTxt(e.data.msg).then(function (value) {
                        $(".input_process_loading").animate({
                            top:"100%"
                        },0);
                        $(".input_psd_container").animate({
                            top:"100%"
                        },300);

                        $state.go("myOrder");
                    })
                }else {

                    appService.artTxt(e.data.msg).then(function (value) {
                        // $window.location.reload()
                    });

                }
            },function (e) {
                console.log(e)
            })
        };
        //获得用户的账户积分信息

        var userIn=appService._postData(URL+"index.php?s=/Api/Order/surplus_point",{
            token:$scope.apply.userInfo.token
            // way:localStorage.getItem("way")
        });
        userIn.then(function (e) {
            // console.log(e.data);
            $scope.apply.userStrictIntegral = e.data.data.select;
            /*
            *money: 购物积分
            * select：严选积分
            * */
            /*判断是否是严选商品 0 不是严选商品 不为0 则是严选商品*/

           /* if (parseFloat($stateParams.point) > parseFloat(e.data.data.select)){
                $scope.apply.isFullIntegral = false;
                appService.artTxt("您的严选积分不够购买此商品，只有两种支付方式")
            };*/


            /*if ($scope.apply.isY == 0){
                $scope.apply.isIn = false;
                if(parseFloat($scope.apply.surplusIn) > parseFloat(e.data.data.money)){
                    $scope.apply.isAllIn = false;
                };
                if( parseFloat($scope.apply.fullMoney) > parseFloat(e.data.data.money)){
                    $scope.apply.isAllIn = false;
                };
            }else {
                console.log("SSS")
                $scope.apply.isIn = true;
                $scope.apply.isAllIn=false;
                // 严选积分为0或者小于商品严选积分时，会员购买不予显示
                if(parseFloat($scope.apply.surplusIn) > parseFloat(e.data.data.select)||e.data.data.select==0){
                    $scope.yx_money = false;

                };
                if(parseFloat($scope.apply.surplusIn) > parseFloat(e.data.data.select)){
                    $scope.apply.isAllIn = false;

                };
                if( parseFloat($scope.apply.fullMoney) > parseFloat(e.data.data.select)){
                    $scope.apply.isAllIn = false;

                };
            };
*/

        },function (e) {
            console.log(e)
        });



        $scope.$on('applyInputSuccess',function(event,password){
            //passworc为密码
            $(".input_process_loading").animate({
                top:"0"
            },0);
            $scope.apply.spd = password;
            $scope.applyApi($scope.apply.spd);
        });
        $scope.$on('cancelApply',function(){
            //取消支付
            $(".input_psd_container").animate({
                top:"100%"
            },300);
        });


    }])