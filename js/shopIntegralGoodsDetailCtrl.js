yx_mallApp
    .controller("shopIntegralGoodsDetailController",["$scope","appService","$stateParams","$state",function ($scope,appService,$stateParams,$state) {
        document.title = '商品详情'
        $scope.sigd={
            goods:{},
            //弹出层价格
            t_price:"",
            //弹出层积分价格
            t_integral:"",
            //弹出层积分现金
            t_priceStrict:"",
            g_g:true,
            g_d:false,
            offsetTop:0,
            //尺寸数据
            goods_size:[],
            //颜色数据
            goods_color:[],
            //最终的尺寸选择
            finalSize:"",
            //最终的颜色选择
            finalColor:"",
            //最终的商品数量
            finalNum:1,
            //最终价格
            finalPrice:0,
            //最终积分
            finalPoint:0,
            finalPriceStrict:0,
            //控制弹出层操作显示
            way:true,
            //控制弹出层确定显示
            confrim:false,
            //判断是哪个点击弹出的
            enter:0,
            colorIdx:-1,
            sizeIdx:-1,
            //规格
            specification:0,
            //库存
            stock:0,
            //是否有颜色分类;
            isColor:true,
            //是否有尺寸分类；
            isSizes:true,
            //最终商品订单
            finalGoodsOrder:[],
            //购物车数量显示
            is_shopCarCount:false,
            //购物车的数量
            shopCarCount:0,
            userInfo:[],
            chosePrice:0,
            chosePoint:0,
            chosePriceStrict:0,
            // 规格名字
            specName1:"",
            specName2:""
        };
        $scope.sigd.userInfo = JSON.parse(localStorage.getItem("userInfo"));

        //商品加
        $scope.sigd.numAdd=function () {
            $scope.sigd.finalNum=$scope.sigd.finalNum+1;
            $scope.sigd.finalPrice=parseFloat(($scope.sigd.t_price)*($scope.sigd.finalNum)).toFixed(2);
            $scope.sigd.finalPoint=parseFloat(($scope.sigd.t_integral)*($scope.sigd.finalNum)).toFixed(2);
            $scope.sigd.finalPriceStrict=parseFloat(($scope.sigd.t_priceStrict)*($scope.sigd.finalNum)).toFixed(2);
        };
        // 商品减
        $scope.sigd.numSub=function () {
            if($scope.sigd.finalNum == 1){
                $scope.sigd.finalNum = 1
            }else {
                $scope.sigd.finalNum=$scope.sigd.finalNum-1;
            }
            $scope.sigd.finalPrice=parseFloat(($scope.sigd.t_price)*($scope.sigd.finalNum)).toFixed(2);
            $scope.sigd.finalPoint=parseFloat(($scope.sigd.t_integral)*($scope.sigd.finalNum)).toFixed(2);
            $scope.sigd.finalPriceStrict=parseFloat(($scope.sigd.t_priceStrict)*($scope.sigd.finalNum)).toFixed(2);
        };

        var sigDD =appService._getData(URL+'index.php?s=/Api/Goods/moneyGoodsInfo/goods_id/'+$stateParams.goodsId+'');
            sigDD.then(function (value) {
                console.log(value.data.data)
                $scope.sigd.specName1 = value.data.data.spec_name_1;
                $scope.sigd.specName2 = value.data.data.spec_name_2;
                // 商品赋值
                $scope.sigd.goods = value.data.data;

                // 商品颜色分类
                $scope.sigd.goods_color = value.data.data.spec;
                //商品的尺寸分类
                $scope.sigd.goods_size = value.data.data.spec[0].spec_desc2;
                //默认商品弹出价格
                $scope.sigd.t_price = value.data.data.total_ready;
                //默认商品弹出积分
                $scope.sigd.t_integral = value.data.data.default_point;
                //默认商品弹出积分现金
                $scope.sigd.t_priceStrict = value.data.data.default_ready;
                //默认库存
                $scope.sigd.stock = value.data.data.default_stock;
                setTimeout(function () {
                    var swiper = new Swiper('.swiper-container', {
                        pagination: '.swiper-pagination',
                        nextButton: '.swiper-button-next',
                        prevButton: '.swiper-button-prev',
                        paginationClickable: true,
                        spaceBetween: 0,
                        centeredSlides: true,
                        autoplay: 2500,
                        autoplayDisableOnInteraction: false,
                        loop: true
                    });
                }, function (reason) {
                    console.log(reason)
                })
            })
        //颜色选择
        $scope.choseColor=function (index,color) {
            $scope.sigd.colorIdx=index;
            $scope.sigd.finalColor=color;
            $scope.sigd.finalSize = "";
            $scope.sigd.finalNum = 1;
            //点击颜色，将下方的尺寸重新赋值
            $scope.sigd.goods_size=$scope.sigd.goods_color[index].spec_desc2;
            //点击颜色，将下方的尺寸选中重新归零
            $scope.sigd.sizeIdx=-1;
            //点击颜色，将购买的价格进行重新赋值
            $scope.sigd.t_price=$scope.sigd.goods_color[index].total_ready;
            //点击颜色，将购买的积分进行重新赋值
            $scope.sigd.t_integral=$scope.sigd.goods_color[index].point;
            //d点击颜色，将购买的积分现金进行重新赋值
            $scope.sigd.t_priceStrict=$scope.sigd.goods_color[index].selling;
            //点击颜色，将默认库存进行重新赋值
            $scope.sigd.stock=$scope.sigd.goods_color[index].stock;
            //商品最终的总价钱
            $scope.sigd.finalPrice=$scope.sigd.t_price;
            $scope.sigd.finalPoint=$scope.sigd.t_integral;
            $scope.sigd.finalPriceStrict=$scope.sigd.t_priceStrict;

            $scope.sigd.chosePrice = $scope.sigd.goods_color[index].total_ready;
            $scope.sigd.chosePoint =$scope.sigd.goods_color[index].point;
            $scope.sigd.chosePriceStrict =$scope.sigd.goods_color[index].selling;

            console.log($scope.sigd.chosePrice,$scope.sigd.chosePoint,$scope.sigd.chosePriceStrict)
        };
        //尺寸选择
        $scope.choseSize=function (index,size) {
            $scope.sigd.sizeIdx=index;
            $scope.sigd.finalSize=size;
        };
        //弹出层出现
        $scope.alerts=function (x) {
            if(x == 1){
                $scope.sigd.way=true;
                $scope.sigd.confrim=false;
            }else {
                $scope.sigd.way=false;
                $scope.sigd.confrim=true;
            };
            $(".chose_type_container").css("display","block")
            $(".chose_type").animate({
                bottom:"0%"
            },400);
        };
        //关闭弹出层
        $scope.colseAlerts=function () {
            $(".chose_type").animate({
                bottom:"-100%"
            },300,function () {
                $(".chose_type_container").css("display","none")
            });
        };
        //确定执行事件
        $scope.goodsConfrim=function () {
            //购物车弹出确定
            if ($scope.sigd.enter == 2){
                appService.artTxt("购物积分专区没有该功能，请选择其他操作")
                return false;
            };
            //立即购买弹出确定
            if($scope.sigd.enter == 3){
                $scope.buyRightNow();
            };
        };
        //选择颜色尺寸
        $scope.choseType=function (n) {
            if (n==2){
                appService.artTxt("购物积分专区没有该功能，请选择其他操作")
                return false;
            }else {
                $scope.alerts(n);
                $scope.sigd.enter=n;
            }

        };
        //点击选择类型后的 加入购物车 立即购买
        $scope.alertDo=function (j) {
            //加入购物车
            if (j == 0){
                appService.artTxt("购物积分专区没有该功能，请选择其他操作")
                return false;
            };
            //立即购买
            if (j == 1){
                $scope.buyRightNow();
            };
        };
        //获得最后的数据
        $scope.finalData=function () {
            var arr=[];
            var f_data={
                goods_id:"",
                goods_count:"",
                goods_types:"",
                goods_img:"",
                goods_name:"",
                goods_price:"",
                goods_point:"",
                total_ready:"",
                chosePrice:0,
                chosePoint:0,
                chosePriceStrict:0,
            };
            f_data.goods_types="颜色："+$scope.sigd.finalColor+"，尺寸："+$scope.sigd.finalSize
            f_data.goods_count=$scope.sigd.finalNum;
            f_data.goods_id=$scope.sigd.goods.goods_id;
            f_data.goods_img=$scope.sigd.goods.default_img;
            f_data.goods_name=$scope.sigd.goods.goods_name;
            f_data.goods_price=$scope.sigd.chosePriceStrict;
            f_data.goods_point= $scope.sigd.chosePoint;
            f_data.total_ready=$scope.sigd.chosePrice;
            f_data.chosePrice = $scope.sigd.chosePrice;
            f_data.chosePoint = $scope.sigd.chosePoint;
            f_data.chosePriceStrict = $scope.sigd.chosePriceStrict;
            arr.push(f_data);
            return arr;
        };
        $scope.joinShopCar=function () {
            appService.artTxt("购物积分专区没有该功能，请选择其他操作")
            return false;
           /* if($scope.sigd.userInfo.token == "" || $scope.sigd.userInfo.token == undefined || $scope.sigd.userInfo.token == null){
                appService.artTxt("登录超时或未登录，请重新登录！！！");
            }else if($scope.sigd.finalColor == "" || $scope.sigd.finalSize == ""){
                appService.artTxt("请选择颜色或尺寸");
            }else {
               /!* var JoinShopCar=appService._postData(URL+"index.php?s=/Api/Classify/addCart",{
                    token:$scope.goodsDetail.userInfo.token,
                    // way:localStorage.getItem("way"),
                    goods_id:$scope.goodsDetail.goods.goods_id,
                    goods_types:"颜色："+$scope.goodsDetail.finalColor+"，尺寸："+$scope.goodsDetail.finalSize,
                    goods_count:$scope.goodsDetail.finalNum,
                    goods_price:$scope.goodsDetail.chosePriceStrict,
                    goods_point:$scope.goodsDetail.chosePoint,
                    store_id:$scope.goodsDetail.goods.store_id,
                    store_name:$scope.goodsDetail.goods.store_name,
                    goods_img:$scope.goodsDetail.goods.default_img
                });
                JoinShopCar.then(function (e) {
                    // console.log(e.data);
                    if(e.data.ret == "success"){
                        appService.artTxt("成功加入购物车！").then(function (value) {
                            $scope.goodsDetail.is_shopCarCount = true;
                            $scope.goodsDetail.shopCarCount=parseInt($scope.goodsDetail.shopCarCount)+1;
                        });
                    }else {
                        appService.artTxt(e.data.msg);
                        return false;
                    }
                },function (e) {
                    console.log(e)
                });
                $scope.colseAlerts();*!/
            }*/
        };
        $scope.buyRightNow=function () {
            if($scope.sigd.userInfo.token == "" || $scope.sigd.userInfo.token == undefined || $scope.sigd.userInfo.token == null){
                appService.artTxt("登录超时或未登录，请重新登录！！！");
            }else if($scope.sigd.finalColor == "" || $scope.sigd.finalSize == ""){
                appService.artTxt("请选择颜色或尺寸");
            }else{

                var dataArr={
                    token:$scope.sigd.userInfo.token,
                    goodsInfo:$scope.finalData(),
                    totalPrice:$scope.sigd.finalPrice,
                    totalPoint:$scope.sigd.finalPoint,
                    totalPriceStrict:$scope.sigd.finalPriceStrict,
                };
                localStorage.setItem("datas",JSON.stringify(dataArr));
                $state.go("clearing",{way:1});
            }
        };
    }])