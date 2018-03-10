//我的订单页面 控制器
yx_mallApp
    .controller("myOrderController",["$scope","appService","$stateParams","$state",function ($scope,appService,$stateParams,$state) {
        document.title = "我的商城订单"
        $scope.shopOrder={
            userInfo:[],
            //tab 选项
            tabTxt:["全部","待付款","待发货","已发货","已完成","退款"],
            // 全部订单
            allOrder:[],
            allOrderMo:true,
            // 待付款
            waitApply:[],
            waitApplyMo:false,
            // 待发货
            waitSend:[],
            waitSendMo:false,
            // 待收货
            waitReceive:[],
            waitReceiveMo:false,
            // 已完成
            haveOver:[],
            haveOverMo:false,
            // 退货
            goodsReturn:[],
            goodsReturnMo:false,

            // tab切换
            tabOn:true,
            tabIdx:0,


        };
        $scope.shopOrder.userInfo = JSON.parse(localStorage.getItem("userInfo"));
        // 获取订单数据
        // 1.获取全部数据
        var allOrder = appService._postData(URL+"index.php?s=Api/Order/selectOrderList",{
            token:$scope.shopOrder.userInfo.token,
            way:$scope.shopOrder.userInfo.way
        });
            allOrder.then(function (value) {
                console.log(value.data.data.orderInfo);
                $scope.shopOrder.allOrder = value.data.data.orderInfo
            },function (reason) {
                console.log(reason)
            })
        //tab 切换
        $scope.changeOrderTab=function (idx) {
            $scope.shopOrder.tabIdx = idx;
            /*
            * 0：全部订单
            * 1：待付款
            * 2：待发货
            * 3：待收货
            * 4：已完成
            * 5：退货
            * */
        };
        //去支付
        $scope.orderApply=function (ele) {
            console.log(ele)
        }

    }]);
