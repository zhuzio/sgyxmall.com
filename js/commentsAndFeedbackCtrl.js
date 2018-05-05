yx_mallApp
    .controller("commentsAndFeedbackController",["$scope","appService","$window",function ($scope,appService,$window) {
        document.title = "意见与反馈";
        $scope.caf={
            userInfo:[],
            adviceTxt:"请输入您的反馈意见，我们将认真听取，谢谢。",
            tel:"",
        };
        $scope.caf.userInfo = JSON.parse(localStorage.getItem("userInfo"));
        $scope.writeCaf=function () {
            if ($scope.caf.adviceTxt == "请输入您的反馈意见，我们将认真听取，谢谢。"){
                $scope.caf.adviceTxt = "";
            };
        };
        $scope.subCaf=function () {
            var z_tel=/^1[3|4|5|6|7|8|9]\d{9}$/;
            if ($scope.caf.adviceTxt == "请输入您的反馈意见，我们将认真听取，谢谢。" ||$scope.caf.adviceTxt == ""){
                appService.artTxt("反馈的意见不能为空！！！");
                return false;
            };
            if (z_tel.test($scope.caf.tel) == false){
                appService.artTxt("电话号码格式错误！");
                return false;
            };
            if ($scope.caf.tel == ""){
                appService.artTxt("电话号码不能为空！");
                return false;
            };
            var feedBack=appService._postData(URL+"index.php?s=/Api/User/feedback",{
                token:$scope.caf.userInfo.token,
                feedback:$scope.caf.adviceTxt,
                phone:$scope.caf.tel,
            });
            feedBack.then(function (value) {
                if (value.data.ret == "success"){
                    appService.artTxt(value.data.msg).then(function (value2) {
                        $window.history.go(-1);
                    })
                }
            },function (reason) {
                console.log(reason)
            })

        };

    }]);