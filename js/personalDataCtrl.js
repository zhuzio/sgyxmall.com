yx_mallApp
    .controller("personalDataController",["$scope","appService","$state","$window",function ($scope,appService,$state,$window) {
        $scope.PDSet={
            headImg:"",
            userInfo:[],
            baseInfo:[]

        };
        $scope.PDSet.userInfo = JSON.parse(localStorage.getItem("userInfo"));
        console.log( $scope.PDSet.userInfo)
        //请求用户信息
        var baseUserInfo=appService._postData(URL+"index.php?s=Api/User/information",{
            token:$scope.PDSet.userInfo.token,
            // way:$scope.PDSet.userInfo.way
        });
            baseUserInfo.then(function (value) {
                console.log(value)
                $scope.PDSet.baseInfo = value.data.data;
            },function (reason) {
                console.log(reason)
            })
        //更换头像
        $scope.setHeadImg=function (r) {
            var file = r[0]
            //创建读取文件的对象
            var reader = new FileReader();
            //创建文件读取相关的变量
            var imgFile;
            //为文件读取成功设置事件
            reader.onload=function(e) {
                // alert('文件读取完成');
                imgFile = e.target.result;
                var setHeadImg = appService._postData(URL+"index.php?s=api/wendy/updatePortrait",{
                    token:$scope.PDSet.userInfo.token,
                    // way:$scope.PDSet.userInfo.way,
                    portrait:imgFile
                });
                    setHeadImg.then(function (value) {
                       /* console.log(value);
                       /!* if (value.){

                        }*!/*/
                       alert(value.data.ret);
                        $window.location.reload()
                    },function (reason) {
                        console.log(reason)
                    })
            };
            //正式读取文件
            reader.readAsDataURL(file);
        };
        //

    }])