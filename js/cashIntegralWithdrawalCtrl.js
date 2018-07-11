yx_mallApp
    .controller("cashIntegralWithdrawalController",["$scope","appService","$state","$window",function ($scope,appService,$state,$window) {
        document.title = '现金积分提现';
        $scope.ciw = {
            userInfo:[],
            intInfo:0,
            wdMoney:"",
            spd:"",
            defCard:"",
            cardId:""
        };
        $scope.ciw.userInfo = JSON.parse(localStorage.getItem("userInfo"));
        // 获取用户可提现现金积分数据
        var _userInt = appService._postData(URL+"index.php?s=Api/CashPoints/getAvailablePoints",{
            token:$scope.ciw.userInfo.token
        });
            _userInt.then(function (value) {
                $scope.ciw.intInfo = value.data.data.available;
            },function (reason) {
                console.log(reason)
            })
        // 获取用户默认银行卡
        var defBand = appService._postData(URL+"/index.php?s=/Api/wealth/member_deposit",{
            token:$scope.ciw.userInfo.token
        });
            defBand.then(function (value) {
                if (value.data.data.default_card == '' || value.data.data.default_card == null || value.data.data.default_card == undefined) {
                    appService.conform("您还没有银行卡，是否去添加？").then(function (value2) {
                        $state.go("manageBandCard",{id:2})
                    },function (reason) {
                        $window.history.go(-1)
                    })
                }else {
                    if (localStorage.getItem("defCard")) {
                        var len = JSON.parse(localStorage.getItem("defCard"))[0].num.length;
                        var weiH_ = JSON.parse(localStorage.getItem("defCard"))[0].num.substring(len-4,len);
                        $scope.ciw.defCard = JSON.parse(localStorage.getItem("defCard"))[0].name +  "（尾号"+weiH_+"）";
                        $scope.ciw.cardId = JSON.parse(localStorage.getItem("defCard"))[0].id;
                    }else {
                        $scope.ciw.defCard = value.data.data.default_card.bank_name + "（尾号"+value.data.data.default_card.bank_num+"）";
                        $scope.ciw.cardId = value.data.data.default_card.band_id;
                    }

                }

            },function (reason) {
                console.log(reason)
            })
        // 点击提交
        $scope.wd = function () {
            var _u = parseFloat($scope.ciw.intInfo),
                _w = parseFloat($scope.ciw.wdMoney);
            if(_w == 0 || $scope.ciw.wdMoney == ''){
                appService.artTxt("提现金额不能为空");
                return false;
            }else if (_u < _w) {
               appService.artTxt("提现金额不能大于可用金额");
               return false;
            }else if (_w < 500){
                appService.artTxt("提现金额不能小于500");
                return false;
            }else {
                $scope.secondPsd()
            }
        };
        //调二级支付
        $scope.secondPsd=function () {
            $(".input_psd_container").animate({
                top:"0"
            },300);
        };
        // 提交提现申请
        $scope.applyApiInt = function (psd) {
            var wdApply = appService._postData(URL+"index.php?s=/Api/CashPoints/cash_points_deposit",{
                money:$scope.ciw.wdMoney,
                token:$scope.ciw.userInfo.token,
                password:psd,
                bank_id:$scope.ciw.cardId
            });
                wdApply.then(function (value) {
                    if (value.data.ret == 'success'){
                        appService.artTxt(value.data.msg).then(function (value2) {
                            $state.go('cashIntegralWithdrawalRecord')
                        })
                    }else {
                        appService.artTxt(value.data.msg).then(function (value2) {
                            $(".input_process_loading").animate({
                                top:"100%"
                            },0);
                            $(".input_psd_container").animate({
                                top:"100%"
                            },300);
                        });
                        return false;
                    }

                },function (reason) {
                    console.log(reason)
                })
        };
        $scope.$on('applyInputSuccess',function(event,password){
            //passworc为密码
            $(".input_process_loading").animate({
                top:"0"
            },0);
            $scope.ciw.spd = password;
            $scope.applyApiInt($scope.ciw.spd);
        });
        $scope.$on('cancelApply',function(){
            //取消支付
            $(".input_psd_container").animate({
                top:"100%"
            },300);
        });
    }])