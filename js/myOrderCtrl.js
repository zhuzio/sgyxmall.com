//我的订单页面 控制器
yx_mallApp
    .controller("myOrderController",["$scope","appService","$stateParams","$state","$window",function ($scope,appService,$stateParams,$state,$window) {
        document.title = "我的商城订单";
        $scope.shopOrder={
            userInfo:[],
            //tab 选项
            tabTxt:["全部","待付款","待发货","已发货","已完成","退款"],
            // 全部订单
            allOrder:[],
            allOrderMo:true,
            allOrderPage:1,
            allOrderMore:false,
            allOrderNoData:false,
            // 待付款
            waitApply:[],
            waitApplyMo:false,
            waitApplyPage:1,
            waitApplyMore:false,
            waitApplyNoData:false,
            // 待发货
            waitSend:[],
            waitSendMo:false,
            waitSendPage:1,
            waitSendMore:false,
            waitSendNoData:false,
            // 待收货
            waitReceive:[],
            waitReceiveMo:false,
            waitReceivePage:1,
            waitReceiveMore:false,
            waitReceiveNoData:false,
            // 已完成
            haveOver:[],
            haveOverMo:false,
            haveOverPage:1,
            haveOverMore:false,
            haveOverNoData:false,
            // 退货
            goodsReturn:[],
            goodsReturnMo:false,
            goodsReturnPage:1,
            goodsReturnMore:false,
            goodsReturnNoData:false,

            // tab切换
            tabOn:true,
            tabIdx:0,

            //快递公司
            expressCompany:"",
            //快递单号
            expressOrder:"",
            regdInfo:[],
            regdClass:false,
        };

        $scope.shopOrder.userInfo = JSON.parse(localStorage.getItem("userInfo"));
        // 获取订单数据
        // 1.获取数据
        $scope.getOrderInfo=function (idx,sta,page) {
            var allOrder = appService._postData(URL+"index.php?s=Api/Order/selectOrderList",{
                token:$scope.shopOrder.userInfo.token,
                // way:$scope.shopOrder.userInfo.way,
                order_status:sta,
                page:page
            });
            allOrder.then(function (value) {
                console.log(value.data.data)
                var noDatas = value.data.data == undefined || value.data.data == null || value.data.data == "" || value.data.data.orderInfo == "" ||value.data.data.orderInfo == undefined;
                if (page == 1){
                    switch (idx){
                        case 0:
                            if (noDatas){
                                $scope.shopOrder.allOrderNoData = true;
                            }else {
                                $scope.shopOrder.allOrder = value.data.data.orderInfo;
                                if (value.data.data.totalPage == 1){
                                    $scope.shopOrder.allOrderMore = false;
                                }else {
                                    $scope.shopOrder.allOrderMore = true;
                                }
                            }
                            break;
                        case 1:
                            if (noDatas){
                                $scope.shopOrder.waitApplyNoData = true;
                            }else {
                                $scope.shopOrder.waitApply = value.data.data.orderInfo;
                                if (value.data.data.totalPage == 1){
                                    $scope.shopOrder.waitApplyMore = false;
                                }else {
                                    $scope.shopOrder.waitApplyMore = true;
                                }
                            }
                            break;
                        case 2:
                            if (noDatas){
                                $scope.shopOrder.waitSendNoData = true;
                            }else {
                                $scope.shopOrder.waitSend = value.data.data.orderInfo;
                                if (value.data.data.totalPage == 1){
                                    $scope.shopOrder.waitSendMore = false;
                                }else {
                                    $scope.shopOrder.waitSendMore = true;
                                }
                            }
                            break;
                        case 3:
                            if (noDatas){
                                $scope.shopOrder.waitReceiveNoData = true;
                            }else {
                                $scope.shopOrder.waitReceive = value.data.data.orderInfo;
                                if (value.data.data.totalPage == 1){
                                    $scope.shopOrder.waitReceiveMore = false;
                                }else {
                                    $scope.shopOrder.waitReceiveMore = true;
                                }
                            }
                            break;
                        case 4:
                            if (noDatas){
                                $scope.shopOrder.haveOverNoData = true;
                            }else {
                                $scope.shopOrder.haveOver = value.data.data.orderInfo;
                                if (value.data.data.totalPage == 1){
                                    $scope.shopOrder.haveOverMore = false;
                                }else {
                                    $scope.shopOrder.haveOverMore = true;
                                }
                            }
                            break;
                        case 5:
                            if (noDatas){
                                $scope.shopOrder.goodsReturnNoData = true;
                            }else {
                                $scope.shopOrder.goodsReturn = value.data.data.orderInfo;
                                if (value.data.data.totalPage == 1){
                                    $scope.shopOrder.goodsReturnMore = false;
                                }else {
                                    $scope.shopOrder.goodsReturnMore = true;
                                }
                            }
                            break;
                    };
                }else {
                    switch (idx){
                        case 0:
                            if (noDatas){
                                $scope.shopOrder.allOrderMore = false;
                            }else {
                                for (var i in value.data.data.orderInfo){
                                    $scope.shopOrder.allOrder.push((value.data.data.orderInfo)[i])
                                }
                            };
                            break;
                        case 1:
                            if (noDatas){
                                $scope.shopOrder.waitApplyMore = false;
                            }else {
                                for (var i in value.data.data.orderInfo){
                                    $scope.shopOrder.waitApply.push((value.data.data.orderInfo)[i])
                                }
                            };
                            break;
                        case 2:
                            if (noDatas){
                                $scope.shopOrder.waitSendMore = false;
                            }else {
                                for (var i in value.data.data.orderInfo){
                                    $scope.shopOrder.waitSend.push((value.data.data.orderInfo)[i])
                                }
                            };
                            break;
                        case 3:
                            if (noDatas){
                                $scope.shopOrder.waitReceiveMore = false;
                            }else {
                                for (var i in value.data.data.orderInfo){
                                    $scope.shopOrder.waitReceive.push((value.data.data.orderInfo)[i])
                                }
                            };
                            break;
                        case 4:
                            if (noDatas){
                                $scope.shopOrder.haveOverMore = false;
                            }else {
                                for (var i in value.data.data.orderInfo){
                                    $scope.shopOrder.haveOver.push((value.data.data.orderInfo)[i])
                                }
                            };
                            break;
                        case 5:
                            if (noDatas){
                                $scope.shopOrder.goodsReturnMore = false;
                            }else {
                                for (var i in value.data.data.orderInfo){
                                    $scope.shopOrder.goodsReturn.push((value.data.data.orderInfo)[i])
                                }
                            };
                            break;
                    }
                }
            },function (reason) {
                console.log(reason)
            })
        };
        /* getOrderInfo() 三个参数
            1：tab的index
            2：order_status 值 （""代表全部订单，11代表待付款，20代表待发货，30代表已发货，40代表已完成，50代表退货）
            3：每个模块的page值
        */
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
                    $scope.shopOrder.allOrderPage=1;
                    $scope.shopOrder.allOrderMo = true ;
                    $scope.shopOrder.waitApplyMo = false;
                    $scope.shopOrder.waitSendMo = false;
                    $scope.shopOrder.waitReceiveMo = false;
                    $scope.shopOrder.haveOverMo = false;
                    $scope.shopOrder.goodsReturnMo = false;
                    $scope.getOrderInfo(num,"",1);
                    break;
                case 1:
                    $scope.shopOrder.waitApplyPage=1;
                    $scope.shopOrder.allOrderMo = false ;
                    $scope.shopOrder.waitApplyMo = true;
                    $scope.shopOrder.waitSendMo = false;
                    $scope.shopOrder.waitReceiveMo = false;
                    $scope.shopOrder.haveOverMo = false;
                    $scope.shopOrder.goodsReturnMo = false;
                    $scope.getOrderInfo(num,11,1);
                    break;
                case 2:
                    $scope.shopOrder.waitSendPage=1;
                    $scope.shopOrder.allOrderMo = false ;
                    $scope.shopOrder.waitApplyMo = false;
                    $scope.shopOrder.waitSendMo = true;
                    $scope.shopOrder.waitReceiveMo = false;
                    $scope.shopOrder.haveOverMo = false;
                    $scope.shopOrder.goodsReturnMo = false;
                    $scope.getOrderInfo(num,20,1);
                    break;
                case 3:
                    $scope.shopOrder.waitReceivePage=1;
                    $scope.shopOrder.allOrderMo = false ;
                    $scope.shopOrder.waitApplyMo = false;
                    $scope.shopOrder.waitSendMo = false;
                    $scope.shopOrder.waitReceiveMo = true;
                    $scope.shopOrder.haveOverMo = false;
                    $scope.shopOrder.goodsReturnMo = false;
                    $scope.getOrderInfo(num,30,1);
                    break;
                case 4:
                    $scope.shopOrder.haveOverPage=1;
                    $scope.shopOrder.allOrderMo = false ;
                    $scope.shopOrder.waitApplyMo = false;
                    $scope.shopOrder.waitSendMo = false;
                    $scope.shopOrder.waitReceiveMo = false;
                    $scope.shopOrder.haveOverMo = true;
                    $scope.shopOrder.goodsReturnMo = false;
                    $scope.getOrderInfo(num,40,1);
                    break;
                case 5:
                    $scope.shopOrder.goodsReturnPage=1;
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
        //点击加载更更多
        $scope.addOrderMore=function (idx,sta) {
            switch (idx){
                case 0:
                    $scope.shopOrder.allOrderPage+=1;
                    $scope.getOrderInfo(idx,sta,$scope.shopOrder.allOrderPage);
                    break;
                case 1:
                    $scope.shopOrder.waitApplyPage+=1;
                    $scope.getOrderInfo(idx,sta,$scope.shopOrder.waitApplyPage);
                    break;
                case 2:
                    $scope.shopOrder.waitSendPage+=1;
                    $scope.getOrderInfo(idx,sta,$scope.shopOrder.waitSendPage);
                    break;
                case 3:
                    $scope.shopOrder.waitReceivePage+=1;
                    $scope.getOrderInfo(idx,sta,$scope.shopOrder.waitReceivePage);
                    break;
                case 4:
                    $scope.shopOrder.haveOverPage+=1;
                    $scope.getOrderInfo(idx,sta,$scope.shopOrder.haveOverPage);
                    break;
                case 5:
                    $scope.shopOrder.goodsReturnPage+=1;
                    $scope.getOrderInfo(idx,sta,$scope.shopOrder.goodsReturnPage);
                    break;
            }
        };
        //去支付
        $scope.orderApply=function (ele) {
            console.log(ele);

            $state.go("applyWay",{
                OrderID:ele.order_sn,
                num:ele.goods_count,
                price:parseFloat(ele.total_money)*parseFloat(ele.goods_count),
                point:parseFloat(ele.goods_happy)*parseFloat(ele.goods_count),
                isY:ele.goods_happy,
            })
        };
        //确认收货
        $scope.confirmReceipt=function (goods) {
            // console.log(goods);
            appService.conform("确认收货之后货款将到商家账户！").then(function (value) {
                var confirmReceipt = appService._postData(URL+"index.php?s=/Api/order/quit_order",{
                    token:$scope.shopOrder.userInfo.token,
                    // way:$scope.shopOrder.userInfo.way,
                    order_id:goods.order_id
                });
                confirmReceipt.then(function (value) {
                    // console.log(value);
                    if (value.data.ret = "success"){
                        appService.artTxt(value.data.msg).then(function (value2) {
                            $window.location.reload();
                        })
                    }else {
                        appService.artTxt(value.data.msg);
                    }
                },function (reason) {
                    console.log(reason)
                })
            },function (reason) {
                appService.artTxt("取消操作成功");
                return false;
            });

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
        };
        //申请退货
        $scope.applyReturnGoods=function (ele) {
            localStorage.setItem("applyReturnGoods",JSON.stringify(ele));
            $state.go("applyReturnGoods");
        };
        //取消订单
        $scope.cancelOrder=function (g,i,_index) {
            appService.conform("确认取消订单？").then(function (value) {
                var cancelOrder = appService._postData(URL+"index.php?s=Api/order/cancel_order",{
                    order_id : g.order_id,
                    token:$scope.shopOrder.userInfo.token,
                    // way:$scope.shopOrder.userInfo.way
                });
                cancelOrder.then(function (value) {
                    // console.log(value)
                    if(value.data.ret == "success"){
                        appService.artTxt(value.data.msg).then(function (value) {
                            switch (i){
                                case 0:
                                    $scope.shopOrder.allOrder.splice(_index,1)
                                    break;
                                case 1:
                                    $scope.shopOrder.waitApply.splice(_index,1);
                                    if ($scope.shopOrder.waitApply.length == 0){
                                        $scope.shopOrder.waitApplyMore = true;
                                        $scope.shopOrder.waitApplyNoData = true;
                                    }
                                    break;
                            }
                        });
                    };
                },function (reason) {
                    console.log(reason)
                })

            },function (reason) {
                appService.artTxt("取消操作成功");
                return false;
            })
        };
        //点击查看退货详情
        $scope.applyReturnGoodsDetail=function (id) {
            $scope.shopOrder.regdClass = true;
            var returnGoodsDetail=appService._postData(URL+"index.php?s=/Api/Order/refundOrderInfo",{
                token:$scope.shopOrder.userInfo.token,
                // way:$scope.shopOrder.userInfo.way,
                order_id:id
            });
            returnGoodsDetail.then(function (value) {
                // console.log(value)
                $scope.shopOrder.regdInfo = value.data.orderInfo
            },function (reason) {
                console.log(reason)
            })

        };

    }]);
