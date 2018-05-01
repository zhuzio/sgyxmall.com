//结算页面 控制器
yx_mallApp
    .controller("clearController",["$scope","$stateParams","appService","$state",function ($scope,$stateParams,appService,$state) {
        document.title = "填写订单";
        $scope.clear={
            goods:[],
            total:"",
            total1:"",
            // token:localStorage.getItem("tokens"),
            // way:localStorage.getItem("way"),
            user_name:"***",
            address:"************************************",
            user_phone:"********************",
            dataArr:localStorage.getItem("datas"),
            goodsNum:[],
            number:0,
            shopId:[],
            goodsDefault:"",
            userInfo:[],
        };
        $scope.clear.userInfo = JSON.parse(localStorage.getItem("userInfo"));
        // console.log(JSON.parse($scope.clear.dataArr))
        if ( $stateParams.way=="shopCar" ){

            $scope.clear.shopId = JSON.parse($scope.clear.dataArr).sc_id;
        }else {
            $scope.clear.shopId = [""];
        }
        //获得商品结算信息
        $scope.clear.goods=JSON.parse($scope.clear.dataArr).goodsInfo;
        // $scope.clear.goodsDefault = JSON.parse($scope.clear.dataArr).goodsDefault;
        /*if ($scope.clear.goodsDefault == 0){
            $scope.clear.total=JSON.parse($scope.clear.dataArr).totalPrice+" 元  ";
        }else {
            $scope.clear.total=JSON.parse($scope.clear.dataArr).totalPrice+" 元 + "+JSON.parse($scope.clear.dataArr).totalPoint+" 积分";
        };*/

        $scope.clear.total=JSON.parse($scope.clear.dataArr).totalPrice+" 元 ";
        $scope.clear.total1 ="或 ¥"+JSON.parse($scope.clear.dataArr).totalPriceStrict+" + 积分"+JSON.parse($scope.clear.dataArr).totalPoint+""
        for (var i in $scope.clear.goods){
            //获得数量
            var num=($scope.clear.goods)[i].goods_count;
            $scope.clear.goodsNum.push(num)
        }
        $scope.clear.number=parseFloat(eval($scope.clear.goodsNum.join("+")))
        //获得用户地址信息
        var defAds=JSON.parse(localStorage.getItem("choseAds"));
        if (defAds){
            $scope.clear.user_name=defAds.consignee;
            $scope.clear.user_phone=defAds.phone_tel;
            $scope.clear.address=defAds.region_name+" "+defAds.address
        }else {
            var address=appService._postData(URL+"index.php?s=/Api/User/getDefaultAddress",{
                token:$scope.clear.userInfo.token,
                // way:$scope.clear.way,
                apiType:"one"
            });
            address.then(function (e) {
                // console.log(e)
                if (e.data.data == "" || e.data.data == null){
                    appService.conform("您还没有收货地址，确定去添加？").then(function (value) {
                        $state.go("addAddress",{url:"clearing"});
                    },function (reason) {
                        window.history.back(-1);
                    });
                }else {
                    $scope.clear.user_name=e.data.data.consignee;
                    $scope.clear.user_phone=e.data.data.phone_tel;
                    $scope.clear.address=e.data.data.region_name+" "+e.data.data.address
                }

            },function (e) {
                console.log(e)
            });
        }

        //去支付
        $scope.goApply=function () {
            var order=appService._postData(URL+"index.php?s=/Api/order/addOrder",{
                token:$scope.clear.userInfo.token,
                // way:localStorage.getItem("way"),
                goodsInfo:JSON.parse($scope.clear.dataArr).goodsInfo,
                buy_name:$scope.clear.user_name,
                address:$scope.clear.address,
                phone_tell:$scope.clear.user_phone,
                sc_id:$scope.clear.shopId,
            });
            order.then(function (e) {
                // console.log(e)
                if(e.data.ret == "ok"){
                    $state.go("applyWay",{
                        OrderID:[e.data.data],
                        num:$('.each_order_list').length,
                        price:JSON.parse($scope.clear.dataArr).totalPrice,
                        point:JSON.parse($scope.clear.dataArr).totalPoint,
                        sc_id:$scope.clear.shopId,
                        isY:JSON.parse($scope.clear.dataArr).goodsDefault
                    });
                }else {
                    appService.artTxt(e.data.ret );
                    return false;
                }
            },function (e) {
                console.log(e)
            });

        }

    }])