//我的订单页面 控制器
yx_mallApp
    .controller("myOrderController",["$scope","appService","$stateParams","$state","$window",function ($scope,appService,$stateParams,$state,$window) {
        document.title = "我的商城订单"
        $scope.shopOrder={
            userInfo:[],
            //tab 选项
            tabTxt:["全部","待付款","待发货","已发货","已完成","退款"],
            // 全部订单
            allOrder:[],
            allOrderMo:true,
            allOrderPage:1,
            allOrderMore:false,
            // 待付款
            waitApply:[],
            waitApplyMo:false,
            waitApplyPage:1,
            waitApplyMore:false,
            // 待发货
            waitSend:[],
            waitSendMo:false,
            waitSendPage:1,
            waitSendMore:false,
            // 待收货
            waitReceive:[],
            waitReceiveMo:false,
            waitReceivePage:1,
            waitReceiveMore:false,
            // 已完成
            haveOver:[],
            haveOverMo:false,
            haveOverPage:1,
            haveOverMore:false,
            // 退货
            goodsReturn:[],
            goodsReturnMo:false,
            goodsReturnPage:1,
            goodsReturnMore:false,

            // tab切换
            tabOn:true,
            tabIdx:0,

            //快递公司
            expressCompany:"",
            //快递单号
            expressOrder:"",


        };
        $scope.shopOrder.userInfo = JSON.parse(localStorage.getItem("userInfo"));
        // 获取订单数据
        // 1.获取数据
        $scope.getOrderInfo=function (idx,sta,page) {
            var allOrder = appService._postData(URL+"index.php?s=Api/Order/selectOrderList",{
                token:$scope.shopOrder.userInfo.token,
                way:$scope.shopOrder.userInfo.way,
                order_status:sta,
                page:page
            });
            allOrder.then(function (value) {
                console.log(value.data.data)
                var noDatas = value.data.data == undefined || value.data.data == null || value.data.data == "";
                if (page == 1){
                    switch (idx){
                        case 0:
                            if (noDatas){
                                $(".order_allOrder").append("<img src='images/nodata.png'>");
                            }else {
                                $scope.shopOrder.allOrder = value.data.data.orderInfo;
                            }
                            break;
                        case 1:
                            if (noDatas){
                                $(".order_waitApply").append("<img src='images/nodata.png'>");
                            }else {
                                $scope.shopOrder.waitApply = value.data.data.orderInfo;
                            }
                            break;
                        case 2:
                            if (noDatas){
                                $(".order_waitSend").append("<img src='images/nodata.png'>");
                            }else {
                                $scope.shopOrder.waitSend = value.data.data.orderInfo;
                            }
                            break;
                        case 3:
                            if (noDatas){
                                $(".order_waitReceive").append("<img src='images/nodata.png'>");
                            }else {
                                $scope.shopOrder.waitReceive = value.data.data.orderInfo;
                            }
                            break;
                        case 4:
                            if (noDatas){
                                $(".order_haveOver").append("<img src='images/nodata.png'>");
                            }else {
                                $scope.shopOrder.haveOver = value.data.data.orderInfo;
                            }
                            break;
                        case 5:
                            if (noDatas){
                                $(".order_goodsReturn").append("<img src='images/nodata.png'>");
                            }else {
                                $scope.shopOrder.goodsReturn = value.data.data.orderInfo;
                            }
                            break;
                    };
                }else {
                    switch (idx){
                        case 0:
                            if (noDatas){
                                $scope.shopOrder.allOrderMore = false;
                            }else {
                                for (var i in value.data.data){
                                    $scope.shopOrder.allOrder.push((value.data.data)[i])
                                }
                            };
                            break;
                        case 1:
                            if (noDatas){
                                $scope.shopOrder.waitApplyMore = false;
                            }else {
                                for (var i in value.data.data){
                                    $scope.shopOrder.allOrder.push((value.data.data)[i])
                                }
                            };
                            break;
                        case 2:
                            if (noDatas){
                                $scope.shopOrder.waitSendMore = false;
                            }else {
                                for (var i in value.data.data){
                                    $scope.shopOrder.allOrder.push((value.data.data)[i])
                                }
                            };
                            break;
                        case 3:
                            if (noDatas){
                                $scope.shopOrder.waitReceiveMore = false;
                            }else {
                                for (var i in value.data.data){
                                    $scope.shopOrder.allOrder.push((value.data.data)[i])
                                }
                            };
                            break;
                        case 4:
                            if (noDatas){
                                $scope.shopOrder.haveOverMore = false;
                            }else {
                                for (var i in value.data.data){
                                    $scope.shopOrder.allOrder.push((value.data.data)[i])
                                }
                            };
                            break;
                        case 5:
                            if (noDatas){
                                $scope.shopOrder.goodsReturnMore = false;
                            }else {
                                for (var i in value.data.data){
                                    $scope.shopOrder.allOrder.push((value.data.data)[i])
                                }
                            };
                            break;
                    }
                }
            },function (reason) {
                console.log(reason)
            })
        };
        $scope.getOrderInfo(0,"",1);

        //tab 切换
        $scope.changeOrderTab=function (num) {
            $scope.shopOrder.tabIdx = num;
            /*
            * 0：全部订单
            * 1：待付款
            * 2：待发货
            * 3：待收货
            * 4：已完成
            * 5：退货
            * */
            switch (num){
                case 0:
                    $scope.shopOrder.allOrderMo = true ;
                    $scope.shopOrder.waitApplyMo = false;
                    $scope.shopOrder.waitSendMo = false;
                    $scope.shopOrder.waitReceiveMo = false;
                    $scope.shopOrder.haveOverMo = false;
                    $scope.shopOrder.goodsReturnMo = false;
                    $scope.getOrderInfo(num,"",1);
                    break;
                case 1:
                    $scope.shopOrder.allOrderMo = false ;
                    $scope.shopOrder.waitApplyMo = true;
                    $scope.shopOrder.waitSendMo = false;
                    $scope.shopOrder.waitReceiveMo = false;
                    $scope.shopOrder.haveOverMo = false;
                    $scope.shopOrder.goodsReturnMo = false;
                    $scope.getOrderInfo(num,11,1);
                    break;
                case 2:
                    $scope.shopOrder.allOrderMo = false ;
                    $scope.shopOrder.waitApplyMo = false;
                    $scope.shopOrder.waitSendMo = true;
                    $scope.shopOrder.waitReceiveMo = false;
                    $scope.shopOrder.haveOverMo = false;
                    $scope.shopOrder.goodsReturnMo = false;
                    $scope.getOrderInfo(num,20,1);
                    break;
                case 3:
                    $scope.shopOrder.allOrderMo = false ;
                    $scope.shopOrder.waitApplyMo = false;
                    $scope.shopOrder.waitSendMo = false;
                    $scope.shopOrder.waitReceiveMo = true;
                    $scope.shopOrder.haveOverMo = false;
                    $scope.shopOrder.goodsReturnMo = false;
                    $scope.getOrderInfo(num,30,1);
                    break;
                case 4:
                    $scope.shopOrder.allOrderMo = false ;
                    $scope.shopOrder.waitApplyMo = false;
                    $scope.shopOrder.waitSendMo = false;
                    $scope.shopOrder.waitReceiveMo = false;
                    $scope.shopOrder.haveOverMo = true;
                    $scope.shopOrder.goodsReturnMo = false;
                    $scope.getOrderInfo(num,40,1);
                    break;
                case 5:
                    $scope.shopOrder.allOrderMo = false ;
                    $scope.shopOrder.waitApplyMo = false;
                    $scope.shopOrder.waitSendMo = false;
                    $scope.shopOrder.waitReceiveMo = false;
                    $scope.shopOrder.haveOverMo = false;
                    $scope.shopOrder.goodsReturnMo = true;
                    $scope.getOrderInfo(num,50,1);
                    break;
            }
        };
        //去支付
        $scope.orderApply=function (ele) {
            console.log(ele)
        }
        //确认收货
        $scope.confirmReceipt=function (goods) {
            console.log(goods);
            var confirmReceipt = appService._postData(URL+"",{
                token:$scope.shopOrder.userInfo.token,
                way:$scope.shopOrder.userInfo.way,
                order_sn:goods.order_sn
            });
                confirmReceipt.then(function (value) {
                    console.log(value)
                },function (reason) {
                    console.log(reason)
                })
        };
        //物流查询
        $scope.logisticsQuery=function (goods) {
            $window.location.href = "https://m.kuaidi100.com/"
        };
        //一键复制
        $scope.copyTxt=function (txt) {
            var Url2=document.getElementById("txt"+txt);
                Url2.select(); // 选择对象
            try{
                if(document.execCommand('copy', false, null)){
                    document.execCommand("Copy");
                    appService.artTxt("已复制");
                } else{
                    appService.artTxt("复制失败，请手动复制");
                }
            } catch(err){
                appService.a("复制失败，请手动复制");
            }
        }

    }]);
