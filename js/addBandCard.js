yx_mallApp
    .controller("addBandCardController",["$scope","appService","$state",function ($scope,appService,$state) {
        document.title="添加银行卡";
        $scope.Adc={
            userInfo:{},
            //持卡人姓名
            bandCardUserName:"",
            //卡号
            bandCardNum:"",
            //身份证号
            userIdNum:"",

            province:true,
            city:true,
            area:true,

            weaAlert:false,

            bankKind:[],
            bankPro:[],
            bankCity:[],
            bankArea:[],

            choseInfo:{
                // 开户行
                adcBank:"",
                // 开户行logo
                adcBankImg:"",
                // 开户省份
                adcPro:"",
                // 开户城市
                adcCity:"",
                // 开户支行
                adcArea:"",
                //开户支行 号码
                adcAreaNum:""
            }
        };
        $scope.Adc.userInfo = JSON.parse(localStorage.getItem("userInfo"));
        $scope.choseKind=function (idx) {
            /*
            * idx 值为 1 . 2 . 3 . 4
            * 为1：选择 开户行
            * 为2：选择 开户省份
            * 为3：选择开户城市
            * 为4：选择开户支行
            */
            switch (idx){
                case 1:
                    $scope.Adc.weaAlert = true;
                    $scope.Adc.choseInfo.adcPro = "";
                    $scope.Adc.choseInfo.adcCity = "";
                    $scope.Adc.choseInfo.adcArea = "";
                    $scope.Adc.province = true;
                    $scope.Adc.city = true;
                    $scope.Adc.area = true;
                    var choseKind=appService._getData(URL+"index.php?s=Api/Bank/w_bank_list");
                    choseKind.then(function (value) {
                        $scope.Adc.bankKind = value.data.data;
                        $(".bankKindList").css("display","block").siblings().css("display","none");
                    },function (reason) {
                        console.log(reason)
                    });
                    break;
                case 2:
                    $scope.Adc.weaAlert = true;
                    $scope.Adc.choseInfo.adcCity = "";
                    $scope.Adc.choseInfo.adcArea = "";
                    $scope.Adc.city = true;
                    $scope.Adc.area = true;
                    var chosePro = appService._postData(URL+"index.php?s=Api/Bank/w_bank_province",{bank:$scope.Adc.choseInfo.adcBank});
                    chosePro.then(function (value) {
                        $scope.Adc.bankPro = value.data.data;
                        $(".bankProList").css("display","block").siblings().css("display","none");
                    },function (reason) {
                        console.log(reason)
                    });
                    break;
                case 3:
                    $scope.Adc.weaAlert = true;
                    $scope.Adc.choseInfo.adcArea = "";
                    $scope.Adc.area = true;
                    var choseCity = appService._postData(URL+"index.php?s=Api/Bank/w_bank_city",{
                        bank:$scope.Adc.choseInfo.adcBank,
                        province:$scope.Adc.choseInfo.adcPro
                    });
                        choseCity.then(function (value) {
                            $scope.Adc.bankCity = value.data.data;
                            $('.bankCityList').css("display","block").siblings().css("display","none");
                        },function (reason) {
                            console.log(reason)
                        })
                    break;
                case 4:
                    $scope.Adc.weaAlert = true;
                    var choseArea = appService._postData(URL+"index.php?s=Api/Bank/w_bank_code_list",{
                        bank:$scope.Adc.choseInfo.adcBank,
                        province:$scope.Adc.choseInfo.adcPro,
                        area:$scope.Adc.choseInfo.adcCity
                    });
                    choseArea.then(function (value) {
                        $scope.Adc.bankArea = value.data.data;
                        $('.bankAreaList').css("display","block").siblings().css("display","none");
                    },function (reason) {
                        console.log(reason)
                    })
                    break;
            }
        };
        $scope.dec=function (idx,info) {
            switch (idx){
                case 1:
                    $scope.Adc.choseInfo.adcBank = info.bank_name;
                    $scope.Adc.choseInfo.adcBankImg = info.bank_logo;
                    $scope.Adc.weaAlert = false;
                    $scope.Adc.province = false;
                    break;
                case 2:
                    $scope.Adc.choseInfo.adcPro = info;
                    $scope.Adc.weaAlert = false;
                    $scope.Adc.city = false;
                    break;
                case 3:
                    $scope.Adc.choseInfo.adcCity = info;
                    $scope.Adc.weaAlert = false;
                    $scope.Adc.area = false;
                    break;
                case 4:
                    $scope.Adc.choseInfo.adcArea = info.name;
                    $scope.Adc.choseInfo.adcAreaNum = info.code;
                    $scope.Adc.weaAlert = false;
                    break;
            }
        };
        $scope.addBankCardSub=function () {
            var IdZ=/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
            if (!$scope.Adc.bandCardUserName){
                appService.artTxt("持卡人姓名不能为空！！！");
                return false;
            };
            if (!$scope.Adc.bandCardNum){
                appService.artTxt("银行卡号不能为空！！！");
                return false;
            };
            if (!$scope.Adc.choseInfo.adcBank){
                appService.artTxt("开户行不能为空！！！");
                return false;
            };
            if (!$scope.Adc.choseInfo.adcPro){
                appService.artTxt("开户省份不能为空！！！");
                return false;
            };
            if (!$scope.Adc.choseInfo.adcCity){
                appService.artTxt("开户城市不能为空！！！");
                return false;
            };
            if (!$scope.Adc.choseInfo.adcArea){
                appService.artTxt("开户支行不能为空！！！");
                return false;
            };
            if (!$scope.Adc.userIdNum){
                appService.artTxt("身份证号不能为空！！！");
                return false;
            };
            if (IdZ.test($scope.Adc.userIdNum) == false){
                appService.artTxt("身份证号格式错误！！！");
                return false;
            };
            var addBankCardSub=appService._postData(URL+"index.php?s=Api/Userset/addcard",{
                token:$scope.Adc.userInfo.token,
                way:$scope.Adc.userInfo.way,
                bank_name:$scope.Adc.choseInfo.adcBank,
                bank_num:$scope.Adc.bandCardNum,
                user_name:$scope.Adc.bandCardUserName,
                bank_code:$scope.Adc.choseInfo.adcAreaNum,
                bank_img:$scope.Adc.choseInfo.adcBankImg,
                id_card:$scope.Adc.userIdNum,
                open_bank:$scope.Adc.choseInfo.adcArea
            });
                addBankCardSub.then(function (value) {
                    if (value.data.ret == "success"){
                        appService.artTxt(value.data.msg).then(function (value2) {
                            $state.go("manageBandCard");
                        });

                    }else {
                        appService.artTxt(value.data.msg);
                    }
                },function (reason) {
                    console.log(reason)
                })


        }
    }])