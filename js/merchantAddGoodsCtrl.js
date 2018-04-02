
yx_mallApp
    .controller("merchantAddGoodsController",["$scope","appService","$state","$window",function ($scope,appService,$state,$window) {
        document.title = "选择商品名称";
        $scope.mAG={
            userInfo:[],
            anCls:false,
            mAGName:"",
            haveMAG:[]
        };
        $scope.mAG.userInfo = JSON.parse(localStorage.getItem("userInfo"));
        //获取商家的商品
        var haveMAG=appService._postData(URL+"index.php?s=Api/shop_center1/shop_class_list",{
            token:$scope.mAG.userInfo.token,
            way:$scope.mAG.userInfo.way,
        });
            haveMAG.then(function (value) {
               $scope.mAG.haveMAG = value.data.data;
            }, function (reason) {
                console.log(reason)
            });
        $scope.mAGBtn=function (idx) {
            switch (idx){
                case 1:
                    $scope.mAG.anCls = true ;
                    break;
                case 2:
                    $scope.mAG.anCls = false ;
                    break;
                case 3:
                    if ($scope.mAG.mAGName == ""){
                        appService.artTxt("商品名称不能为空！！！");
                        return false;
                    }else {
                        var mAG=appService._postData(URL+"index.php?s=Api/shop_center1/addClassName",{
                            token:$scope.mAG.userInfo.token,
                            way:$scope.mAG.userInfo.way,
                            classname:$scope.mAG.mAGName
                        });
                            mAG.then(function (value) {
                                if (value.data.ret == "success"){
                                    $scope.mAG.anCls = false ;
                                    $window.location.reload();
                                }
                            },function (reason) {
                                console.log(reason)
                            })
                    };
                    break;
            }

        };
        //删除商品
        $scope.mAGLDel=function (g_id) {
            var mAGLDel=appService._postData(URL+"index.php?s=Api/shop_center1/delClassName",{
                token:$scope.mAG.userInfo.token,
                way:$scope.mAG.userInfo.way,
                classid:g_id.class_id
            });
                mAGLDel.then(function (value) {
                    if (value.data.ret == "success"){
                        appService.artTxt("删除成功").then(function (value2) {
                            $window.location.reload();
                        });

                    }
                },function (reason) {
                    console.log(reason)
                })
        };
        //选择商品
        $scope.getMAG=function (goods) {
            localStorage.setItem("mg",JSON.stringify(goods));
            window.history.go(-1)
        }
    }])

