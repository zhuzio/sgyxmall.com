//商品详情页面 控制器
yx_mallApp
    .controller("detailController",["$scope","$stateParams","appService","$state","$window",function ($scope,$stateParams,appService,$state,$window) {
        $scope.goodsDetail={
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
            token:localStorage.getItem("tokens"),
            ways:localStorage.getItem("way"),
            //购物车数量显示
            is_shopCarCount:false,
            //购物车的数量
            shopCarCount:0,
            userInfo:[],
            chosePrice:0,
            chosePoint:0,
            chosePriceStrict:0,
        };
        $scope.goodsDetail.userInfo = JSON.parse(localStorage.getItem("userInfo"));

        //商品加
        $scope.goodsDetail.numAdd=function () {
            $scope.goodsDetail.finalNum=$scope.goodsDetail.finalNum+1;
            $scope.goodsDetail.finalPrice=parseFloat(($scope.goodsDetail.t_price)*($scope.goodsDetail.finalNum)).toFixed(2);
            $scope.goodsDetail.finalPoint=parseFloat(($scope.goodsDetail.t_integral)*($scope.goodsDetail.finalNum)).toFixed(2);
            $scope.goodsDetail.finalPriceStrict=parseFloat(($scope.goodsDetail.t_priceStrict)*($scope.goodsDetail.finalNum)).toFixed(2);
        };
        // 商品减
        $scope.goodsDetail.numSub=function () {
            if($scope.goodsDetail.finalNum == 1){
                $scope.goodsDetail.finalNum = 1
            }else {
                $scope.goodsDetail.finalNum=$scope.goodsDetail.finalNum-1;
            }
            $scope.goodsDetail.finalPrice=parseFloat(($scope.goodsDetail.t_price)*($scope.goodsDetail.finalNum)).toFixed(2);
            $scope.goodsDetail.finalPoint=parseFloat(($scope.goodsDetail.t_integral)*($scope.goodsDetail.finalNum)).toFixed(2);
            $scope.goodsDetail.finalPriceStrict=parseFloat(($scope.goodsDetail.t_priceStrict)*($scope.goodsDetail.finalNum)).toFixed(2);
        };
        //获得商品详情数据
        var goods=appService._postData(URL+"index.php?s=/Api/Classify/goodsInfo",{goods_id:$stateParams.goodsId});
            goods.then(function (value) {
                console.log(value);
                // 商品赋值
                $scope.goodsDetail.goods = value.data.data;
                // 商品颜色分类
                $scope.goodsDetail.goods_color=value.data.data.specification;
                //商品的尺寸分类
                $scope.goodsDetail.goods_size=value.data.data.specification[0].spec_desc2;
                //默认商品弹出价格
                $scope.goodsDetail.t_price=value.data.data.total_ready;
                //默认商品弹出积分
                $scope.goodsDetail.t_integral=value.data.data.default_point;
                //默认商品弹出积分现金
                $scope.goodsDetail.t_priceStrict = value.data.data.default_ready;
                //默认库存
                $scope.goodsDetail.stock=value.data.data.default_stock;
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
                        loop:true
                    });
                    $scope.goodsDetail.offsetTop=parseInt($(".gdi_img_title").offset().top);
                    $(window).scroll(function () {
                        if($(window).scrollTop() > $scope.goodsDetail.offsetTop){
                            $(".gd_goods").removeClass("scroll_on");
                            $(".gd_detail").addClass("scroll_on")
                        }else if ($(window).scrollTop() <= $scope.goodsDetail.offsetTop){
                            $(".gd_goods").addClass("scroll_on");
                            $(".gd_detail").removeClass("scroll_on")
                        }
                    })
                },0);

            },function (reason) {
                console.log(reason)
            });
        //页面头部 商品  详情 滚动
        $scope.scrollNow=function (n) {
            if (n == 1){
                $scope.goodsDetail.g_d = true;
                $scope.goodsDetail.g_g = false;
                $('body,html').animate({'scrollTop':$scope.goodsDetail.offsetTop+3},500)
            }else if(n == 0){
                $scope.goodsDetail.g_d = false;
                $scope.goodsDetail.g_g = true;
                $('body,html').animate({'scrollTop':0},500)
            }
        };
        //颜色选择
        $scope.choseColor=function (index,color) {
            $scope.goodsDetail.colorIdx=index;
            $scope.goodsDetail.finalColor=color;
            $scope.goodsDetail.finalSize = "";
            $scope.goodsDetail.finalNum = 1;
            //点击颜色，将下方的尺寸重新赋值
            $scope.goodsDetail.goods_size=$scope.goodsDetail.goods_color[index].spec_desc2;
            //点击颜色，将下方的尺寸选中重新归零
            $scope.goodsDetail.sizeIdx=-1;
            //点击颜色，将购买的价格进行重新赋值
            $scope.goodsDetail.t_price=$scope.goodsDetail.goods_color[index].total_ready;
            //点击颜色，将购买的积分进行重新赋值
            $scope.goodsDetail.t_integral=$scope.goodsDetail.goods_color[index].point;
            //d点击颜色，将购买的积分现金进行重新赋值
            $scope.goodsDetail.t_priceStrict=$scope.goodsDetail.goods_color[index].selling;
            //点击颜色，将默认库存进行重新赋值
            $scope.goodsDetail.stock=$scope.goodsDetail.goods_color[index].stock;
            //商品最终的总价钱
            $scope.goodsDetail.finalPrice=$scope.goodsDetail.t_price;
            $scope.goodsDetail.finalPoint=$scope.goodsDetail.t_integral;
            $scope.goodsDetail.finalPriceStrict=$scope.goodsDetail.t_priceStrict;

            $scope.goodsDetail.chosePrice = $scope.goodsDetail.goods_color[index].total_ready;
            $scope.goodsDetail.chosePoint =$scope.goodsDetail.goods_color[index].point;
            $scope.goodsDetail.chosePriceStrict =$scope.goodsDetail.goods_color[index].selling;
        };
        //尺寸选择
        $scope.choseSize=function (index,size) {
            $scope.goodsDetail.sizeIdx=index;
            $scope.goodsDetail.finalSize=size;
        };
        //弹出层出现
        $scope.alerts=function (x) {
            if(x == 1){
                $scope.goodsDetail.way=true;
                $scope.goodsDetail.confrim=false;
            }else {
                $scope.goodsDetail.way=false;
                $scope.goodsDetail.confrim=true;
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
            if ($scope.goodsDetail.enter == 2){
                $scope.joinShopCar();
            };
            //立即购买弹出确定
            if($scope.goodsDetail.enter == 3){
                $scope.buyRightNow();
            };
        };
        //选择颜色尺寸
        $scope.choseType=function (n) {
            $scope.alerts(n);
            $scope.goodsDetail.enter=n;
        };
        //点击选择类型后的 加入购物车 立即购买
        $scope.alertDo=function (j) {
            //加入购物车
            if (j == 0){
                $scope.joinShopCar();
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
                goods_counts:"",
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
            f_data.goods_types="颜色："+$scope.goodsDetail.finalColor+"，尺寸："+$scope.goodsDetail.finalSize
            f_data.goods_count=$scope.goodsDetail.finalNum;
            f_data.goods_id=$scope.goodsDetail.goods.goods_id;
            f_data.goods_img=$scope.goodsDetail.goods.default_img;
            f_data.goods_name=$scope.goodsDetail.goods.goods_name;
            f_data.goods_price=$scope.goodsDetail.chosePriceStrict;
            f_data.goods_point= $scope.goodsDetail.chosePoint;
            f_data.total_ready=$scope.goodsDetail.chosePrice;
            /*f_data.chosePrice = $scope.goodsDetail.chosePrice;
            f_data.chosePoint = $scope.goodsDetail.chosePoint;
            f_data.chosePriceStrict = $scope.goodsDetail.chosePriceStrict;*/
            arr.push(f_data);
            return arr;
        };
        //获得购物车的商品数量
        if ($scope.goodsDetail.userInfo){
            var shopCarCount=appService._postData(URL+"index.php?s=/Api/Classify/cartCount",{
                token:$scope.goodsDetail.userInfo.token,
                // way:localStorage.getItem("way"),
            });
            shopCarCount.then(function (e) {
                // console.log(e.data);
                if(e.data.ret == "ok"){

                    if(e.data.data == 0){
                        $scope.goodsDetail.is_shopCarCount = false;
                    }else {
                        $scope.goodsDetail.is_shopCarCount = true;
                    }
                    $scope.goodsDetail.shopCarCount=e.data.data;
                }
            },function (e) {
                console.log(e)
            })
        };
        $scope.joinShopCar=function () {
            if($scope.goodsDetail.userInfo.token == "" || $scope.goodsDetail.userInfo.token == undefined || $scope.goodsDetail.userInfo.token == null){
                appService.artTxt("登录超时或未登录，请重新登录！！！");
            }else if($scope.goodsDetail.finalColor == "" || $scope.goodsDetail.finalSize == ""){
                appService.artTxt("请选择颜色或尺寸");
            }else {
                var JoinShopCar=appService._postData(URL+"index.php?s=/Api/Classify/addCart",{
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
                    console.log(e.data);
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
                $scope.colseAlerts();
            }
        };
        $scope.buyRightNow=function () {
            if($scope.goodsDetail.userInfo.token == "" || $scope.goodsDetail.userInfo.token == undefined || $scope.goodsDetail.userInfo.token == null){
                appService.artTxt("登录超时或未登录，请重新登录！！！");
            }else if($scope.goodsDetail.finalColor == "" || $scope.goodsDetail.finalSize == ""){
                appService.artTxt("请选择颜色或尺寸");
            }else{
                /*if ($scope.goodsDetail.goods.default_point == 0){
                    var dataArr={
                        token:$scope.goodsDetail.token,
                        goodsInfo:$scope.finalData(),
                        way:$scope.goodsDetail.ways,
                        totalPrice:$scope.goodsDetail.finalPrice,
                        totalPoint:0,
                        goodsDefault:$scope.goodsDetail.goods.default_point
                    };
                }else {
                    var dataArr={
                        token:$scope.goodsDetail.token,
                        goodsInfo:$scope.finalData(),
                        way:$scope.goodsDetail.ways,
                        totalPrice:$scope.goodsDetail.finalPrice,
                        totalPoint:$scope.goodsDetail.finalPoint,
                        goodsDefault:$scope.goodsDetail.goods.default_point
                    };
                }*/
                var dataArr={
                    token:$scope.goodsDetail.userInfo.token,
                    goodsInfo:$scope.finalData(),
                    totalPrice:$scope.goodsDetail.finalPrice,
                    totalPoint:$scope.goodsDetail.finalPoint,
                    totalPriceStrict:$scope.goodsDetail.finalPriceStrict,
                    // goodsDefault:$scope.goodsDetail.goods.default_point
                };
                // console.log(dataArr);
                localStorage.setItem("datas",JSON.stringify(dataArr));
                $state.go("clearing");
            }
        };
    }]);