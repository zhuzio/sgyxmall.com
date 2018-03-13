//我的地址页面 控制器
yx_mallApp
    .controller("addressController",["$scope","appService","$state",function ($scope,appService,$state) {
        $scope.address={
            txt:"编辑",
            addressInfo:[],
            userInfo:[]
        };
        $scope.address.userInfo = JSON.parse(localStorage.getItem("userInfo"));
        // 获取收货地址列表
        var addressList = appService._postData(URL+"index.php?s=/Api/user/getAddress",{
            token:$scope.address.userInfo.token,
            way:$scope.address.userInfo.way,
            apiType:"all"
        });
            addressList.then(function (value) {
                console.log(value);
                $scope.address.addressInfo = value.data.data
            },function (reason) {
                console.log(reason)
            })
        //点击 出现 编辑 或者 完成
        $scope.checkis=function (e) {
            if(e.isCheck){
                $scope.address.txt = "完成";
                $('.ads_delete').animate({
                    right:"0"
                },300);
            }else {
                $scope.address.txt = "编辑";
                $('.ads_delete').animate({
                    right:"-20%"
                },300);
            }
        };
        //删除地址
        $scope.deleteAddress=function (ele,idx,ads) {
            ele.splice(idx,1);
            console.log(ads)
            var delAddress=appService._postData(URL+"index.php?s=/Api/user/delAddress",{
                token:$scope.address.userInfo.token,
                way:$scope.address.userInfo.way,
                addr_id:ads.addr_id
            });
                delAddress.then(function (value) {
                    if (value.data.ret == "success"){
                        alert(value.data.msg);
                    }else {
                        alert(value.data.msg);
                        return false;
                    }
                },function (reason) {
                    console.log(reason)
                })
        }

    }])