//我的页面--苏格时代商城用户 控制器
yx_mallApp
    .controller("myOldController",["$scope","appService","$state","$window",function ($scope,appService,$state,$window) {
        if(!localStorage.getItem("userInfo")){
            $state.go("login");
        }
        document.title='苏格严选商城--我的';
        $scope.myOld={
            //用户名称
            username:"张三",
            //用户头像
            userHeadImg:"images/head.png",
            //用户积分
            userIntegral:"1000",
            userInfo:[],
            deg:"",
            bigQR:false,
            chose_up:false,
            upGrade:false,
            //针对不同的角色，渲染不同的东西；功能区
            func:{
                // 订单审核
                orderAudit:false,
                // 商家订单
                merchantOrder:false,
                // 商家审核
                merchantAudit:false,
            },
            //针对不同的角色，渲染不同的东西；服务区
            service:{
                //收款
                collection:false,
                // 购积分
                buyIntegral:false,
                // 发积分
                sendIntegral:false,
                // 货款
                payment:false,
                // 店铺设置
                shopSet:false
            },
            //商家收款二维码是否展示
            merchantQR:false,
            //商家收款二维码图片路径
            merchantQRUrl:"",
            returnTxt:[],

            roleType:"",
            // 用户注册二维码
            registerQRCode:"",

        };

        $scope.myOld.userInfo = JSON.parse(localStorage.getItem("userInfo"));
        //请求用户信息
        var oldUserInfo=appService._postData(URL+"index.php?s=api/User/userinfo",{
            token:$scope.myOld.userInfo.token,
            // way:$scope.myOld.userInfo.way
        });
            oldUserInfo.then(function (e) {
                console.log(e);
                $scope.myOld.roleType = e.data.data.type;
                $scope.myOld.deg = e.data.data.type_sn;
                $scope.myOld.registerQRCode = e.data.data.QR
                if (e.data.data.portrait == null || e.data.data.portrait == undefined){
                    $scope.myOld.userHeadImg = "images/head.png";
                }else {
                    $scope.myOld.userHeadImg = e.data.data.portrait;
                }

                var typeNum= parseInt(e.data.data.type);
                /*
                * 1 代表会员
                * 2 代表商家
                *
                * 4 代表区域代理
                * 5 代表县区代理
                * 6 代表市区代理
                * 7 代表省级代理
                * 88 代表财务人员
                * 99 代表管理人员
                *
                * */
                switch (typeNum){
                    case 1:
                        $scope.myOld.upGrade = true;
                        $(".mot_function >li").css("width","33.33%");
                        break;
                    case 2:
                        $scope.myOld.func.merchantOrder = true;
                        $scope.myOld.service.collection = true;
                        $scope.myOld.service.buyIntegral = true;
                        $scope.myOld.service.sendIntegral = true;
                        $scope.myOld.service.payment = true;
                        $scope.myOld.service.shopSet = true;
                        $(".mot_function >li").css("width","25%");
                        break;
                    case 4:
                        $(".mot_function >li").css("width","33.33%");
                        break;
                    case 5:
                        $scope.myOld.func.orderAudit = true;
                        $scope.myOld.func.merchantAudit = true;
                        $(".mot_function >li").css("width","20%");
                        break;
                }


            },function (reason) {
                console.log(reason)
            });

        //退出登录
        $scope.quitLogin=function () {
            localStorage.clear();
            $state.go("login")
        };
        //放大二维码
        $scope.bigQRcode=function () {
            $scope.myOld.bigQR = true;
        };
        //收起二维码
        $scope.disappearQR=function (idx) {
            switch (idx){
                case 1:
                    $scope.myOld.bigQR = false;
                    break;
                case 2:
                    $scope.myOld.merchantQR = false;
                    break;
            }

        };
        //选择升级
        $scope.choseUp=function () {
            $scope.myOld.chose_up = true;
        };
        //取消升级
        $scope.cancelUp=function () {
            $scope.myOld.chose_up = false;
        };
        //获取商家收款二维码
        $scope.getMerchantQR=function () {
            var getMerchantQR= appService._postData(URL+"index.php?s=Api/shop_center1/pay_barcode",{
                token:$scope.myOld.userInfo.token,
                // way:$scope.myOld.userInfo.way
            });
                getMerchantQR.then(function (value) {
                    if (value.data.ret="ok"){
                        $scope.myOld.merchantQRUrl=value.data.data;
                        $scope.myOld.merchantQR = true;
                    }else {
                        alert(value.data.msg);
                        return false;
                    }

                },function (reason) {
                    console.log(reason)
                })
        };
        //扫一扫
        var getSingPackage=appService._postData(URL+"index.php?s=Api/shop_center1/getSignPackge",{
            // way:$scope.myOld.userInfo.way,
            url:"wap/index.html#/tabs_myOld"
        });
            getSingPackage.then(function (value) {
                //console.log(value.data.msg);
                $scope.wxInit=function () {
                    wx.config({
                        debug: false,
                        appId: value.data.msg.appId,
                        timestamp: value.data.msg.timestamp,
                        nonceStr: value.data.msg.nonceStr,
                        signature: value.data.msg.signature,
                        jsApiList:[
                            'scanQRCode',
                        ]
                    });
                    wx.ready(function () {
                        // 在这里调用 API
                        /*wx.checkJsApi({
                            jsApiList: ['scanQRCode'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
                            success: function (res) {
                                //alert("aaaaa")
                                // 以键值对的形式返回，可用的api值true，不可用为false
                                // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
                            }
                        });
                        wx.onMenuShareAppMessage({
                            title: f_title,
                            desc: f_desc,
                            link: link,
                            imgUrl: f_img,//自定义图片地址
                            trigger: function (res) {
                                alert('用户点击发送给朋友');
                            },
                            success: function (res) {
                                alert('已分享');
                            },
                            cancel: function (res) {
                                alert('已取消');
                            },
                            fail: function (res) {
                                alert(JSON.stringify(res));
                            }
                        });
                         wx.error(function(res){

                        alert(res.errMsg);
                         });*/
                    });
                   
                };
                $scope.wxInit();
            },function (reason) {
                console.log(reason)
            });
            $scope.wxScrn=function () {
            wx.scanQRCode({
                needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                success: function (res) {
                    if (res.errMsg === "scanQRCode:ok"){
                       var scan=appService._postData(res.resultStr,{
                           // way:$scope.myOld.userInfo.way
                       });
                            scan.then(function (value) {
                                $scope.myOld.returnTxt = value;
                                if(value.data.ret == "ok"){
                                    localStorage.setItem("weChatScan",JSON.stringify(value.data.data));
                                    $state.go("scanApply");
                                }else {
                                    alert(value.data.msg);
                                    return false;
                                }
                            },function (reason) {
                                console.log(reason)
                            })
                    }



                    /*
                    var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                    if(result.data.url == 'saoyisao.html'){
                        localStorage.setItem('sys_data',JSON.stringify(result.data));
                        location.href = result.data.url;
                    }
                    */
                },
                error:function (e) {
                    alert('调用失败')
                }
            });
        };

        // 升级 市场经理
        $scope.upGradeKind=function () {
            var upGradeKind = appService._postData(URL+"index.php?s=Api/userset/upgrade",{
                token:$scope.myOld.userInfo.token,
                // way:$scope.myOld.userInfo.way,
                type:4
            });
                upGradeKind.then(function (value) {
                    console.log(value)
                    if (value.data.ret == "success"){
                        appService.artTxt(value.data.msg).then(function (value2) {
                            $scope.myOld.chose_up = false;
                        });
                    }else {
                        appService.artTxt(value.data.msg).then(function (value2) {
                            $scope.myOld.chose_up = false;
                        });
                    }
                },function (reason) {
                    console.log(reason)
                })
        };
        // 物流查询
        $scope.logisticsSelect=function () {
            $window.location.href = "https://m.kuaidi100.com/";
        }





    }])