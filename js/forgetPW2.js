/**
 * Created by Administrator on 2018/2/24 0024.
 */
// 修改密码
yx_mallApp
    .controller("forgetPW2Controller",["$scope","appService","$stateParams","$state",function ($scope,appService,$stateParams,$state) {
        document.title="修改密码";

                    $scope.user={
                        oldpw:"",
                        newpw1:"",
                        newpw2:"",


                    };

                     $scope.submit=function () {

                         if($scope.user.newpw1!=$scope.user.newpw2){
                             return false;
                         }


                         var ma=appService._postData(URL+"index.php?s=/Api/wealth/user_deposit",{
                             token: localStorage.getItem("tokens"),
                             way:localStorage.getItem("way"),
                             password:$scope.user.newpw1,

                         });
                         ma.then(function (e) {
                               console.log(e);
                         },function (e) {
                             console.log(e);
                         });

                     }













    }]);