/**
 * Created by Administrator on 2018/2/24 0024.
 */
// 修改密码
yx_mallApp
    .controller("forgetPWPay2Controller",["$scope","appService","$stateParams","$state","$window",function ($scope,appService,$stateParams,$state,$window) {
        document.title="修改支付密码";
        $scope.user={
            newpw1:"",
            newpw2:"",
            typeName:false,
            z_tel:/[0-9]{6}/,
        };
        $scope.ckecked=function (e) {
            console.log(e)
               if(!$scope.user.z_tel.test(e-0)||e.length!=6){
                   $scope.user.typeName=true;
               }else {
                   $scope.user.typeName=false;
               };
        };
        $scope.submit=function () {
             if($scope.user.newpw1!=$scope.user.newpw2){
                 return false;
             }
             if($scope.user.typeName){
                 return false;
             }
             if(!$scope.user.newpw1||!$scope.user.newpw2){
                 appService.artTxt("支付密码不能为空").then(function () {
                 });
                 return false;
             }
             if(($scope.user.newpw1).length!=6){
                 appService.artTxt("支付密码必须为6位").then(function () {
                 });
                 return false;
             }
             var ma=appService._postData(URL+"index.php?s=/Api/password/update_pay_password",{
                 user_name:JSON.parse(localStorage.getItem("userInfo")).user_name,
                 password:$scope.user.newpw1,
             });
             ma.then(function (e) {
                 if(e.data.ret="success"){
                    appService.artTxt(e.data.msg).then(function () {
                          // $state.go("set");
                        $window.history.go(-2)
                     });
                 }else {
                     appService.artTxt(e.data.msg).then(function () {
                         return false;
                     });
                 };
             },function (e) {
                 console.log(e);
             });
        };
    }]);