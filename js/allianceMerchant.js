//联盟商家 控制器
yx_mallApp
	.controller("allianceMerchantController",["$scope","appService","$stateParams","$state",function ($scope,appService,$stateParams,$state) {
    document.title="联盟商家";
    $scope.index={
        //联盟轮播图
        swipers:[],
        //分类
        classif:[],
        //附近商家
        shop:[],
        locate:"定位中....",
        lon:"",
        lat:"",

        page:1,
        more:true

    };



    //首页轮播图 数据请求
    var swipers=appService._postData(URL+"index.php?s=/Api/store/ad",{});
    swipers.then(function (e) {
//		                 console.log(e)

        $scope.index.swipers=e.data.data;
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
        },0)
    },function (e) {
        console.log(e)
    });

//      var myCache1=  $cacheFactory("cache");
//       if(myCache1.get("city")){
//			$scope.index.locate=myCache1.get("city");
//		}
    if(sessionStorage.getItem("city")){
        $scope.index.locate=sessionStorage.getItem("city");
    }else{



        //	定位操作
        var map, geolocation;
        map = new AMap.Map('', {
            resizeEnable: true,
        });
        map.plugin('AMap.Geolocation', function() {
            geolocation = new AMap.Geolocation({
                enableHighAccuracy: true,//是否使用高精度定位，默认:true
                timeout: 10000,          //超过10秒后停止定位，默认：无穷大
                buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                buttonPosition:'RB'
            });
            map.addControl(geolocation);
            geolocation.getCurrentPosition();
            AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
        });

        //解析定位结果
        var keys=[],values=[];
        function onComplete(data) {

            //     获取的城市赋值给div
//	    document.getElementsByClassName("alliance-address")[0].innerHTML=data.addressComponent.city;
            $scope.index.locate=data.addressComponent.city;


            $scope.index.lon =data.position.getLng();//经度
            $scope.index.lat= data.position.getLat();//纬度
            $scope.$apply();
//	        myCache1.put('lon',lon);
//	        myCache1.put('lat',lat);
//	        myCache1.put('city',data.addressComponent.city);
            sessionStorage.setItem('lon', $scope.index.lon);
            sessionStorage.setItem('lat',$scope.index.lat);
            sessionStorage.setItem('city',data.addressComponent.city);

            console.log($scope.index.lon);

        }


    }

    //附近商家数据 数据请求
    var shop=appService._postData(URL+"index.php?s=/Api/store/nearby_shops",{page:$scope.index.page,lon:sessionStorage.getItem("lon"),lat:sessionStorage.getItem("lat")});
    shop.then(function (e) {
        console.log(e);
        $scope.index.shop=e.data.data;
        setTimeout(function () {   },0)



    },function (e) {
        console.log(e)
    });



    function scrollFn(){
        //真实内容的高度
        var pageHeight = Math.max(document.body.scrollHeight,document.body.offsetHeight);
        //视窗的高度
        var viewportHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0;
        //隐藏的高度
        var scrollHeight = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        if( pageHeight - viewportHeight - scrollHeight <= 10){	//如果满足触发条件，执行
            $(".addMore").css("display","block");
            if ($scope.index.more){
                $scope.index.more = false;
                $scope.index.page=$scope.index.page+1;
                var moreLike=appService._postData(URL+"index.php?s=/Api/store/nearby_shops",{page:$scope.index.page,lon:sessionStorage.getItem("lon"),lat:sessionStorage.getItem("lat")})
                moreLike.then(function (e) {
                    if(e.data.data == "" ){
                        $(".addMore").html("没有更多了...")
                    }else {
                        for (var i in e.data.data){
                            console.log(e);
                            $scope.index.shop.push((e.data.data)[i]);
                        }
                        $scope.index.more=true;
                    }

                },function (e) {
                    console.log(e)
                })
            }

        }
    }

    $(window).bind("scroll",scrollFn);	//绑定滚动事件








}])
