yx_mallApp
    .controller("couponsController",["$scope","$state","appService",function ($scope,$state,appService) {
        document.title = '优惠券'
        $scope.coupons={
            userInfo:"",
            couponsList:[],
            shopTypeList1:[],
            shopTypeList2:[],
            shopType:"",
            st1:-1,
            st2:-1,
            noData:false,
            proTxt:"--请选择--",
            proTxt1:"",
            proBox:[],
            proIndex:"",
            cityTxt:"--请选择--",
            cityTxt1:"",
            cityBox:[],
            cityIndex:"",
            disTxt:"--请选择--",
            disTxt1:"",
            disBox:[],
        };
        $scope.coupons.userInfo =  JSON.parse(localStorage.getItem("userInfo"))
        var shopTypes =appService._getData(URL+"/index.php?s=/Api/Coupon/store_type");
        shopTypes.then(function (value) {
            for (var i = 0; i<4;i++){
                $scope.coupons.shopTypeList1.push((value.data.data)[i])
            };
            for (var i = 4; i<value.data.data.length;i++){
                $scope.coupons.shopTypeList2.push((value.data.data)[i])
            };

        },function (reason) {
            console.log(reason)
        })
        var coupons = appService._getData(URL+"/index.php?s=/Api/Coupon/get_all_coupon");
        coupons.then(function (value) {
            var noDatas = value.data.data==undefined||value.data.data==''||value.data.data==null;
            if (noDatas) {
                $scope.coupons.noData = true;
            }else {
                $scope.coupons.couponsList = value.data.data;
                console.log($(".cpiR").length)
            }

        },function (reason) {
            console.log(reason)
        });
        $scope.showType = function (e) {
            $(".drop").toggleClass("dropOn");
            var _idx = $(".drop").attr("class").indexOf("dropOn");
            if (_idx == -1){
                $(".couponsHeadList").animate({
                    height:"0",
                    opacity:"0"
                },500);
                $(".classNameY").animate({
                    opacity:"0"
                },500).css("display","none");
            }else {
                $(".couponsHeadList").animate({
                    height:"4rem",
                    opacity:"1"
                },500);
                $(".classNameY").animate({
                    opacity:"1"
                },500).css("display","inline-block");
            }
        };
        $scope.getCoupons=function (e,idx,i) {
            $scope.coupons.shopType = e.cate_id;
            switch (i){
                case 0:
                    $scope.coupons.st1 = idx;
                    $scope.coupons.st2 = -1
                    break;
                case 1:
                    $scope.coupons.st2 = idx;
                    $scope.coupons.st1 = -1;
                    break;
                default:
                    return false;
            };
            $(".drop").removeClass("dropOn");
            $(".couponsHeadList").animate({
                height:"0",
                opacity:"0"
            },500);
            $(".classNameY").animate({
                opacity:"0"
            },500).css("display","none");
            if ($scope.coupons.proTxt == "--请选择--") {
                $scope.coupons.proTxt1 = "";
            }else {
                $scope.coupons.proTxt1 = $scope.coupons.proTxt;
            };
            if ($scope.coupons.cityTxt == "--请选择--") {
                $scope.coupons.cityTxt1 = "";
            }else {
                $scope.coupons.cityTxt1 = $scope.coupons.cityTxt;
            };
            if ($scope.coupons.disTxt == "--请选择--") {
                $scope.coupons.disTxt1 = "";
            }else {
                $scope.coupons.disTxt1 = $scope.coupons.disTxt;
            };
            var getCouponsList = appService._postData(URL+"/index.php?s=/Api/Coupon/get_type_coupon",{
                type:e.cate_id,
                area:$scope.coupons.proTxt1+" "+$scope.coupons.cityTxt1+" "+$scope.coupons.disTxt1
            });
                getCouponsList.then(function (value) {
                    var noDatas = value.data.data==undefined||value.data.data==''||value.data.data==null;
                    if (noDatas){
                        $scope.coupons.couponsList = [];
                        $scope.coupons.noData = true;
                        appService.artTxt(value.data.msg);
                        return false;
                    }else {
                        $scope.coupons.noData = false;
                        $scope.coupons.couponsList = value.data.data;
                    }
                },function (reason) {
                    console.log(reason)
                })
        };
        $scope.getItNow=function (e) {
            appService.conform("确定支付"+e.money+"积分购买?").then(function (value) {
                var buyIt =appService._postData(URL+"/index.php?s=/Api/Coupon/member_buy_coupon",{
                    token:$scope.coupons.userInfo.token,
                    coupon_id:e.id
                });
                buyIt.then(function (value2) {
                    if (value2.data.ret == "success") {
                        appService.artTxt(value2.data.msg).then(function (value3) {
                            $state.go("myCoupons");
                        })
                    }else {
                        appService.artTxt(value2.data.msg);
                        return false;
                    }
                },function (reason) {
                    console.log(reason)
                })
            },function (reason) {
                appService.artTxt("取消购买成功")
            })
        };
        $scope.getCouponAddress=function (idx) {
            switch (idx) {
                case 0:
                    var _area = appService._getData("lib/area.json");
                        _area.then(function (value) {
                            $scope.coupons.proBox = value.data;
                        });
                    $(".getPro").animate({
                        height:"8rem",
                        opacity:"1"
                    },500);
                    $(".getCity").animate({
                        height:"0rem",
                        opacity:"0"
                    },500);
                    $(".getDis").animate({
                        height:"0rem",
                        opacity:"0"
                    },500);
                    break;
                case 1:
                    if ($scope.coupons.proIndex == "") {
                        appService.artTxt("请先选择省份！").then(function (value) {
                            return false;
                        });
                    } else {
                        $scope.coupons.cityBox =$scope.coupons.proBox[$scope.coupons.proIndex].city;
                        var _cityLen = $scope.coupons.cityBox.length,
                            _cityHeight;
                        if (_cityLen >= 12) {
                            _cityHeight = 8
                        }else {
                            _cityHeight = _cityLen*0.7
                        };
                        $(".getPro").animate({
                            height:"0",
                            opacity:"0"
                        },500);
                        $(".getCity").animate({
                            height:_cityHeight+"rem",
                            opacity:"1"
                        },500);
                    }
                    break;
                case 2:
                    if ($scope.coupons.cityIndex == "") {
                        appService.artTxt("请先选择市区！").then(function (value) {
                            return false;
                        });
                    } else {
                        $scope.coupons.disBox = $scope.coupons.proBox[$scope.coupons.proIndex].city[$scope.coupons.cityIndex].area;
                        var _disLen = $scope.coupons.disBox.length,
                            _disHeight;
                        if (_disLen >= 12) {
                            _disHeight = 8
                        }else {
                            _disHeight = _disLen*0.7
                        };
                        $(".getCity").animate({
                            height:"0rem",
                            opacity:"0"
                        },500);
                        $(".getDis").animate({
                            height:_disHeight+"rem",
                            opacity:"1"
                        },500);
                    }
                    break;
            }
        };
        $scope.getAddressName = function (idx,i,txt) {
            switch (i) {
                case 0:
                    $scope.coupons.proTxt = txt;
                    $scope.coupons.cityTxt = "--请选择--";
                    $scope.coupons.disTxt = "--请选择--";
                    $scope.coupons.proIndex = idx;
                    $scope.coupons.cityBox =$scope.coupons.proBox[idx].city;
                    var _cityLen = $scope.coupons.cityBox.length,
                        _cityHeight;
                    if (_cityLen >= 12) {
                        _cityHeight = 8
                    }else {
                        _cityHeight = _cityLen*0.7
                    };
                    $(".getPro").animate({
                        height:"0",
                        opacity:"0"
                    },500);
                    $(".getCity").animate({
                        height:_cityHeight+"rem",
                        opacity:"1"
                    },500);
                    break;
                case 1:
                    $scope.coupons.cityTxt = txt;
                    $scope.coupons.disTxt = "--请选择--";
                    $scope.coupons.cityIndex = idx;
                    $scope.coupons.disBox = $scope.coupons.proBox[$scope.coupons.proIndex].city[idx].area;
                    var _disLen = $scope.coupons.disBox.length,
                        _disHeight;
                    if (_disLen >= 12) {
                        _disHeight = 8
                    }else {
                        _disHeight = _disLen*0.7
                    };
                    $(".getCity").animate({
                        height:"0rem",
                        opacity:"0"
                    },500);
                    $(".getDis").animate({
                        height:_disHeight+"rem",
                        opacity:"1"
                    },500);
                    break;
                case 2:
                    $scope.coupons.disTxt = txt;
                    $(".getDis").animate({
                        height:"0rem",
                        opacity:"0"
                    },500);
                    break;
            }
        };
        $scope.getCouponsAddressButton=function () {
            if ($scope.coupons.proTxt == "--请选择--") {
                appService.artTxt("请选择省份！！！！！");
                return false;
            };
            if ($scope.coupons.cityTxt == "--请选择--") {
                appService.artTxt("请选择市区！！！！！");
                return false;
            };
            if ($scope.coupons.disTxt == "--请选择--") {
                appService.artTxt("请选择地区！！！！！");
                return false;
            };
            var choseAddress =appService._postData(URL+"/index.php?s=/Api/Coupon/get_type_coupon",{
                area:$scope.coupons.proTxt+" "+$scope.coupons.cityTxt+" "+$scope.coupons.disTxt,
                type:$scope.coupons.shopType
            });
                choseAddress.then(function (value) {
                    console.log(value)
                    $scope.coupons.couponsList = [];
                    var noDatas = value.data.data==undefined||value.data.data==''||value.data.data==null;
                    if(noDatas){
                        $scope.coupons.noData = true;
                    }else {
                        $scope.coupons.noData = false;
                        $scope.coupons.couponsList = value.data.data;
                    }
                },function (reason) {
                    console.log(reason)
                })
        }
    }])