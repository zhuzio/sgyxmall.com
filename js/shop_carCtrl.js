//购物车页面 控制器
yx_mallApp
    .controller("shopCarController",["$scope","$stateParams","appService","$state","$window",function ($scope,$stateParams,appService,$state,$window) {
        if(!localStorage.getItem("tokens")){
            $state.go("login");
        };
        document.title='苏格严选商城--购物车';
        $scope.totalPrice = 0;
        $scope.totalStock = 0;
        $scope.selectGoodsAll = false;
        $scope.shopCar = {
            shopName: [],
            shop: [],
            finalOrder:[],
            checkLength:[],
            haveShop:true,
            noShop:false,
            shopId:[]
        };
        var goodsCar = appService._postData(URL+"index.php?s=/Api/Classify/userCart", {
            token: localStorage.getItem("tokens"),
            way:localStorage.getItem("way"),
        });
        goodsCar.then(function (e) {
            console.log(e.data);
            if (e.data.data == "" || e.data.data == null ||e.data.data == undefined){
                $scope.shopCar.haveShop = false;
                $scope.shopCar.noShop = true;
            }else {
                $scope.shopCar.haveShop = true;
                $scope.shopCar.noShop = false;
                $scope.shopCar.shopName = e.data.data;
            }
        }, function (e) {
            console.log(e)
        });
        //商铺全选
        $scope.CheckstoreAll = function (StoreItem) {
            angular.forEach(StoreItem.goods_info, function (goodsItem) {
                if (StoreItem.isCheckstoreAll) {
                    goodsItem.isCheckOneGoods = true;
                } else {
                    goodsItem.isCheckOneGoods = false;
                }
            })
            $scope.judgeIsSelectAll();
            $scope.addPrice();
        };
        //商品选中
        $scope.CheckOneGoods = function (goods,store) {
            var goodsNum = store.goods_info.length;
            var isCheckNum = 0;
            angular.forEach(store.goods_info, function (goodsItem) {
                if (goodsItem.isCheckOneGoods) {
                    isCheckNum += 1;
                }
            });
            //如果商品的选中长度等于店铺下商品的长度，则商铺的选中状态改变
            if (isCheckNum === goodsNum) {
                store.isCheckstoreAll = true;
            } else {
                store.isCheckstoreAll = false;
            }
            $scope.judgeIsSelectAll();
            $scope.addPrice();
        };
        //总价格增加
        $scope.addPrice = function () {
            var totalPrice = 0,
                totalStock = 0;
            angular.forEach($scope.shopCar.shopName, function (storeItem) {
                angular.forEach(storeItem.goods_info, function (goodsItem) {
                    if (goodsItem.isCheckOneGoods) {
                        totalPrice += parseFloat(goodsItem.goods_price) * goodsItem.goods_count;
                        totalStock += parseFloat(goodsItem.goods_point) * goodsItem.goods_count;
                    }
                })
            });
            $scope.totalPrice = totalPrice;
            $scope.totalStock = totalStock;
        }
        //数量增加
        $scope.addCount = function (item, bool) {
            if (bool) {
                item.goods_count++;
            } else {
                item.goods_count--;
                if (item.goods_count <= 1) {
                    item.goods_count = 1;
                }
            }
            $scope.addPrice();
        };
        //商品删除
        $scope.delete = function (store, _index) {
            var r =confirm("确定要删除？");
            if (r){
                var sc_id =  store.goods_info[_index].sc_id;
                //删除购物车商品请求
                var deleteShopCar=appService._postData(URL+"index.php?s=/Api/Classify/delcart",{sc_id:sc_id});
                deleteShopCar.then(function (e) {
                    if (e.data.ret == 'success'){
                        alert("删除成功");
                        $window.location.reload();
                    }
                },function (e) {
                    console.log(e)
                });
                store.goods_info.splice(_index, 1);
                var $index = $scope.shopCar.shopName.indexOf(store);
                if (store.goods_info.length == 0) {
                    $scope.shopCar.shopName.splice($index, 1);
                };
                $scope.addPrice();
            }else {
                return false;
            }

        };
        //判断选中的长度，是否全选
        $scope.judgeIsSelectAll=function () {
            var storeLength=$scope.shopCar.shopName.length,
                selectStoreLength=0;
            angular.forEach($scope.shopCar.shopName,function(item){
                if(item.isCheckstoreAll){
                    selectStoreLength++;
                }
            });
            //如果选中的商铺长度 等于 总商铺的长度 则下方全选
            if(selectStoreLength==storeLength){
                $scope.selectAll=true;
            }else{
                $scope.selectAll=false;
            }
        };
        //全选
        $scope.selectAllGoods=function(){
            console.log($scope.selectGoodsAll)
            angular.forEach($scope.shopCar.shopName,function(storeItem){
                if($scope.selectGoodsAll){
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
            })
            $scope.addPrice();
        };
        //去结算
        $scope.goClear=function () {
            angular.forEach($scope.shopCar.shopName,function (storeItem) {
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
            if($scope.shopCar.finalOrder.length != 0){
                var dataArr={
                    token:localStorage.getItem("tokens"),
                    goodsInfo:$scope.shopCar.finalOrder,
                    way:localStorage.getItem("way"),
                    totalPrice:$scope.totalPrice,
                    totalPoint:$scope.totalStock,
                    sc_id:$scope.shopCar.shopId
                };
                localStorage.setItem("datas",JSON.stringify(dataArr));
                $state.go("clearing",{way:"shopCar"})
            }else {
                alert("您还为选中商品！！！");
                return false;
            }
        };


    }])