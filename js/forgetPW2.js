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

                     $scope.submit=function () {

                         if($scope.user.newpw1!=$scope.user.newpw2){
                             return false;
                         }
                         if(!$scope.user.newpw1||!$scope.user.newpw2){
                             appService.artTxt("密码不能为空").then(function () {

                             });
                             return false;
                         }
                         if($scope.user.newpw1.length<6){
                             appService.artTxt("密码不能低于6位").then(function () {

                             });
                             return false;
                         }
                         var ma=appService._postData(URL+"index.php?s=/Api/Password/update_login_password",{
                             user_name:localStorage.getItem("phones"),
                             password:$scope.user.newpw1,

                         });
                         ma.then(function (e) {
                               if(e.data.ret="success"){


                                   appService.artTxt(e.data.msg).then(function () {
                                       $state.go("login");
                                   });
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