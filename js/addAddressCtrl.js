//添加收货地址页面 控制器
yx_mallApp
    .controller("addAddressController",["$scope","appService","$state",function ($scope,appService,$state) {
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
            token:localStorage.getItem("tokens"),
            z_tel:/^1[3|5|7|8]\d{9}$/,
            mail_num:"",
            isDef:false,
            def:0
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
                alert("名字不能为空！！！");
                return false;
            }
            //电话为空
            if (!$scope.info.tel){
                alert("电话不能为空！！！");
                return false;
            }
            //地区为空
            if (!$scope.area.address){
                alert("地区不能为空，请选择！！！");
                return false;
            }
            //详细地址为空
            if (!$scope.info.d_address){
                alert("详细地址为空！！！");
                return false;
            }
            //电话格式错误
            if ($scope.info.z_tel.test($scope.info.tel) == false){
                alert("电话格式错误！！！");
                return false;
            }
            if($scope.info.isDef){
                $scope.info.def = 1
            }else {
                $scope.info.def = 0
            }
            /* console.log($scope.info.token);
             console.log($scope.info.name);
             console.log($scope.info.tel);
             console.log($scope.area.address);
             console.log($scope.info.d_address);
             console.log($scope.info.def);*/
            var submit=appService._postData(URL+"index.php?s=/Api/User/addAddress",
                {
                    consignee:$scope.info.name,
                    phone_tel:$scope.info.tel,
                    region_name:$scope.area.address,
                    address:$scope.info.d_address,
                    token:localStorage.getItem("tokens"),
                    way:localStorage.getItem("way"),
                    type:$scope.info.def
                });
            submit.then(function (e) {
                console.log(e)
                if (e.data.data.code == 1){
                    alert("添加成功,请耐心等待....");
                    $state.go("myAttend")
                }else {
                    alert("网络超时，请稍后重试");
                    $state.go("myAttend");
                }
            },function (e) {
                console.log(e)
            })

        }
    }])