yx_mallApp
    .controller("upToMerchantController",["$scope","appService","$state",function ($scope,appService,$state) {
        $scope.upToMerchant={
            // 用户信息
            userInfo:[],
            //店铺名称
            merchantName:"",
            //店铺详细位置
            merchantArea:"",
            //经度
            merchantLng:"",
            //纬度
            merchantLat:"",
            //店铺分类：
            merchantClass:"",
            //店铺分类编码
            merchantClassNum:"",
            //店铺分类集合
            merchantArr:[],
            //联系电话
            merchantsTel:"",
            //验证码
            ZCode:"",
            //显示分类
            weaMC:false,
            //营业执照路径
            licenseWay:"",
            //商铺logo路径
            logoWay:"",
            //营业展示1
            singleWay1:"",
            //营业展示2
            singleWay2:"",
            //营业展示3
            singleWay3:"",
            //初始化店铺简介
            mProduct:"听说好的店铺介绍可以吸引更多的人呢!但是最多200个字哦",
            //初始化店铺活动
            mActive:"请输入您的店铺活动",
            //协议渲染
            weaUMAgreement:false,
            //是否同意协议
            weaAgreementY:false,
            //是否提交一次
            HaveSub:false,
            subTxt:"提交"
        };
        $scope.upToMerchant.userInfo =JSON.parse(localStorage.getItem("userInfo"));
        $scope.area={
            //初始化省份
            province:[],
            //初始化城市
            city:[],
            //初始化县区
            district:[],
            //初始化省市县的代码编号

            //初始化选择按钮
            choseProvince:"请选择",
            choseCity:"请选择",
            choseDistrict:"请选择",
            //初始化各项index值
            proNum:"",
            cityNum:"",
            disNum:"",



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
        var select=appService._postData(URL+"index.php?s=Api/address/address",{});
            select.then(function (e) {

            $scope.area.province=e.data.data;
            $scope.changeProvince=function (index,province) {
                $scope.procinceIdx=index;
                $scope.cityIdx=-1;
                $scope.area.choseProvince=province.name;
                $scope.area.proNum = province.id;
                $scope.area.index_p=index;
                $scope.area.district=[];
                $scope.area.choseCity="请选择";
                $scope.area.choseDistrict="请选择";
                $scope.area.cls=false;
                $scope.area.cls1=true;
                $scope.area.cls2=false;
                //点击省份获取市区
                var nowCity=appService._postData(URL+"index.php?s=Api/address/address",{id:province.id});
                    nowCity.then(function (value) {
                        $scope.area.city=value.data.data;
                    },function (reason) {
                        console.log(reason)
                    })
            };
           $scope.changeCity=function (index,city){
                $scope.cityIdx=index;
                $scope.districtIdx=-1;
                $scope.area.choseDistrict="请选择";
                $scope.area.choseCity=city.name;
                $scope.area.cityNum = city.id;
                $scope.area.index_c=index;
               //点击市区获取县区
               var nowArea=appService._postData(URL+"index.php?s=Api/address/address",{id:city.id});
               nowArea.then(function (value) {
                   $scope.area.district=value.data.data;
               },function (reason) {
                   console.log(reason)
               });
                $scope.area.cls=false;
                $scope.area.cls1=false;
                $scope.area.cls2=true;
                $(".area_con").animate({
                    left:"-3.23rem"
                });


            };
            $scope.changeDistrict=function (index,district) {
                $scope.districtIdx=index;
                $scope.area.choseDistrict=district.name;
                $scope.area.disNum = district.id;
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
        //获取商铺分类
        $scope.getMClass=function () {
            $scope.upToMerchant.weaMC = true ;
            var getMClass = appService._getData(URL+"index.php?s=Api/Collection/shopclass");
                getMClass.then(function (value) {
                    $scope.upToMerchant.merchantArr = value.data.data;
                },function (reason) {
                    console.log(reason)
                })
        };
        $scope.getMerchantClass=function (ele) {
            $scope.upToMerchant.merchantClass = ele.cate_name;
            $scope.upToMerchant.merchantClassNum = ele.cate_id;
            $scope.upToMerchant.weaMC = false ;
        };
        //上传图片
        $scope.upMPic=function (w,idx) {
            var file = w[0];
            //创建读取文件的对象
            var reader = new FileReader();
            //创建文件读取相关的变量
            var imgFile;
            //为文件读取成功设置事件
            reader.onload=function(e) {
                imgFile = e.target.result;
                switch (idx){
                    case 1:
                        $("#license").attr("src",imgFile);
                        $("#licBox").css("background","none").find("p").css("display","none");
                        $scope.upToMerchant.licenseWay = imgFile;
                        break;
                    case 2:
                        $("#logo").attr("src",imgFile);
                        $("#logoBox").css("background","none").find("p").css("display","none");
                        $scope.upToMerchant.logoWay = imgFile;
                        break;
                    case 3:
                        $("#single1").attr("src",imgFile);
                        $("#si1").css("background","none").find("p").css("display","none");
                        $scope.upToMerchant.singleWay1 = imgFile;
                        break;
                    case 4:
                        $("#single2").attr("src",imgFile);
                        $("#si2").css("background","none").find("p").css("display","none");
                        $scope.upToMerchant.singleWay2 = imgFile;
                        break;
                    case 5:
                        $("#single3").attr("src",imgFile);
                        $("#si3").css("background","none").find("p").css("display","none");
                        $scope.upToMerchant.singleWay3 = imgFile;
                        break;

                }
            };
            //正式读取文件
            reader.readAsDataURL(file);

        };
        //写简介
        $scope.writePro=function (i) {
            switch (i){
                case 1:
                    if ($scope.upToMerchant.mProduct == "听说好的店铺介绍可以吸引更多的人呢!但是最多200个字哦"){
                        $scope.upToMerchant.mProduct = "";
                    };
                    break;
                case 2:
                    if ($scope.upToMerchant.mActive == "请输入您的店铺活动"){
                        $scope.upToMerchant.mActive = "";
                    };
                    break;
            }
        }

        //地图查询
        $scope.getBaiDuMap=function () {
            $(".maps_container").animate({
                top:0
            },300);
        }
        var tels=/^1[3|5|7|8]\d{9}$/;
        var map = new BMap.Map("container");
        var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
            {"input" : "text_"
                ,"location" : map
            });
        ac.addEventListener("onhighlight", function(e) {  //鼠标放在下拉列表上的事件
            var str = "";
            var _value = e.fromitem.value;
            var value = "";
            if (e.fromitem.index > -1) {
                value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
            }
            str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;
            value = "";
            if (e.toitem.index > -1) {
                _value = e.toitem.value;
                value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
            }
            str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
            ("searchResultPanel").innerHTML = str;
        });
        map.centerAndZoom("南阳", 12);
        map.enableScrollWheelZoom();    //启用滚轮放大缩小，默认禁用
        map.enableContinuousZoom();    //启用地图惯性拖拽，默认禁用
        map.addControl(new BMap.NavigationControl());  //添加默认缩放平移控件
        map.addControl(new BMap.OverviewMapControl()); //添加默认缩略地图控件
        map.addControl(new BMap.OverviewMapControl({ isOpen: true, anchor: BMAP_ANCHOR_BOTTOM_RIGHT }));   //右下角，打开
        var localSearch = new BMap.LocalSearch(map);
        localSearch.enableAutoViewport(); //允许自动调节窗体大小
        $scope.searchByStationName=function () {
            map.clearOverlays();//清空原来的标注
            var keyword = document.getElementById("text_").value;
            localSearch.setSearchCompleteCallback(function (searchResult) {
                var poi = searchResult.getPoi(0);
                document.getElementById("result_").value = poi.point.lng + "," + poi.point.lat;
                map.centerAndZoom(poi.point, 13);
                var marker = new BMap.Marker(new BMap.Point(poi.point.lng, poi.point.lat));  // 创建标注，为要查询的地方对应的经纬度
                map.addOverlay(marker);
                var content = document.getElementById("text_").value + "<br/><br/>经度：" + poi.point.lng + "<br/>纬度：" + poi.point.lat;
                var infoWindow = new BMap.InfoWindow("<p style='font-size:14px;'>" + content + "</p>");
                marker.addEventListener("click", function () { this.openInfoWindow(infoWindow); });
                // marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
            });
            localSearch.search(keyword);
            $scope.getDeailAddress=function () {
                $scope.upToMerchant.merchantArea = $("#text_").val()
                $scope.upToMerchant.merchantLng = ($("#result_").val()).split(",")[0];
                $scope.upToMerchant.merchantLat = ($("#result_").val()).split(",")[1];
                $(".maps_container").animate({
                    top:"100%"
                },300);
            }

        };
        //阅读协议
        $scope.readAgreement=function () {
            $scope.upToMerchant.weaUMAgreement = true;
        };
        //知道协议
        $scope.uMAY=function () {
            $scope.upToMerchant.weaUMAgreement = false;
        }
        //提交
        $scope.upToMerchantSub=function () {
            if (!$scope.upToMerchant.merchantName){
                alert("店铺名称不能为空！！！");
                return false;
            };
            if (!$scope.area.address){
                alert("店铺位置不能为空！！！");
                return false;
            };
            if (!$scope.upToMerchant.merchantArea){
                alert("店铺详细位置不能为空！！！");
                return false;
            };
            if (!$scope.upToMerchant.merchantClass){
                alert("店铺分类不能为空！！！");
                return false;
            };
            if (!$scope.upToMerchant.merchantsTel || tels.test($scope.upToMerchant.merchantsTel) == false){
                alert("联系电话不能为空或电话号码格式错误！！！");
                return false;
            };
            if (!$scope.upToMerchant.ZCode){
                alert("验证码不能为空！！！");
                return false;
            };
            if (!$scope.upToMerchant.licenseWay){
                alert("请上传营业执照！！！");
                return false;
            };
            if (!$scope.upToMerchant.logoWay){
                alert("请上传店铺标志！！！");
                return false;
            };
            if (!$scope.upToMerchant.singleWay1){
                alert("至少三店铺展示图");
                return false;
            };
            if (!$scope.upToMerchant.singleWay2){
                alert("至少三店铺展示图");
                return false;
            };
            if (!$scope.upToMerchant.singleWay3){
                alert("至少三店铺展示图");
                return false;
            };
            if ($scope.upToMerchant.mProduct == "听说好的店铺介绍可以吸引更多的人呢!但是最多200个字哦"){
                $scope.upToMerchant.mProduct = "";
            };
            if ($scope.upToMerchant.mActive == "请输入您的店铺活动"){
                $scope.upToMerchant.mActive = "";
            }
            if (!$scope.upToMerchant.weaAgreementY || $scope.upToMerchant.weaAgreementY == false){
                alert("请先同意店铺协议！！！");
                return false;
            };
            $scope.upToMerchant.subTxt = "已提交，请稍等...";
            $scope.upToMerchant.HaveSub = true;

            var upToMerchantSub=appService._postData(URL+"index.php?s=Api/Collection/shopupgrade",{
                token:$scope.upToMerchant.userInfo.token,
                way:$scope.upToMerchant.userInfo.way,
                store_name:$scope.upToMerchant.merchantName,
                o2o:"offline",
                cate_id:$scope.upToMerchant.merchantClassNum,
                store_banner:$scope.upToMerchant.licenseWay,
                store_logo:$scope.upToMerchant.logoWay,
                image_1:$scope.upToMerchant.singleWay1,
                image_2:$scope.upToMerchant.singleWay2,
                image_3:$scope.upToMerchant.singleWay3,
                province:$scope.area.proNum,
                city:$scope.area.cityNum,
                area:$scope.area.disNum,
                address:$scope.upToMerchant.merchantArea,
                lat:$scope.upToMerchant.merchantLat,
                lng:$scope.upToMerchant.merchantLng,
                tel1:$scope.upToMerchant.merchantsTel,
                tel2:"",
                description:$scope.upToMerchant.mProduct,
                activity:$scope.upToMerchant.mActive,
                region_name:$scope.area.address
            });
                upToMerchantSub.then(function (value) {
                    console.log(value);
                    if (value.data.ret == "success"){
                        alert("申请成功，请等待审核...");
                        $state.go("tabs.myOld");
                    }else {
                        alert(value.data.msg);
                    }
                },function (reason) {
                    console.log(reason)
                })
        }
    }])