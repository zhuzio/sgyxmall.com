//底部栏页面 控制器
yx_mallApp
    .controller("tabController",["$scope","$state",function ($scope,$state) {
        $scope.tab={
            userInfo:JSON.parse(localStorage.getItem("userInfo")),
            YP:false,
            SD:false
        };
        console.log($scope.tab.userInfo)
        if($scope.tab.userInfo == "" || $scope.tab.userInfo == undefined || $scope.tab.userInfo == null){
            $state.go("login");
        }else {
            if ($scope.tab.userInfo.way_sn == "苏格优品"){
                $scope.tab.YP = true;
                $scope.tab.SD = false;
            }
            if ($scope.tab.userInfo.way_sn == "苏格严选"){
                $scope.tab.YP = false;
                $scope.tab.SD = true;
            }
        }

    }])