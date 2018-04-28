yx_mallApp
    .controller("registerController",["$scope","appService","$state","$interval","$window",function ($scope,appService,$state,$interval,$window) {
        document.title = "会员注册";
        $scope.reg={
            //短信计时器
            clickSta:true,
            getMsgTxt:"获取验证码",
            //电话号码
            regTel:"",
            //验证码
            regCode:"",
            //推荐编号
            regRecCode:"1231313",
            //登录密码
            regLoginPsd:"",
            //支付密码
            regApplyPsd:"",
            //真是姓名
            regRealName:"",
            //注册地
            regLocation:"",
            //协议
            regAgreement:false,
            //三级城市连选
            regCity:false,
            //协议内容
            regAgreementCon:false,
            //真是姓提示
            realName:false,
            //图片验证码路径
            imgCodeSrc:"http://www.sgyxmall.com/index.php?s=Api/user/code",
            //图片验证码
            imgCodeNum:"",
            //返回的短信ID
            msgID:"",
            //图片验证码的正确活错误
            watherImgCode:false,
            urlCode:""

        };

        //获取短信验证码
        $scope.getMessageCode=function () {
            var z_tel= /^1(3|4|5|7|8|9)\d{9}$/;
            if ($scope.reg.regTel == ""){
                appService.artTxt("请输入电话号码！！！");
                return false;
            }else if(z_tel.test($scope.reg.regTel) == false){
                appService.artTxt("电话号码格式错误！！！");
                return false;
            };
            if (!$scope.reg.watherImgCode){
                appService.artTxt("您的图片验证码错误，请重新输入");
                return false;
            };
            if($scope.reg.clickSta){
                $scope.reg.clickSta = false;
                var num = 120,
                    time=$interval(function () {
                        num--;
                        if (num == 0){
                            $interval.cancel(time);
                            $scope.reg.getMsgTxt = "获取验证码";
                            $scope.reg.clickSta = true;
                        }else {
                            $scope.reg.getMsgTxt =num+ "s后重发";
                        }
                    },1000);
                //请求发送短信
                var msgCode = appService._postData(URL+"index.php?s=api/user/send_code",{
                    phone:$scope.reg.regTel,
                    type:"register"
                });
                    msgCode.then(function (value) {

                        if (value.data.ret == "ok"){
                            $scope.reg.msgID = value.data.data.id;
                        }
                    },function (reason) {
                        console.log(reason)
                    })

            }
        };
        //获取图片验证码
        $scope.changeImg=function () {
            var time = new Date().getTime();
            $scope.reg.imgCodeSrc = "http://www.sgyxmall.com/index.php?s=Api/user/code/"+time
        };
        //判断图片验证码
        $scope.judgeImgCode=function () {
            // console.log($scope.reg.imgCodeNum.length)
            if ($scope.reg.imgCodeNum.length == 4){
                var judegImgCode = appService._postData(URL+"index.php?s=Api/User/check_verify",{code:$scope.reg.imgCodeNum});
                    judegImgCode.then(function (value) {

                       $scope.reg.watherImgCode = value.data.msg;
                    },function (reason) {
                        console.log(reason)
                    })
            }
        }

        //三级城市联线
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
                $scope.reg.regCity = false;
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
        $scope.regCancels=function () {
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
            $scope.reg.regCity = false;

        };
        //提交注册信息
        $scope.userRegister=function () {
            var w_num=/^[0-9]*$/;
            if ($scope.reg.regTel == "" || $scope.reg.regTel == null){
                appService.artTxt("电话号码不能为空！！！");
                return false;
            };
            if ($scope.reg.imgCodeNum == "" || $scope.reg.imgCodeNum == null){
                appService.artTxt("图片验证码不能为空！！！");
                return false;
            }
            if ($scope.reg.regCode == "" || $scope.reg.regCode == null){
                appService.artTxt("请输入验证码！！！");
                return false;
            };
            if ($scope.reg.regRecCode == "" || $scope.reg.regRecCode == null){
                appService.artTxt("请输入您的推荐编号！！！");
                return false;
            };
            if ($scope.reg.regLoginPsd == "" || $scope.reg.regLoginPsd == null){
                appService.artTxt("登录密码不能为空！！！");
                return false;
            };
            if ($scope.reg.regApplyPsd == "" || $scope.reg.regApplyPsd == null){
                appService.artTxt("支付密码不能为空！！！");
                return false;
            };
            if ($scope.reg.regRealName == "" || $scope.reg.regRealName == null){
                appService.artTxt("真实姓名不能为空！！！");
                return false;
            };
            if ($scope.area.address == "" || $scope.area.address == null){
                appService.artTxt("请选择注册地！！！");
                return false;
            };
            if ($scope.reg.regAgreement == false){
                appService.artTxt("请阅读用户协议");
                return false;
            };
            if (w_num.test($scope.reg.regApplyPsd) == false){
               appService.artTxt("支付密码只能为6位数字！！！");
               return false;
           };
            if ($scope.reg.regApplyPsd.length != 6){
               appService.artTxt("支付密码只能为6位数字！！！");
               return false;
           };
            var   register=appService._postData(URL+"index.php?s=Api/user/register",{
                phone:$scope.reg.regTel,//注册用户手机号
                code:$scope.reg.regCode,//短信验证码
                code_id:$scope.reg.msgID,//短信验证码的ID
                tjphone:$scope.reg.regRecCode,//推荐人的手机号码
                password:$scope.reg.regLoginPsd,//设置的登录密码
                zfpw:$scope.reg.regApplyPsd,//设置的支付密码
                real_name:$scope.reg.regRealName,//注册用户的真是姓名
                province:$scope.area.proNum,//省份
                city:$scope.area.cityNum,//市区
                area:$scope.area.disNum//地区
            });
                register.then(function (value) {
                    console.log(value);
                    if (value.data.ret=="success"){
                        appService.artTxt(value.data.msg).then(function (value2) {
                            $state.go("login");
                        });

                    }else {
                        appService.artTxt(value.data.msg);
                        return false;
                    }
                },function (reason) {
                    console.log(reason)
                })

        };

        $scope.reg.urlCode = ($window.location.href).split("=")[1];
        if ($scope.reg.urlCode != undefined || $scope.reg.urlCode != null || $scope.reg.urlCode != ""){
            $scope.reg.regRecCode = parseInt($scope.reg.urlCode);
        }else {
            $scope.reg.regRecCode = "";
        }
    }])