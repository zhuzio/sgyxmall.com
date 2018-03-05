//我的页面--苏格时代商城用户 控制器
yx_mallApp
    .controller("myOldController",["$scope","appService","$state",function ($scope,appService,$state) {
        if(!localStorage.getItem("tokens")){
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

        };

        $scope.myOld.userInfo = JSON.parse(localStorage.getItem("userInfo"));
        //请求用户信息
        var oldUserInfo=appService._postData(URL+"index.php?s=api/User/userinfo",{token:$scope.myOld.userInfo.token,way:$scope.myOld.userInfo.way});
            oldUserInfo.then(function (e) {
                $scope.myOld.deg = e.data.data.type_sn;
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

       /* console.log([
            "                   _ooOoo_",
            "                  o8888888o",
            "                  88\" . \"88",
            "                  (| -_- |)",
            "                  O\\  =  /O",
            "               ____/`---'\\____",
            "             .'  \\\\|     |//  `.",
            "            /  \\\\|||  :  |||//  \\",
            "           /  _||||| -:- |||||-  \\",
            "           |   | \\\\\\  -  /// |   |",
            "           | \\_|  ''\\---/''  |   |",
            "           \\  .-\\__  `-`  ___/-. /",
            "         ___`. .'  /--.--\\  `. . __",
            "      .\"\" '<  `.___\\_<|>_/___.'  >'\"\".",
            "     | | :  `- \\`.;`\\ _ /`;.`/ - ` : | |",
            "     \\  \\ `-.   \\_ __\\ /__ _/   .-` /  /",
            "======`-.____`-.___\\_____/___.-`____.-'======",
            "                   `=---='",
            "^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^",
            "         佛祖保佑       永无BUG"
        ].join('\n'));*/
        //退出登录
        $scope.quitLogin=function () {
            localStorage.clear();
            $state.go("login")
        }
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
                way:$scope.myOld.userInfo.way
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
        }

    }])