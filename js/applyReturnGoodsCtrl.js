yx_mallApp
    .controller("applyReturnGoodsController",["$scope","appService","$stateParams","$state","$window",function ($scope,appService,$stateParams,$state,$window) {
        document.title = "申请退货";
        $scope.reg={
            userInfo:[],
            regMoney:"",
            regServiceType:"请选择服务类型",
            regServiceTypeArr:[],
            regReason:"请选择退款原因",
            regReasonArr:[],
            regReasonDis:"",
            txtNum:200,
            txtArea:false,
            STAlert:false,
            RAlert:false,
            AlertClass:false,
            applyReturnGoods:[],
            IArr:[],
            haveImg:false,
            choseImg:true,
            choseImgTwo:false,
            choseImgOne:false
        };
        $scope.reg.userInfo = JSON.parse(localStorage.getItem("userInfo"));
        $scope.reg.applyReturnGoods = JSON.parse(localStorage.getItem("applyReturnGoods"));
        $scope.getTxtNum = function () {
            $scope.reg.txtNum = 200-($scope.reg.regReasonDis.length)
        };
        //获取服务类型
        var serviceType=appService._getData(URL+"index.php?s=/Api/Order/refundSetting");
            serviceType.then(function (value) {
                $scope.reg.regServiceTypeArr = value.data.refund_service;
                $scope.reg.regReasonArr = value.data.refund_reason;
            })
        //选择弹出层
        $scope.alertBlock=function (idx) {
            switch (idx){
                case 1:
                    $scope.reg.AlertClass=true;
                    $scope.reg.STAlert=true;
                    $scope.reg.RAlert = false;
                    break;
                case 2:
                    $scope.reg.AlertClass=false;
                    $scope.reg.STAlert=false;
                    $scope.reg.RAlert = false;
                    break;
                case 3:
                    $scope.reg.AlertClass=true;
                    $scope.reg.STAlert=false;
                    $scope.reg.RAlert = true;
                    break;

            };
        };
        //点击选择原因
        $scope.regTxt=function (txt,idx) {
            switch (idx){
                case 1:
                    $scope.reg.regServiceType = txt;
                    break;
                case 2:
                    $scope.reg.regReason = txt;
                    break;
            };
            $scope.reg.AlertClass=false;
            $scope.reg.STAlert=false;
            $scope.reg.RAlert = false;
        };
        //提交退货申请
        //选择图片
        $scope.choseImg=function (w,idx) {
            switch (idx){
                case 0:
                    if (w.length > 3){
                        appService.artTxt("最多只能选择三张图片！！！");
                        return false;
                    }else if (w.length == 3){
                        for (var i=0 ;i < w.length ; i++){
                            //创建读取文件的对象
                            var reader = new FileReader();
                            var imgFiles;
                            reader.onload=function(e) {
                                imgFiles = e.target.result;
                                $scope.reg.IArr.push(imgFiles);
                                $scope.reg.haveImg = true;
                                $scope.reg.choseImg =false;
                                $scope.$apply();
                            };
                            reader.readAsDataURL(w[i]);
                        };
                    }else if(w.length == 2){
                        for (var i=0 ;i < w.length ; i++){
                            //创建读取文件的对象
                            var reader = new FileReader();
                            var imgFiles;
                            reader.onload=function(e) {
                                imgFiles = e.target.result;
                                $scope.reg.IArr.push(imgFiles);
                                $scope.reg.haveImg = true;
                                $scope.reg.choseImg =false;
                                $scope.reg.choseImgOne =true;
                                $scope.$apply();
                            };
                            reader.readAsDataURL(w[i]);
                        };
                    }else if(w.length == 1){
                        for (var i=0 ;i < w.length ; i++){
                            //创建读取文件的对象
                            var reader = new FileReader();
                            var imgFiles;
                            reader.onload=function(e) {
                                imgFiles = e.target.result;
                                $scope.reg.IArr.push(imgFiles);
                                $scope.reg.haveImg = true;
                                $scope.reg.choseImg =false;
                                $scope.reg.choseImgOne =false;
                                $scope.reg.choseImgTwo = true
                                $scope.$apply();
                            };
                            reader.readAsDataURL(w[i]);
                        };
                    };
                    break;
                case 2:
                    if (w.length > 2){
                        appService.artTxt("您还能选择两张图片！！！");
                        return false;
                    }else if (w.length == 2){
                        for (var i=0 ;i < w.length ; i++){
                            //创建读取文件的对象
                            var reader = new FileReader();
                            var imgFile;
                            reader.onload=function(e) {
                                imgFile = e.target.result;
                                $scope.reg.IArr.push(imgFile);
                                $scope.reg.choseImgTwo = false;
                                $scope.$apply();
                            };
                            reader.readAsDataURL(w[i]);
                        };
                    }else if(w.length == 1){
                        for (var i=0 ;i < w.length ; i++){
                            //创建读取文件的对象
                            var reader = new FileReader();
                            var imgFiles;
                            reader.onload=function(e) {
                                imgFiles = e.target.result;
                                $scope.reg.IArr.push(imgFiles);
                                $scope.reg.choseImgTwo = false;
                                $scope.reg.choseImgOne = true;
                                $scope.$apply();
                            };
                            reader.readAsDataURL(w[i]);
                        };
                    };
                    break;
                case 1:
                    //创建读取文件的对象
                    var reader = new FileReader();
                    var imgFiles;
                    reader.onload=function(e) {
                        imgFiles = e.target.result;
                        $scope.reg.IArr.push(imgFiles);
                        $scope.reg.choseImgTwo = false;
                        $scope.reg.choseImgOne = false;
                        $scope.$apply();
                    };
                    reader.readAsDataURL(w[0]);
                    break;


            }

        };

        //提交申请
        $scope.applyReturnGoodsBtn=function () {
            // console.log($scope.reg.IArr);
            if ($scope.reg.regServiceType == "请选择服务类型"){
                appService.artTxt("请选择服务类型");
                return false ;
            };
            if ($scope.reg.regServiceType == "请选择退款原因"){
                appService.artTxt("请选择退款原因");
                return false ;
            };
            var applyReturnGoods=appService._postData(URL+"index.php?s=/Api/Order/refund",{
                token:$scope.reg.userInfo.token,
                way:$scope.reg.userInfo.way,
                order_id:$scope.reg.applyReturnGoods.order_id,
                refund_reason:$scope.reg.regReason,
                refund_service:$scope.reg.regServiceType,
                refund_desc:$scope.reg.regReasonDis,
                buyer_img:$scope.reg.IArr
            });
                applyReturnGoods.then(function (value) {
                    if (value.data.ret == "ok"){
                        appService.artTxt(value.data.msg).then(function (value) {
                            $window.history.go(-1);
                        })
                    }else {
                        appService.artTxt(value.data.msg);
                    }
                },function (reason) {
                    console.log(reason)
                })
        }
    }]);