//登录页面 控制器
/*(function () {

})*/
yx_mallApp
.controller("loginController",["$scope","appService","$state","$window",function ($scope,appService,$state,$window) {
        if(localStorage.getItem("tokens")){
            $state.go("tabs.index");
        }
        $scope.login={
            yl:true,
            sl:false,
            name:"",
            psd:"",
            way:"",
            z_tel:/^1[3|5|7|8]\d{9}$/,
            _height:window.innerHeight,
            errorMsg:"",
            errorShow:false,
            dsb:true,
            psdDis:true,
            btnTxt:"苏格时代登录"
        };
        //切换登录的方式：苏格时代登录/苏格优选登录
        $scope.changLogin=function (n) {
            $scope.login.name = "";
            $scope.login.psd = "";
            $scope.login.dsb = true;
            $scope.login.psdDis = true;
            $(".login_btn").css({background:"#ccc"});
            if(n == 1){
                $scope.login.yl = true;
                $scope.login.sl = false;
                $scope.login.btnTxt="苏格时代登录";
            }else if(n == 2){
                $scope.login.yl = false;
                $scope.login.sl = true;
                $scope.login.btnTxt="苏格优品登录";
            }
        };
        //用户名框变化判断电话号码格式
        $scope.testTel=function () {
            if($scope.login.name.length == 11){
                if ($scope.login.z_tel.test($scope.login.name) == false){
                    $scope.login.errorShow=true;
                    $scope.login.errorMsg="电话号码格式错误！！！";
                    $scope.login.psdDis = true;
                    $scope.login.dsb = true;
                    $(".login_btn").css({background:"#ccc"});
                    return false;
                }else {
                    $scope.login.psdDis = false;
                    $scope.login.errorShow = false
                }
            }else if($scope.login.name.length > 11){
                $scope.login.errorShow=true;
                $scope.login.errorMsg="电话号码格式错误！！！";
                $scope.login.psdDis = true;
                $scope.login.dsb = true;
                $(".login_btn").css({background:"#ccc"});
            }else if($scope.login.name.length < 11){
                $scope.login.errorShow=false;
                $scope.login.psdDis = true;
                $scope.login.dsb = true;
                $(".login_btn").css({background:"#ccc"});
            }else {
                $scope.login.psdDis = true
            }
        };
        //密码变化
        $scope.rmoDis=function () {
            if ($scope.login.psd.length >= 6){
                $scope.login.dsb = false;
                $(".login_btn").css({background:"#fb6400"});
            }
        }
        //登录按钮点击事件
        $scope.loginMall=function (y) {
            $(".login_ajax_container").animate({
                bottom:"0"
            },0);
            $scope.login.btnTxt="正在登录，请稍等...";
            //苏格时代登录
            if(y == 0){
                $scope.login.way = "sgyx";
            };
            //苏格优品登录
            if(y == 1){
                $scope.login.way = 'sgyp';
            }
            var loginE=appService._postData(URL+"index.php?s=/Api/User/login",
                {
                    phone:$scope.login.name,
                    password:$scope.login.psd,
                    way:$scope.login.way
                });
            loginE.then(function (e) {
                if(e.data.ret == 'err'){
                    appService.artTxt(e.data.msg).then(function () {
                        $scope.login.psd = "";
                        $scope.login.dsb = true;
                        $(".login_ajax_container").animate({
                            bottom:"100%"
                        },0);
                       switch (y){
                           case 0:
                               $scope.login.btnTxt="苏格时代登录";
                               break;
                           case 1:
                               $scope.login.btnTxt="苏格优品登录";
                               break;
                       }
                        $(".login_btn").css({background:"#ccc"});
                    });

                }else if(e.data.ret == 'ok'){
                    localStorage.setItem("userInfo",JSON.stringify(e.data.data));
                    localStorage.setItem('tokens', e.data.data.token);
                    localStorage.setItem("way",e.data.data.way);
                    appService.artTxt("登录成功").then(function () {
                        $state.go("tabs.index");
                    });
                }
            },function (e) {
                console.log(e)
            })
        };


    }])