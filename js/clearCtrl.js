//结算页面 控制器
yx_mallApp
    .controller("clearController",["$scope","$stateParams","appService","$state",function ($scope,$stateParams,appService,$state) {
        $scope.clear={
            goods:[],
            total:"",
            token:localStorage.getItem("tokens"),
            way:localStorage.getItem("way"),
            user_name:"***",
            address:"************************************",
            user_phone:"********************",
            dataArr:localStorage.getItem("datas"),
            goodsNum:[],
            number:0
        };
        //获得商品结算信息
        $scope.clear.goods=JSON.parse($scope.clear.dataArr).goodsInfo;
        $scope.clear.total=JSON.parse($scope.clear.dataArr).totalPrice+" 元 + "+JSON.parse($scope.clear.dataArr).totalPoint+" 积分";
        for (var i in $scope.clear.goods){
            //获得数量
            var num=($scope.clear.goods)[i].goods_count;
            $scope.clear.goodsNum.push(num)
        }
        $scope.clear.number=parseFloat(eval($scope.clear.goodsNum.join("+")))
        //获得用户地址信息
        var address=appService._postData(URL+"index.php?s=/Api/User/getDefaultAddress",{
            token:$scope.clear.token,
            way:$scope.clear.way,
            apiType:"one"
        });
        address.then(function (e) {
            console.log(e.data.data);
            if (e.data.data == "" || e.data.data == null){
                var r = confirm("您还没有收货地址，确定去添加？");
                if (r){
                    $state.go("addAddress");
                }else {
                    window.history.back(-1);
                }
            }else {
                $scope.clear.user_name=e.data.data.consignee;
                $scope.clear.user_phone=e.data.data.phone_tel;
                $scope.clear.address=e.data.data.region_name+" "+e.data.data.address
            }

        },function (e) {
            console.log(e)
        });
        //去支付
        $scope.goApply=function () {
            var order=appService._postData(URL+"index.php?s=/Api/order/addOrder",{
                token:localStorage.getItem("tokens"),
                way:localStorage.getItem("way"),
                goodsInfo:JSON.parse($scope.clear.dataArr).goodsInfo,
                buy_name:$scope.clear.user_name,
                address:$scope.clear.address,
                phone_tell:$scope.clear.user_phone
            });
            order.then(function (e) {
                if(e.data.ret == "ok"){
                    $state.go("applyWay",{
                        OrderID:e.data.data,
                        num:$('.each_order_list').length,
                        price:JSON.parse($scope.clear.dataArr).totalPrice,
                        point:JSON.parse($scope.clear.dataArr).totalPoint
                    });
                }else {
                    alert(e.data.ret );
                    return false;
                }
            },function (e) {
                console.log(e)
            });

        }

    }])