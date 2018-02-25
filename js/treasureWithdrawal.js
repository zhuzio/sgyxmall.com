//财富  提现
yx_mallApp
    .controller("treasureWithdrawalController",["$scope","appService","$state","$stateParams","$timeout",function($scope,appService,$state,$stateParams,$timeout){
	document.title="财富提现";
	$scope.Withdrawal={
	    password:false,
	    money:0,
        bank_id:"",//卡id
        bank_name:"",//卡类型
        bank_num:"",//卡号
        zf_password:[],//密码收集
        zf_ok:[],//密码位数
        zf_no:false,//密码错误警告
        tq_money:'',
    };
	if(!localStorage.getItem("tokens")){
	    $state.go("login");
    }
        console.log($stateParams);
	var  uesr=appService._postData(URL+"index.php?s=/Api/wealth/member_deposit",{
        token: localStorage.getItem("tokens"),
        way:localStorage.getItem("way")
    });
	uesr.then(function (e) {
        $scope.Withdrawal.money=e.data.data.maxMoney;
        // 默认的卡号
        if($stateParams.name=="1"){
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

        console.log(e);
    },function (e) {
        console.log(e);
    });

$scope.maxMoney=function (e) {

    $scope.Withdrawal.tq_money=  e;


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
              alert("提现金额必须是整数且100的倍数");
              return false;
          }

             if(parseFloat($("#moneyt").val())%100){
                 alert("提现金额必须是整数且100的倍数");
                 return false;
             }

             if(parseInt($("#moneyt").val())<200){
                 alert("提现金额不能低于200");
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

            if($scope.Withdrawal.zf_password.length==6){
                var pw=$scope.Withdrawal.zf_password.join("");
                console.log(pw);


                var Withdrawal=appService._postData(URL+"index.php?s=/Api/wealth/user_deposit",{
                    token: localStorage.getItem("tokens"),
                    way:localStorage.getItem("way"),
                    password:pw,
                    bank_id:$scope.Withdrawal.bank_id ,
                    money:$scope.Withdrawal.money
                });

                Withdrawal.then(function (e) {
                    console.log(e);
                    //成功后处理

                    if(0){ //  密码正确
                        $state.go("treasureWithdrawal",{id:"1",name:"1",num:"1"});
                    }else { //  密码错误
                        $scope.Withdrawal.zf_no=true;
                        $timeout(function () {
                            $scope.Withdrawal. zf_password=[];
                            $scope.Withdrawal. zf_ok=[];
                            $scope.Withdrawal.zf_no=false;
                        },1500);
                    }


                },function (e) {
                    console.log(e);
                })
                return false;
            }
            $scope.Withdrawal.zf_password.push(e);
            $scope.Withdrawal.zf_ok.push("*");
            console.log($scope.Withdrawal.zf_password);
        };




///////////支付密码






}]);