//添加收货地址页面 控制器
yx_mallApp
    .controller("addAddressController",["$scope","appService","$stateParams","$state","$window",function ($scope,appService,$stateParams,$state,$window) {
        document.title="添加信息";

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

        $scope.procinceIdx;
        $scope.cityIdx;
        $scope.districtIdx;
        $scope.addArea=function () {
            $(".area_container").animate({
                top:"0"
            })
        };
        $scope.info={
            name:"",
            tel:"",
            d_address:"",
            token:JSON.parse(localStorage.getItem("userInfo")).token,
            z_tel:/^1[3|5|7|8]\d{9}$/,
            mail_num:"",
            isDef:false,
            def:0,
            addr_id:"",
            adsTitle:"添加收货地址",
            btnTxt:"确认添加"
        };
        if ($stateParams.url == "modify"){
            document.title = '修改收货地址';
            $scope.info.adsTitle = '修改收货地址';
            $scope.info.btnTxt = "确认修改";
            var modifyAds = JSON.parse(localStorage.getItem("choseAds"));
            $scope.info.name = modifyAds.consignee;
            $scope.info.tel = parseInt(modifyAds.phone_tel);
            $scope.area.address = modifyAds.region_name;
            $scope.info.d_address = modifyAds.address;
            $scope.info.addr_id = modifyAds.addr_id;
            $scope.info.mail_num = modifyAds.region_id;
            if (modifyAds.type == "1" || modifyAds.type == 1){
                $scope.info.isDef = true;
            }else {
                $scope.info.isDef = false;
            };
        }
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
        $scope.submitData=function () {
            //名字为空
            if (!$scope.info.name){
                appService.artTxt("名字不能为空！！！");
                return false;
            }
            //电话为空
            if (!$scope.info.tel){
                appService.artTxt("电话不能为空！！！");
                return false;
            }
            //地区为空
            if (!$scope.area.address){
                appService.artTxt("地区不能为空，请选择！！！");
                return false;
            }
            //详细地址为空
            if (!$scope.info.d_address){
                appService.artTxt("详细地址为空！！！");
                return false;
            }
            //电话格式错误
            if ($scope.info.z_tel.test($scope.info.tel) == false){
                appService.artTxt("电话格式错误！！！");
                return false;
            }

            //邮编为空
            if (!$scope.info.d_address){
                appService.artTxt("邮编为空！！！");
                return false;
            }
            if($scope.info.isDef){
                $scope.info.def = 1
            }else {
                $scope.info.def = 0
            };
            if ($stateParams.url == "modify"){
                var modifySubmit=appService._postData(URL+"index.php?s=Api/User/editAddress",
                    {
                        consignee:$scope.info.name,
                        phone_tel:$scope.info.tel,
                        region_name:$scope.area.address,
                        region_id:$scope.info.mail_num,
                        address:$scope.info.d_address,
                        token:JSON.parse(localStorage.getItem("userInfo")).token,
                        // way:localStorage.getItem("way"),
                        type:$scope.info.def,
                        addr_id:$scope.info.addr_id
                    });
                    modifySubmit.then(function (e) {
                    console.log(e)
                    if (e.data.ret == "success"){
                        appService.artTxt(e.data.msg).then(function (value) {
                            $state.go("address");
                        })
                    }else {
                       appService.artTxt(e.data.msg);
                    }
                },function (e) {
                    console.log(e)
                })
            }else if ($stateParams.url == "clearing"){
                var submit=appService._postData(URL+"index.php?s=/Api/User/addAddress",
                    {
                        consignee:$scope.info.name,
                        phone_tel:$scope.info.tel,
                        region_name:$scope.area.address,
                        region_id:$scope.info.mail_num,
                        address:$scope.info.d_address,
                        token:JSON.parse(localStorage.getItem("userInfo")).token,
                        // way:localStorage.getItem("way"),
                        type:$scope.info.def
                    });
                submit.then(function (e) {
                    console.log(e)
                    if (e.data.ret == "success"){
                        appService.artTxt(e.data.msg).then(function (value) {
                           $window.history.go(-1);
                        });
                    }else {
                        appService.artTxt(e.data.msg)
                    }
                },function (e) {
                    console.log(e)
                })
            }else {
                var submit=appService._postData(URL+"index.php?s=/Api/User/addAddress",
                    {
                        consignee:$scope.info.name,
                        phone_tel:$scope.info.tel,
                        region_name:$scope.area.address,
                        region_id:$scope.info.mail_num,
                        address:$scope.info.d_address,
                        token:JSON.parse(localStorage.getItem("userInfo")).token,
                        // way:localStorage.getItem("way"),
                        type:$scope.info.def
                    });
                submit.then(function (e) {
                    console.log(e)
                    if (e.data.ret == "success"){
                        appService.artTxt(e.data.msg).then(function (value) {
                            $state.go("address");
                        });
                    }else {
                        appService.artTxt(e.data.msg)
                    }
                },function (e) {
                    console.log(e)
                })
            }


        };

    }])