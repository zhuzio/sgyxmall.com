/**
 * Created by Administrator on 2018/2/24 0024.
 */
// 修改密码
yx_mallApp
    .controller("forgetPW2Controller",["$scope","appService","$stateParams","$state",function ($scope,appService,$stateParams,$state) {
        document.title="修改密码";

                    $scope.user={

                        newpw1:"",
                        newpw2:"",


                    };
console.log(typeof JSON.parse(localStorage.getItem("userInfo")).user_name)
                     $scope.submit=function () {

                         if($scope.user.newpw1!=$scope.user.newpw2){
                             return false;
                         }


                         var ma=appService._postData(URL+"index.php?s=/Api/Password/update_login_password",{
                             user_name:JSON.parse(localStorage.getItem("userInfo")).user_name,
                             password:$scope.user.newpw1,

                         });
                         ma.then(function (e) {
                               if(e.data.ret="success"){
                                   alert(e.data.msg);
                                 $state.go("set");
                               }else {
                                   alert(e.data.msg);
                               }
                         },function (e) {
                             console.log(e);
                         });

                     }













    }]);