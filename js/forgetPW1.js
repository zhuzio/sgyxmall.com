/**
 * Created by Administrator on 2018/2/24 0024.
 */
// 修改密码
yx_mallApp
    .controller("forgetPW1Controller",["$scope","appService","$state","$interval",function ($scope,appService,$state,$interval) {
        document.title="修改密码";
         $scope.user={
             yzm:"获取验证码",
             phone:"",//手机号
             code:"",//验证码
             err:false,
             code_id:"",
         };

        var $bool=true;
        var $bool1=true;
        var z_tel=/^1[3|4|5|6|7|8|9]\d{9}$/;

        $scope.jianCe=function (e) {

            if (!z_tel.test(e)) {

                $scope.user.err=true;

                return false;
            }else {
                $scope.user.err=false;
            }


        };
           $scope.yzm=function () {


            if ($scope.user.phone== "") {
                appService.artTxt("请输入电话号码！！！！").then(function () {

                });
                return false;
            } else  if (!z_tel.test($scope.user.phone)) {
                appService.artTxt("手机格式不对！").then(function () {

                });
                return false;
            } else {
                localStorage.setItem("phones",$scope.user.phone);
                $scope.user.err=false;
                if ($bool) {
                    $bool = false;
                    var num = 120;
                          var  timer = $interval(function () {
                            num--;

                            if (num == 0) {
                                $interval.cancel(timer);
                                $scope.user.yzm="获取验证码";
                                $bool = true;

                            } else {
                                $scope.user.yzm=num + "秒后重发";

                            }
                        }, 1000);

                   var dx=appService._postData(URL+"index.php?s=Api/user/send_code",{phone:$scope.user.phone,type:"find"});
                   dx.then(function (e) {
                       // console.log(e);
                       $scope.user.code_id=e.data.data.id;
                   },function (e) {
                       console.log(e);
                   });
                }
            }
        };


        $scope.next=function () {
            if(!$scope.user.code){
                appService.artTxt("请输入验证码").then(function () {
                    return false;
                });
                return false;
            }
            var next1=appService._postData(URL+"index.php?s=Api/Password/validate_code",{id:$scope.user.code_id,code:$scope.user.code});
            next1.then(function (e) {
                // console.log(e);
                  if(e.data.ret=="success"){
                      $state.go("forgetPW2");
                  }else {
                     appService.artTxt(e.data.msg).then(function () {
                          return false;
                      });
                  }
            },function (e) {
                console.log(e);
            });


        }

    }]);