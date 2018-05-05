//购物车页面 控制器
yx_mallApp
    .controller("shopCarController",["$scope","$stateParams","appService","$state","$window",function ($scope,$stateParams,appService,$state,$window) {
        if(!localStorage.getItem("userInfo")){
            $state.go("login");
        };
        document.title='购物车';
        $scope.totalPrice = 0;
        $scope.totalStock = 0;
        $scope.selectGoodsAll = false;
        $scope.shopCar = {
            shopName: [],
            shop: [],
            finalOrder:[],
            checkLength:[],
            shopId:[],
            isCommon:true,
            isStrict:false,
            userInfo:[],
          /*  // 严选商品
            strictGoods:[],
            totalPriceStrict:0,
            totalIntegralStrict:0,
            selectAllStrict:false,
            noStrictGoods:false,
            haveStrictGoods:true,*/

            // 普通商品
            commonGoods:[],
            totalPriceCommon:0,
            totalStrictPriceCommon:0,
            totalStrictIntegralCommon:0,
            selectAllCommon:false,
            haveCommonGoods:true,
            noCommonGoods:false,

            chosePrice:0,
            chosePoint:0,
            chosePriceStrict:0,

        };
        $scope.shopCar.userInfo = JSON.parse(localStorage.getItem("userInfo"));
        $scope.getShopCarGoods=function (idx) {
            var goodsCar = appService._postData(URL+"index.php?s=/Api/Classify/userCart", {
                token: $scope.shopCar.userInfo.token,
                // way:localStorage.getItem("way"),
                // is_happiness:idx
            });
            goodsCar.then(function (e) {
                // console.log(e)
                var noData= e.data.data == "" || e.data.data == null ||e.data.data == undefined;
                if (noData){
                    $scope.shopCar.noCommonGoods = true;
                    $scope.shopCar.haveCommonGoods = false;
                }else {
                    $scope.shopCar.commonGoods = e.data.data;
                };
                /*switch (idx){
                    case 0:
                        if (noData){
                            $scope.shopCar.noCommonGoods = true;
                            $scope.shopCar.haveCommonGoods = false;
                        }else {
                            $scope.shopCar.commonGoods = e.data.data;
                        };
                        break;
                    case 1:
                        if (noData){
                            $scope.shopCar.noStrictGoods = true;
                            $scope.shopCar.haveStrictGoods = false;
                        }else {
                            $scope.shopCar.strictGoods = e.data.data;
                        };
                        break;
                };*/
            }, function (e) {
                console.log(e)
            });
        };
        $scope.getShopCarGoods(0);


        //商铺全选
        $scope.CheckstoreAll = function (idx,StoreItem) {
            /*switch (idx){
                case 0:
                    angular.forEach(StoreItem.goods_info, function (goodsItem) {
                        if (StoreItem.isCheckstoreAll) {
                            goodsItem.isCheckOneGoods = true;
                        } else {
                            goodsItem.isCheckOneGoods = false;
                        }
                    });
                    break;
                case 1:
                    angular.forEach(StoreItem.goods_info, function (goodsItem) {
                        if (StoreItem.isCheckstoreAll) {
                            goodsItem.isCheckOneGoods = true;
                        } else {
                            goodsItem.isCheckOneGoods = false;
                        }
                    });
                    break;
            };*/
            angular.forEach(StoreItem.goods_info, function (goodsItem) {
                if (StoreItem.isCheckstoreAll) {
                    goodsItem.isCheckOneGoods = true;
                } else {
                    goodsItem.isCheckOneGoods = false;
                }
            });

          $scope.judgeIsSelectAll(idx);
          $scope.addPrice(idx);
        };
        //商品选中
        $scope.CheckOneGoods = function (idx,goods,store) {
            var goodsNum = store.goods_info.length;
            var isCheckNum = 0;
            angular.forEach(store.goods_info, function (goodsItem) {
                if (goodsItem.isCheckOneGoods) {
                    isCheckNum += 1;
                };
            });
            //如果商品的选中长度等于店铺下商品的长度，则商铺的选中状态改变;
            if (isCheckNum === goodsNum) {
                store.isCheckstoreAll = true;
            } else {
                store.isCheckstoreAll = false;
            }
            $scope.judgeIsSelectAll(idx);
            $scope.addPrice(idx);
        };
        //总价格增加
        $scope.addPrice = function (idx) {
           /* switch (idx){
                case 0:
                    var totalPriceCommon = 0;
                    angular.forEach($scope.shopCar.commonGoods, function (storeItem) {
                        angular.forEach(storeItem.goods_info, function (goodsItem) {
                            if (goodsItem.isCheckOneGoods) {
                                totalPriceCommon += parseFloat(goodsItem.goods_price) * goodsItem.goods_count;
                            };
                        });
                    });
                    $scope.shopCar.totalPriceCommon = parseFloat(totalPriceCommon).toFixed(2);
                    break;
                case 1:
                    var totalPriceStrict = 0,
                        totalStockStrict = 0;
                    angular.forEach($scope.shopCar.strictGoods, function (storeItem) {
                        angular.forEach(storeItem.goods_info, function (goodsItem) {
                            if (goodsItem.isCheckOneGoods) {
                                totalPriceStrict += parseFloat(goodsItem.goods_price) * goodsItem.goods_count;
                                totalStockStrict += parseFloat(goodsItem.goods_point) * goodsItem.goods_count;
                            };
                        });
                    });
                    $scope.shopCar.totalPriceStrict = parseFloat(totalPriceStrict).toFixed(2);
                    $scope.shopCar.totalIntegralStrict = parseFloat(totalStockStrict).toFixed(2);
                    break;
            };*/
            var totalPriceCommon = 0,
                totalStrictPriceCommon = 0,
                totalStrictIntegralCommon = 0;
            angular.forEach($scope.shopCar.commonGoods, function (storeItem) {
                angular.forEach(storeItem.goods_info, function (goodsItem) {
                    if (goodsItem.isCheckOneGoods) {
                        totalPriceCommon += parseFloat(goodsItem.total_ready) * goodsItem.goods_count;
                        totalStrictPriceCommon += parseFloat(goodsItem.goods_price) * goodsItem.goods_count;
                        totalStrictIntegralCommon += parseFloat(goodsItem.goods_point) * goodsItem.goods_count;
                    };
                });
            });
            $scope.shopCar.totalPriceCommon = parseFloat(totalPriceCommon).toFixed(2);
            $scope.shopCar.totalStrictPriceCommon = parseFloat(totalStrictPriceCommon).toFixed(2);
            $scope.shopCar.totalStrictIntegralCommon = parseFloat(totalStrictIntegralCommon).toFixed(2);
        };
        //数量增加
        $scope.addCount = function (idx,item, bool) {
            if (bool) {
                item.goods_count++;
            } else {
                item.goods_count--;
                if (item.goods_count <= 1) {
                    item.goods_count = 1;
                }
            }
            $scope.addPrice(idx);
        };
        //商品删除
        $scope.delete = function (idx,store, _index) {
            appService.conform("确定要删除？").then(function (value) {
                var sc_id =  store.goods_info[_index].sc_id;
                //删除购物车商品请求
                var deleteShopCar=appService._postData(URL+"index.php?s=/Api/Classify/delcart",{sc_id:sc_id});
                deleteShopCar.then(function (e) {
                    if (e.data.ret == 'success'){
                        appService.artTxt("删除成功").then(function (value) {
                            store.goods_info.splice(_index, 1);
                            /*switch (idx){
                                case 0:
                                    var $index = $scope.shopCar.commonGoods.indexOf(store);
                                    if (store.goods_info.length == 0) {
                                        $scope.shopCar.commonGoods.splice($index, 1);
                                    };
                                    break;
                                case 1:
                                    var $index = $scope.shopCar.strictGoods.indexOf(store);
                                    if (store.goods_info.length == 0) {
                                        $scope.shopCar.strictGoods.splice($index, 1);
                                    };
                                    break;
                            };*/
                            var $index = $scope.shopCar.commonGoods.indexOf(store);
                            if (store.goods_info.length == 0) {
                                $scope.shopCar.commonGoods.splice($index, 1);
                            };
                            $scope.addPrice(idx);
                        });
                    };
                },function (e) {
                    console.log(e)
                });
            },function (reason) {
                appService.artTxt("取消操作成功！")
            });
        };
        //判断选中的长度，是否全选
        $scope.judgeIsSelectAll=function (idx) {
            /*switch (idx){
                case 0:
                    var storeLength=$scope.shopCar.commonGoods.length,
                        selectStoreLength=0;
                    angular.forEach($scope.shopCar.commonGoods,function(item){
                        if(item.isCheckstoreAll){
                            selectStoreLength++;
                        };
                    });
                    //如果选中的商铺长度 等于 总商铺的长度 则下方全选
                    if(selectStoreLength==storeLength){
                        $scope.shopCar.selectAllCommon=true;
                    }else{
                        $scope.shopCar.selectAllCommon=false;
                    };
                    break;
                case 1:
                    var storeLength=$scope.shopCar.strictGoods.length,
                        selectStoreLength=0;
                    angular.forEach($scope.shopCar.strictGoods,function(item){
                        if(item.isCheckstoreAll){
                            selectStoreLength++;
                        }
                    });
                    //如果选中的商铺长度 等于 总商铺的长度 则下方全选
                    if(selectStoreLength==storeLength){
                        $scope.shopCar.selectAllStrict=true;
                    }else{
                        $scope.shopCar.selectAllStrict=false;
                    };
                    break;
            };*/
            var storeLength=$scope.shopCar.commonGoods.length,
                selectStoreLength=0;
            angular.forEach($scope.shopCar.commonGoods,function(item){
                if(item.isCheckstoreAll){
                    selectStoreLength++;
                };
            });
            //如果选中的商铺长度 等于 总商铺的长度 则下方全选
            if(selectStoreLength==storeLength){
                $scope.shopCar.selectAllCommon=true;
            }else{
                $scope.shopCar.selectAllCommon=false;
            };
        };
        //全选
        $scope.selectAllGoods=function(idx){
            /*switch (idx){
                case 0:
                    angular.forEach($scope.shopCar.commonGoods,function(storeItem){
                        if($scope.shopCar.selectAllCommon){
                            storeItem.isCheckstoreAll=true;
                            angular.forEach(storeItem.goods_info,function(goodsItem){
                                goodsItem.isCheckOneGoods=true;
                            })
                        }else{
                            storeItem.isCheckstoreAll=false;
                            angular.forEach(storeItem.goods_info,function(goodsItem){
                                goodsItem.isCheckOneGoods=false;
                            })
                        }
                    });
                    break;
                case 1:
                    angular.forEach($scope.shopCar.strictGoods,function(storeItem){
                        if($scope.shopCar.selectAllStrict){
                            storeItem.isCheckstoreAll=true;
                            angular.forEach(storeItem.goods_info,function(goodsItem){
                                goodsItem.isCheckOneGoods=true;
                            })
                        }else{
                            storeItem.isCheckstoreAll=false;
                            angular.forEach(storeItem.goods_info,function(goodsItem){
                                goodsItem.isCheckOneGoods=false;
                            })
                        }
                    });
                    break;
            };*/
            angular.forEach($scope.shopCar.commonGoods,function(storeItem){
                if($scope.shopCar.selectAllCommon){
                    storeItem.isCheckstoreAll=true;
                    angular.forEach(storeItem.goods_info,function(goodsItem){
                        goodsItem.isCheckOneGoods=true;
                    })
                }else{
                    storeItem.isCheckstoreAll=false;
                    angular.forEach(storeItem.goods_info,function(goodsItem){
                        goodsItem.isCheckOneGoods=false;
                    })
                }
            });
            $scope.addPrice(idx);
        };
        //去结算
        $scope.goClear=function (idx) {
            /*switch (idx){
                case 0:
                    angular.forEach($scope.shopCar.commonGoods,function (storeItem) {
                        angular.forEach(storeItem.goods_info,function (goodsItem) {
                            if(goodsItem.isCheckOneGoods){
                                var order={
                                    goods_id:goodsItem.goods_id,
                                    goods_count:goodsItem.goods_count,
                                    goods_types:goodsItem.goods_types,
                                    goods_img:goodsItem.default_img,
                                    goods_name:goodsItem.goods_name,
                                    goods_price:goodsItem.goods_price,
                                    goods_point:goodsItem.goods_point
                                };
                                $scope.shopCar.shopId.push(goodsItem.sc_id);
                                $scope.shopCar.finalOrder.push(order);
                            }
                        })
                    });
                    break;
                case 1:
                    angular.forEach($scope.shopCar.strictGoods,function (storeItem) {
                        angular.forEach(storeItem.goods_info,function (goodsItem) {
                            if(goodsItem.isCheckOneGoods){
                                var order={
                                    goods_id:goodsItem.goods_id,
                                    goods_count:goodsItem.goods_count,
                                    goods_types:goodsItem.goods_types,
                                    goods_img:goodsItem.default_img,
                                    goods_name:goodsItem.goods_name,
                                    goods_price:goodsItem.goods_price,
                                    goods_point:goodsItem.goods_point
                                };
                                $scope.shopCar.shopId.push(goodsItem.sc_id);
                                $scope.shopCar.finalOrder.push(order);
                            }
                        })
                    });
                    break;
            }*/
            angular.forEach($scope.shopCar.commonGoods,function (storeItem) {
                angular.forEach(storeItem.goods_info,function (goodsItem) {
                    if(goodsItem.isCheckOneGoods){
                        var order={
                            goods_id:goodsItem.goods_id,
                            goods_count:goodsItem.goods_count,
                            goods_types:goodsItem.goods_types,
                            goods_img:goodsItem.default_img,
                            goods_name:goodsItem.goods_name,
                            goods_price:goodsItem.goods_price,
                            goods_point:goodsItem.goods_point,
                            total_ready:goodsItem.total_ready,

                        };
                        $scope.shopCar.shopId.push(goodsItem.sc_id);
                        $scope.shopCar.finalOrder.push(order);
                    }
                })
            });
            if($scope.shopCar.finalOrder.length != 0){
                var finalPrice = $scope.shopCar.totalPriceCommon,
                    finalIntegral =$scope.shopCar.totalStrictIntegralCommon,
                    finalPriceStrict　=$scope.shopCar.totalStrictPriceCommon;


              /*  var finalPrice = 0,
                    finalIntegral =0,
                    goodsDefault =0;
                switch (idx){
                    case 0:
                        finalIntegral = 0;
                        finalPrice = $scope.shopCar.totalPriceCommon;
                        goodsDefault = 0;
                        break;
                    case 1:
                        finalIntegral = $scope.shopCar.totalIntegralStrict;
                        finalPrice = $scope.shopCar.totalPriceStrict;
                        goodsDefault = $scope.shopCar.totalIntegralStrict;
                        break;
                }*/
                var dataArr={
                    token:$scope.shopCar.userInfo.token,
                    goodsInfo:$scope.shopCar.finalOrder,
                    // way:localStorage.getItem("way"),
                    totalPrice:finalPrice,
                    totalPoint:finalIntegral,
                    totalPriceStrict:finalPriceStrict,
                    sc_id:$scope.shopCar.shopId,
                    // goodsDefault:goodsDefault,
                };
                // console.log(dataArr);
                localStorage.setItem("datas",JSON.stringify(dataArr));
                $state.go("clearing",{way:"shopCar"})
            }else {
                appService.artTxt("您还为选中商品！！！");
                return false;
            }
        };
        // tab 切换
       /* $scope.shopCarTab=function (idx) {
            switch (idx){
                case 0:
                    $scope.shopCar.isCommon = true;
                    $scope.shopCar.isStrict = false;
                    $scope.shopCar.totalPriceCommon = 0;
                    $scope.shopCar.selectAllCommon = false;
                    break;
                case 1:
                    $scope.shopCar.isCommon = false;
                    $scope.shopCar.isStrict = true;
                    $scope.shopCar.totalPriceStrict = 0;
                    $scope.shopCar.totalIntegralStrict = 0;
                    $scope.shopCar.selectAllStrict = false;
                    break;
            };
            $scope.shopCar.finalOrder = [];
            $scope.shopCar.shopId = [];
            $scope.getShopCarGoods(idx);
        };*/

    }])