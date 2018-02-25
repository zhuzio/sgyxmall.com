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

         };

        var $bool=true;
        var $bool1=true;
        var z_tel=/^1[3|5|7|8|9]\d{9}$/;

        $scope.jianCe=function (e) {

            if (!z_tel.test(e)) {
                console.log(e);
                $scope.user.err=true;

                return false;
            }else {
                $scope.user.err=false;
            }


        };
           $scope.yzm=function () {


            if ($scope.user.phone== "") {
                alert("请输入电话号码！！！");
                return false;
            } else  if (!z_tel.test($scope.user.phone)) {
                return false;
            } else {
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
                    //请求发短信
                    // $.ajax({
                    //     url: "http://116.255.247.205/pinche/api.php/Return/loginMessage",
                    //     type: "post",
                    //     dataType: 'json',
                    //     data: {phone: carer_tel},
                    //     success: function (e) {
                    //         console.log(e)
                    //     },
                    //     error: function (e) {
                    //         console.log(e)
                    //     }
                    // });
                }
            }
        };


        $scope.next=function () {
              $state.go("forgetPW2");
        }

    }]);