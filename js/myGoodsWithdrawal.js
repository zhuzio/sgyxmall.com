//我的货款提现
yx_mallApp
    .controller("myGoodsWithdrawalController",["$scope","appService","$state","$stateParams","$timeout",function($scope,appService,$state,$stateParams,$timeout){
	document.title="我的货款提现";
	$scope.Withdrawal={
	    password:false,
	    money:0,//最多可提钱
        bank_id:"",//卡id
        bank_name:"请选择卡",//卡类型
        bank_num:"",//卡号
        zf_password:[],//密码收集
        zf_ok:[],//密码位数
        zf_no:false,//密码错误警告
        tq_money:'',////最终提现钱
        current_money:0,
    };
	if(!localStorage.getItem("userInfo")){
	    $state.go("login");
    }
        // console.log($stateParams);
        //初加载提现
        var  uesr1=appService._postData(URL+"index.php?s=/Api/wealth/shop_deposit_info",{
            token: JSON.parse(localStorage.getItem("userInfo")).token,
            // way:localStorage.getItem("way")
        });
        uesr1.then(function (e) {

            $scope.Withdrawal.current_money  = e.data.data.max_money;
            $scope.Withdrawal.money=e.data.data.max_money;


        },function (e) {
            console.log(e);
        });



	//监测卡
	var  uesr=appService._postData(URL+"index.php?s=/Api/wealth/member_deposit",{
        token: JSON.parse(localStorage.getItem("userInfo")).token,
        // way:localStorage.getItem("way")
    });
	uesr.then(function (e) {
	    // console.log(e);

        // 默认的卡号
        if($stateParams.name=="1"||!$stateParams.name){

            $scope.Withdrawal.bank_id=e.data.data.default_card.bank_id;
            $scope.Withdrawal.bank_name=e.data.data.default_card.bank_name;
            $scope.Withdrawal.bank_num=e.data.data.default_card.bank_num;
        }else{
            //用户选择的卡号
            var   len= $stateParams.num.length;
            $scope.Withdrawal.bank_id=$stateParams.id;
            $scope.Withdrawal.bank_name=$stateParams.name;
            $scope.Withdrawal.bank_num=$stateParams.num.substring(len-4,len);

        }


    },function (e) {
        console.log(e);
    });

$scope.maxMoney=function (e) {

    $scope.Withdrawal.tq_money=  e;
    $(".tx").addClass("bg2").removeClass("bg1");

    if($("#moneyt").val()=="0"){
        $(".tx").addClass("bg1").removeClass("bg2");
    }
    if(parseInt($("#moneyt").val()) >$scope.Withdrawal.money){
        $(".tx").addClass("bg1").removeClass("bg2");
    }

};
          //监测输入提现的金额
        $scope.inp=function () {


            $(".tx").addClass("bg2").removeClass("bg1");
            if($("#moneyt").val().length==0){
                $(".tx").addClass("bg1").removeClass("bg2");
            }
            if($("#moneyt").val()=="0"){
                $(".tx").addClass("bg1").removeClass("bg2");
            }
            if(parseInt($("#moneyt").val()) >$scope.Withdrawal.money){
                $(".tx").addClass("bg1").removeClass("bg2");
            }



        };
///////////支付密码
        $scope.maNo=function () {
            $scope.Withdrawal.password=false;
            $scope.Withdrawal. zf_password=[];
            $scope.Withdrawal. zf_ok=[];
        };
         //提现监测
         angular.element(".tx").on("click",function () {

          if(parseFloat($("#moneyt").val())!=Math.floor(parseFloat($("#moneyt").val()))){

              appService.artTxt("提现金额必须是整数且100的倍数").then(function () {
                  return false;
              });
              return false;
          }

             if(parseFloat($("#moneyt").val())%100){
                 appService.artTxt("提现金额必须是整数且100的倍数").then(function () {
                     return false;
                 });
                 return false;
             }

             if(parseInt($("#moneyt").val())<200){

                 appService.artTxt("提现金额不能低于200").then(function () {
                     return false;
                 });
                 return false;
             }
             if($(this).hasClass("bg2")){
                 // if(parseInt($("#moneyt").val()) <$scope.Withdrawal.money){ }
                     $scope.Withdrawal.password=true;
                     $scope.$apply();

             }


         });
        //删除
        $scope.del=function () {
            $scope.Withdrawal.zf_password.pop();
            $scope.Withdrawal.zf_ok.pop("*");
        };
        //添加
        $scope.select1=function (e) {
            $scope.Withdrawal.zf_password.push(e);
            $scope.Withdrawal.zf_ok.push("*");
            // console.log($scope.Withdrawal.zf_password);
            if($scope.Withdrawal.zf_password.length==6){
                var pw=$scope.Withdrawal.zf_password.join("");

                var Withdrawal=appService._postData(URL+"index.php?s=/Api/wealth/shop_deposit",{
                    token: JSON.parse(localStorage.getItem("userInfo")).token,
                    // way:localStorage.getItem("way"),
                    password:pw,
                    bank_id:$scope.Withdrawal.bank_id ,
                    money:$scope.Withdrawal.tq_money,
                });

                Withdrawal.then(function (e) {
                    console.log(e)

                    //成功后处理

                    if(e.data.ret=="success"){ //  密码正确
                          appService.artTxt(e.data.msg).then(function () {
                           $state.go("myWithdrawalDetail");
                        });
                    }else { //  密码错误
                        appService.artTxt(e.data.msg).then(function (value) {

                            $scope.Withdrawal. zf_password=[];
                            $scope.Withdrawal. zf_ok=[];
                            $scope.Withdrawal.zf_no=false;
                            $scope.Withdrawal.password=false;
                        });



                    }


                },function (e) {
                    console.log(e);
                })
                return false;
            }

        };
}]);