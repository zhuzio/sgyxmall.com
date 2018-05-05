yx_mallApp
    .controller("setController",["$scope","$state",function ($scope,$state) {
        document.title = "设置";
        //退出登录
        $scope.quitLogin=function () {
            localStorage.clear();
            $state.go("login")
        };
    }])