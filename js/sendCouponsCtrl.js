yx_mallApp
    .controller("sendCouponsController",["$scope","$state","appService","$window",function ($scope,$state,appService,$window){
        $scope.sc={
            userInfo:"",
            shopName:"",
            shopType:"",
            shopTypeNum:"",
            shopAddress:"",
            shopTel:"",
            shopImg:"",
            shopMoney:"",
            shopMoneyNum:"",
            shopRole:"",
            shopRole1:"",
            shopBegin:"",
            shopEnd:"",
            shopTypeShow:false,
            shopMoneyShow:false,
            tan:false,
            shopTypeList:[],
            shopMoneyList:[5,10,20,50,100,500,1000,3000,5000,10000,50000,100000],
            area:""
        };

        $scope.area={
            //初始化省份
            province:[],
            //初始化城市
            city:[],
            //初始化县区
            district:[],
            //初始化选择按钮
            choseProvince:"请选择",
            choseCity:"请选择",
            choseDistrict:"请选择",
            //初始化各项index值
            index_p:"",
            index_c:'',
            index_d:"",
            //初始化对应的class
            cls:true,
            cls1:false,
            cls2:false,
            //初始化选择的地方
            address:"",

        };
        $scope.sc.userInfo = JSON.parse(localStorage.getItem("userInfo"));
        var shopTypes =appService._getData(URL+"/index.php?s=/Api/Coupon/store_type");
        shopTypes.then(function (value) {
            $scope.sc.shopTypeList = value.data.data;
        },function (reason) {
            console.log(reason)
        });
        // 获取上次发送和数据
        var lastData = appService._postData(URL+"/index.php?s=/Api/Coupon/get_last_coupon",{
            token:$scope.sc.userInfo.token
        });
            lastData.then(function (value) {
                if (value.data.ret == "ok") {
                    $scope.sc.shopName = value.data.data.store_name;
                    $scope.sc.shopType =  value.data.data.type_name;
                    $scope.sc.shopTypeNum = value.data.data.type;
                    $scope.sc.area = value.data.data.area;
                    $scope.sc.shopAddress = value.data.data.address;
                    $scope.sc.shopTel = parseInt(value.data.data.phone);
                    $scope.sc.shopBegin =new Date(value.data.data.start_time);
                    $scope.sc.shopEnd = new Date(value.data.data.end_time);
                };

            },function (reason) {
                console.log(reason)
            })
        $scope.getShow=function (i) {
            switch (i) {
                case 0:
                    $scope.sc.tan = true;
                    $scope.sc.shopTypeShow = true;
                    break;
                case 1:
                    $scope.sc.tan = true;
                    $scope.sc.shopMoneyShow = true;
                    break;
                default:
                    return false;
            }

        };
        $scope.upMPic=function (w) {
            var file = w[0];
            //创建读取文件的对象
            var reader = new FileReader();
            //创建文件读取相关的变量
            var imgFile;
            //为文件读取成功设置事件
            reader.onload=function(e) {
                imgFile = e.target.result;
                $("#license").attr("src",imgFile);
                $scope.sc.shopImg = imgFile
            }
            //正式读取文件
            reader.readAsDataURL(file);
        }
        $scope.giveST=function (e,i) {
            switch (i) {
                case 0:
                    $scope.sc.shopType = e.cate_name;
                    $scope.sc.shopTypeNum = e.cate_id;
                    $scope.sc.tan = false;
                    $scope.sc.shopTypeShow = false;
                    break;
                case 1:
                    $scope.sc.shopMoney = e+"元";
                    $scope.sc.shopMoneyNum = e;
                    $scope.sc.tan = false;
                    $scope.sc.shopMoneyShow = false;
                    break;
                default:
                    return false;
            }
        };
        $scope.OJBK=function () {
            if ($scope.sc.shopName == ""){
                appService.artTxt("店铺名不能为空！");
                return false;
            };
            if ($scope.sc.shopType == "" || $scope.sc.shopType == undefined) {
                appService.artTxt("请选择店铺类型");
                return false;
            }
            if ($scope.sc.area == '') {
                appService.artTxt("请选择店铺地区！");
                return false;
            }
            if ($scope.sc.shopAddress == ""){
                appService.artTxt("店铺位置能为空！");
                return false;
            };
            if ($scope.sc.shopTel == "" || $scope.sc.shopTel == undefined){
                appService.artTxt("店铺电话能为空！");
                return false;
            };
            if ($scope.sc.shopImg == "" || $scope.sc.shopImg ==undefined) {
                appService.artTxt("请上传一张店铺图片");
                return false;
            }
            if ($scope.sc.shopMoney == ""){
                appService.artTxt("请选填写惠券金额！");
                return false;
            };
            if ($scope.sc.shopRole == ""){
                appService.artTxt("请填写优惠规则！");
                return false;
            };
            if ($scope.sc.shopRole1 == "") {
                appService.artTxt("请填写优惠规则！");
                return false;
            }
            if ($scope.sc.shopBegin == ""){
                appService.artTxt("请选择优惠起始时间！");
                return false;
            }else {
                $scope.sc.shopBegin = new Date($scope.sc.shopBegin).toLocaleDateString()
            }
            if ($scope.sc.shopEnd == ""){
                appService.artTxt("请选择优惠结束时间！");
                return false;
            }else {
                $scope.sc.shopEnd = new Date($scope.sc.shopEnd).toLocaleDateString()
            }

            var _sB =new Date($scope.sc.shopBegin).getTime(),
                _sO =new Date($scope.sc.shopEnd).getTime(),
                _sN = new Date().getTime();

            if (_sB-_sN <=0){
                appService.artTxt("请明天开始活动吧~给审核人员一点时间呢");
                return false;
            }
            if (_sO-_sB <= 0){
                appService.artTxt("怎么能结束时间比开始时间还早呢！！！");
                return false;
            }
            var okCoupons =appService._postData(URL+"index.php?s=/Api/Coupon/coupon_apply",{
                token:$scope.sc.userInfo.token,
                type:$scope.sc.shopTypeNum,
                store_name:$scope.sc.shopName,
                area:$scope.sc.area,
                address:$scope.sc.shopAddress,
                phone:$scope.sc.shopTel,
                money:$scope.sc.shopMoney,
                main_img:$scope.sc.shopImg,
                term:"满"+$scope.sc.shopRole+"抵扣"+$scope.sc.shopRole1+"积分",
                start_time:$scope.sc.shopBegin,
                end_time:$scope.sc.shopEnd
            });
            okCoupons.then(function (value) {
                if (value.data.ret == 'success') {
                    appService.artTxt(value.data.msg);
                    $window.history.go(-1);
                }else {
                    appService.artTxt(value.data.msg);
                    return false
                }
            },function (reason) {
                console.log(reason)
            })
        };

        $scope.procinceIdx;
        $scope.cityIdx;
        $scope.districtIdx;
        $scope.addArea=function () {
            $(".area_container").animate({
                top:"0"
            })
        };


        var select=appService._getData("lib/area.json");
        select.then(function (e) {
            $scope.area.province=e.data;
            $scope.changeProvince=function (index,province) {
                $scope.procinceIdx=index;
                $scope.cityIdx=-1;
                $scope.area.choseProvince=province;
                $scope.area.index_p=index;
                $scope.area.city=e.data[index].city;
                $scope.area.district=[];
                $scope.area.choseCity="请选择";
                $scope.area.choseDistrict="请选择";
                $scope.area.cls=false;
                $scope.area.cls1=true;
                $scope.area.cls2=false;
            };
            $scope.changeCity=function (index,city){
                $scope.cityIdx=index;
                $scope.districtIdx=-1;
                $scope.area.choseDistrict="请选择";
                $scope.area.choseCity=city;
                $scope.area.index_c=index;
                $scope.area.district=e.data[$scope.area.index_p].city[index].area;
                $scope.area.cls=false;
                $scope.area.cls1=false;
                $scope.area.cls2=true;
                $(".area_con").animate({
                    left:"-3.23rem"
                });

            };
            $scope.changeDistrict=function (index,district) {
                $scope.districtIdx=index;
                $scope.area.choseDistrict=district;
                $(".area_container").animate({
                    top:"100%"
                },100);
                $scope.area.address=$scope.area.choseProvince+" "+$scope.area.choseCity+" "+$scope.area.choseDistrict;
                $scope.sc.area = $scope.area.address
            };
            $scope.moves=function (idx) {
                $(".area_con").animate({
                    left:"0"
                });
                if (idx == 1){
                    $scope.area.cls=true;
                    $scope.area.cls1=false;
                    $scope.area.cls2=false;
                }else if (idx == 2){
                    $scope.area.cls=false;
                    $scope.area.cls1=true;
                    $scope.area.cls2=false;
                }
            };
            $scope.moves1=function (txt) {
                if (txt != "请选择"){
                    $(".area_con").animate({
                        left:"-3.23rem"
                    });
                    $scope.area.cls=false;
                    $scope.area.cls1=false;
                    $scope.area.cls2=true;
                };

            }
        },function (w) {
        });
        $scope.cancels=function () {
            var areas=$("#J_Address").val();
            if (areas == null || areas == ""){
                $scope.procinceIdx=-1;
                $scope.area.city=[];
                $scope.area.district=[];
                $scope.area.choseProvince="请选择"
                $scope.area.choseCity="请选择";
                $scope.area.choseDistrict="请选择";
                $scope.area.cls=true;
                $scope.area.cls1=false;
                $scope.area.cls2=false;
                $(".area_con").animate({
                    left:"0"
                });
            }
            $(".area_container").animate({
                top:"100%"
            },100);

        };

    }])
