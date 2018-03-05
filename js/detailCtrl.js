//商品详情页面 控制器
yx_mallApp
    .controller("detailController",["$scope","$stateParams","appService","$state","$window",function ($scope,$stateParams,appService,$state,$window) {
        $scope.goodsDetail={
            goods:{},
            //弹出层价格
            t_price:"",
            //弹出层积分价格
            t_integral:"",
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
            shopCarCount:0
        };

        //商品加
        $scope.goodsDetail.numAdd=function () {
            $scope.goodsDetail.finalNum=$scope.goodsDetail.finalNum+1
            $scope.goodsDetail.finalPrice=parseFloat(($scope.goodsDetail.t_price)*($scope.goodsDetail.finalNum));
            $scope.goodsDetail.finalPoint=parseFloat(($scope.goodsDetail.t_integral)*($scope.goodsDetail.finalNum));
        };
        // 商品减
        $scope.goodsDetail.numSub=function () {
            if($scope.goodsDetail.finalNum == 1){
                $scope.goodsDetail.finalNum = 1
            }else {
                $scope.goodsDetail.finalNum=$scope.goodsDetail.finalNum-1;
            }
            $scope.goodsDetail.finalPrice=parseFloat(($scope.goodsDetail.t_price)*($scope.goodsDetail.finalNum));
            $scope.goodsDetail.finalPoint=parseFloat(($scope.goodsDetail.t_integral)*($scope.goodsDetail.finalNum));
        };
        //获得商品详情数据
        var goods=appService._postData(URL+"index.php?s=/Api/Classify/goodsInfo",{goods_id:$stateParams.goodsId});
        goods.then(function (e) {
            $scope.goodsDetail.goods=e.data.data;
            console.log($scope.goodsDetail.goods);
            //商品的颜色分类
            $scope.goodsDetail.goods_color=e.data.data.specification;
            /* if($scope.goodsDetail.goods_color == '' || $scope.goodsDetail.goods_color ==null){
                 $scope.goodsDetail.isColor = false;
             };*/
            //商品的尺寸分类
            $scope.goodsDetail.goods_size=e.data.data.specification[0].spec_desc2;
            /* if($scope.goodsDetail.goods_size == '' || $scope.goodsDetail.goods_size ==null){
                 $scope.goodsDetail.isSizes=false;
             };*/
            //默认商品弹出价格
            $scope.goodsDetail.t_price=e.data.data.default_ready;
            //默认商品弹出积分
            $scope.goodsDetail.t_integral=e.data.data.default_point;
            //默认库存
            $scope.goodsDetail.stock=e.data.data.default_stock;
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

        },function (e) {
            console.log(e)
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
            //点击颜色，将下方的尺寸重新赋值
            $scope.goodsDetail.goods_size=$scope.goodsDetail.goods_color[index].spec_desc2;
            //点击颜色，将下方的尺寸选中重新归零
            $scope.goodsDetail.sizeIdx=-1;
            //点击颜色，将购买的价格进行重新赋值
            $scope.goodsDetail.t_price=$scope.goodsDetail.goods_color[index].selling;
            //点击颜色，将购买的积分进行重新赋值
            $scope.goodsDetail.t_integral=$scope.goodsDetail.goods_color[index].point;
            //点击颜色，将默认库存进行重新赋值
            $scope.goodsDetail.stock=$scope.goodsDetail.goods_color[index].stock;
            //商品最终的总价钱
            $scope.goodsDetail.finalPrice=$scope.goodsDetail.t_price;
            $scope.goodsDetail.finalPoint=$scope.goodsDetail.t_integral;
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
                if(localStorage.getItem("tokens") == "" || localStorage.getItem("tokens") == undefined || localStorage.getItem("tokens") == null){
                    alert("登录超时或未登录，请重新登录！！！");
                }else if($scope.goodsDetail.finalColor == "" || $scope.goodsDetail.finalSize == ""){
                    alert("请选择颜色或尺寸");
                }else {
                    var JoinShopCar=appService._postData(URL+"index.php?s=/Api/Classify/addCart",{
                        token:localStorage.getItem("tokens"),
                        way:localStorage.getItem("way"),
                        goods_id:$scope.goodsDetail.goods.goods_id,
                        goods_types:"颜色："+$scope.goodsDetail.finalColor+"，尺寸："+$scope.goodsDetail.finalSize,
                        goods_count:$scope.goodsDetail.finalNum,
                        goods_price:$scope.goodsDetail.t_price,
                        goods_point:$scope.goodsDetail.t_integral,
                        store_id:$scope.goodsDetail.goods.store_id,
                        store_name:$scope.goodsDetail.goods.store_name,
                        goods_img:$scope.goodsDetail.goods.default_img
                    });
                    JoinShopCar.then(function (e) {
                        console.log(e.data);
                        if(e.data.ret == "success"){
                            alert("成功加入购物车！");
                            $window.location.reload();
                        }else {
                            alert(e.data.msg)
                        }
                    },function (e) {
                        console.log(e)
                    });
                    $scope.colseAlerts();
                }
            };
            //立即购买弹出确定
            if($scope.goodsDetail.enter == 3){
                if(localStorage.getItem("tokens") == "" || localStorage.getItem("tokens") == undefined || localStorage.getItem("tokens") == null){
                    alert("登录超时或未登录，请重新登录！！！");
                }else if($scope.goodsDetail.finalColor == "" || $scope.goodsDetail.finalSize == ""){
                    alert("请选择颜色或尺寸");
                }else{
                    var dataArr={
                        token:$scope.goodsDetail.token,
                        goodsInfo:$scope.finalData(),
                        way:$scope.goodsDetail.ways,
                        totalPrice:$scope.goodsDetail.finalPrice,
                        totalPoint:$scope.goodsDetail.finalPoint
                    };
                    localStorage.setItem("datas",JSON.stringify(dataArr));
                    $state.go("clearing");
                }

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
                if(localStorage.getItem("tokens") == "" || localStorage.getItem("tokens") == undefined || localStorage.getItem("tokens") == null){
                    alert("登录超时或未登录，请重新登录！！！");
                }else if($scope.goodsDetail.finalColor == "" || $scope.goodsDetail.finalSize == ""){
                    alert("请选择颜色或尺寸");
                }else {
                    var JoinShopCar=appService._postData(URL+"index.php?s=/Api/Classify/addCart",{
                        token:localStorage.getItem("tokens"),
                        way:localStorage.getItem("way"),
                        goods_id:$scope.goodsDetail.goods.goods_id,
                        goods_types:"颜色："+$scope.goodsDetail.finalColor+"，尺寸："+$scope.goodsDetail.finalSize,
                        goods_count:$scope.goodsDetail.finalNum,
                        goods_price:$scope.goodsDetail.t_price,
                        goods_point:$scope.goodsDetail.t_integral,
                        store_id:$scope.goodsDetail.goods.store_id,
                        store_name:$scope.goodsDetail.goods.store_name,
                        goods_img:$scope.goodsDetail.goods.default_img
                    });
                    JoinShopCar.then(function (e) {
                        console.log(e.data);
                        if(e.data.ret == "success"){
                            alert("成功加入购物车！");
                            $window.location.reload();
                        }else {
                            alert(e.data.msg)
                        }
                    },function (e) {
                        console.log(e)
                    });
                    $scope.colseAlerts();
                }
            }
            //立即购买
            if (j == 1){
                if(localStorage.getItem("tokens") == "" || localStorage.getItem("tokens") == undefined || localStorage.getItem("tokens") == null){
                    alert("登录超时或未登录，请重新登录！！！");
                }else if($scope.goodsDetail.finalColor == "" || $scope.goodsDetail.finalSize == ""){
                    alert("请选择颜色或尺寸");
                }else{
                    var dataArr={
                        token:$scope.goodsDetail.token,
                        goodsInfo:$scope.finalData(),
                        way:$scope.goodsDetail.ways,
                        totalPrice:$scope.goodsDetail.finalPrice,
                        totalPoint:$scope.goodsDetail.finalPoint
                    };
                    localStorage.setItem("datas",JSON.stringify(dataArr));
                    $state.go("clearing");
                }

            }
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
                goods_point:""
            };
            f_data.goods_types="颜色："+$scope.goodsDetail.finalColor+"，尺寸："+$scope.goodsDetail.finalSize
            f_data.goods_count=$scope.goodsDetail.finalNum;
            f_data.goods_id=$scope.goodsDetail.goods.goods_id;
            f_data.goods_img=$scope.goodsDetail.goods.default_img;
            f_data.goods_name=$scope.goodsDetail.goods.goods_name;
            f_data.goods_price=$scope.goodsDetail.t_price;
            f_data.goods_point=$scope.goodsDetail.t_integral;
            arr.push(f_data);
            return arr;
        };
        //获得购物车的商品数量
        if (localStorage.getItem("tokens")){
            var shopCarCount=appService._postData(URL+"index.php?s=/Api/Classify/cartCount",{
                token:localStorage.getItem("tokens"),
                way:localStorage.getItem("way"),
            });
            shopCarCount.then(function (e) {
                console.log(e.data);
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
        }

    }])