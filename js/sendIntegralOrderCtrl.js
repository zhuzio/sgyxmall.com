yx_mallApp
    .controller("sendIntegralOrderController",["$scope","appService","$state","$stateParams",function ($scope,appService,$state,$stateParams) {
        document.title = "确认订单信息"
        $scope.sio={
            sioInfo:[],
            userInfo:[],
            sioInte:[],
            notice:"",
            //密码盘弹出
            psd:false,
            pan:['1','2','3','4','5','6','7','8','9','取消','0','删除'],
            finalPsd:""
        };
        $scope.sio.sioInte = $stateParams
        $scope.sio.userInfo = JSON.parse(localStorage.getItem("userInfo"))
        $scope.sio.sioInfo = JSON.parse(localStorage.getItem("finalOrder"));
        console.log($scope.sio.sioInfo)

        $scope.inputPsd=function (num) {
            switch (num){
                case '取消':
                    $scope.sio.psd = false;
                    console.log( $scope.passwordGroup)
                    $scope.passwordGroup=[];
                    $scope.currentInputIndex=-1;
                    for(var i=0;i<6;i++){
                        $scope.passwordGroup.push({
                            value:null
                        })
                    };

                    break;
                case '删除':
                    try {
                        $scope.passwordGroup[$scope.currentInputIndex].value=null;
                        $scope.currentInputIndex--;
                    }catch (e){
                        return true;
                    }
                    break;
                default:
                    $scope.currentInputIndex++;
                    $scope.passwordGroup[$scope.currentInputIndex].value=num;
                    break;
            }
        };
        $scope.currentInputIndex=-1;
        $scope.passwordGroup=[];
        for(var i=0;i<6;i++){
            $scope.passwordGroup.push({
                value:null
            })
        };
        $scope.$watch('currentInputIndex',function(nv){
            if(nv){
                if(nv==5){
                    try{
                        var afterInputPassword='';
                        angular.forEach($scope.passwordGroup,function(element){
                            afterInputPassword+=element.value;
                        });
                        $scope.currentInputIndex=-1;
                        $scope.sio.finalPsd = afterInputPassword;
                        $scope.sendGo( $scope.sio.finalPsd)
                        //密码输入完成,afterInputPassword就是密码;直接发起请求;
                        //请求处理完毕,currentInputIndex重置为-1,遍历数组填充为{value:null}
                        //为防止请求期间网络问题，当用户输入完毕发起请求的同时，最好出现一个遮罩层,防止用户点击操作
                    }catch(e){
                        return true;
                    }
                }else if(nv<-1){
                    $scope.currentInputIndex=-1;
                    //删除完毕;
                    //todo...
                }
            }
        });
        $scope.sendIG=function () {
            $scope.sio.psd = true;
            // $state.go("buyAndSendIntegralDetail")
        };
        $scope.sendGo=function (psd) {
            var sendGo=appService._postData(URL+"index.php?s=Api/shop_center1/send_point",{
                token:$scope.sio.userInfo.token,
                way:$scope.sio.userInfo.way,
                mobile:$scope.sio.sioInfo.finalBuyerName,
                point:$scope.sio.sioInfo.finalIntegralNum,
                passwd:psd,
                money:$scope.sio.sioInfo.finalDealMoney,
                classid:JSON.parse(localStorage.getItem("mg")).class_id,
                remark:$scope.sio.notice
            });
                sendGo.then(function (value) {
                    console.log(value)
                    $scope.sio.psd = false;
                    if (value.data.ret == "ok"){
                        alert(value.data.msg);
                        $state.go("buyAndSendIntegralDetail")
                    }else {
                        alert(value.data.msg);
                        return false;
                    }
                },function (reason) {
                    console.log(reason)
                })

        }

    }]);