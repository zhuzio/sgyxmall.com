yx_mallApp
    .controller("merchantAuditController",["$scope","appService","$state",function ($scope,appService,$state) {
        document.title = "商家审核";
        $scope.mcAd={
            userInfo:[],
            mcAdList:[],
            page:1,
            more:true,
            moreTxt:false,
            totalPage:0,
            //搜索的账号
            account:"",
            //搜索开始时间
            beginTime:"",
            //搜索结束时间
            endTime:"",
            //初始点击加载更过
            benginMore:true,
            seaMore:false,
            //是否是
            isWhich:"",
            //状态
            ste:"",
            //商家ID
            mcId:""

        };
        //用户信息
        $scope.mcAd.userInfo = JSON.parse(localStorage.getItem("userInfo"));
        //请求审核列表
        var mcAdInfo=appService._postData(URL+"index.php?s=Api/shop_center1/checkStoreList",{
            token:$scope.mcAd.userInfo.token,
            // way:$scope.mcAd.userInfo.way
        });
            mcAdInfo.then(function (value) {
                $scope.mcAd.mcAdList = value.data.data;
                $scope.mcAd.totalPage = value.data.totalpage;
            },function (reason) {
                console.log(reason)
            });

        var time1,time2;
        //搜索
        $scope.mcAdSearch=function () {
            $scope.mcAd.totalPage = 0;
            $scope.mcAd.page = 1;
            $scope.mcAd.benginMore = false;
            $scope.mcAd.seaMore = true;
            $scope.mcAd.moreTxt = false;
            if ($scope.mcAd.beginTime == ""){
                time1 = ""
            }else {
                time1 = ($scope.mcAd.beginTime).toLocaleDateString().replace(/\//g,"-");
            };
            if($scope.mcAd.endTime == ""){
                time2 =""
            }else {
                time2 = ($scope.mcAd.endTime).toLocaleDateString().replace(/\//g,"-");
            }
            var mcAdSearchInfo=appService._postData(URL+"index.php?s=Api/shop_center1/checkStoreList",{
                token:$scope.mcAd.userInfo.token,
                // way:$scope.mcAd.userInfo.way,
                user_name:$scope.mcAd.account,
                totime:time1,
                fortime:time2
            });
                mcAdSearchInfo.then(function (value) {
                    $scope.mcAd.mcAdList = value.data.data;
                    $scope.mcAd.totalPage = value.data.totalpage;
                    if ($scope.mcAd.totalPage == 1){
                        $scope.mcAd.seaMore = false;
                        $scope.mcAd.moreTxt = true;
                    }
                },function (reason) {
                    console.log(reason)
                })
        };
        //加载更多
        $scope.addBaseMore=function (idx) {
            switch (idx){
                //初始点击加载更多
                case 1:
                    $scope.mcAd.page=$scope.mcAd.page+1;
                    if ($scope.mcAd.page > $scope.mcAd.totalPage){
                        $scope.mcAd.moreTxt = true;
                        $scope.mcAd.benginMore = false;
                    }else {
                        var moreMcAdInfo=appService._postData(URL+"index.php?s=Api/shop_center1/checkStoreList",{
                            page:$scope.mcAd.page,
                            token:$scope.mcAd.userInfo.token,
                            // way:$scope.mcAd.userInfo.way
                        });
                        moreMcAdInfo.then(function (value) {
                            for (var i in value.data.data){
                                $scope.mcAd.mcAdList.push((value.data.data)[i])
                            };
                        },function (reason) {
                            console.log(reason)
                        });
                    };
                    break;
                    //搜索后点击加载更多
                case 2:
                    console.log($scope.mcAd.totalPage)
                    $scope.mcAd.page=$scope.mcAd.page+1;
                    if ($scope.mcAd.page > $scope.mcAd.totalPage){
                        $scope.mcAd.moreTxt = true;
                        $scope.mcAd.seaMore = false;
                    }else {
                        var mcAdSearchInfo=appService._postData(URL+"index.php?s=Api/shop_center1/checkStoreList",{
                            token:$scope.mcAd.userInfo.token,
                            // way:$scope.mcAd.userInfo.way,
                            user_name:$scope.mcAd.account,
                            totime:time1,
                            fortime:time2,
                            page:$scope.mcAd.page
                        });
                        mcAdSearchInfo.then(function (value) {
                            for (var i in value.data.data){
                                $scope.mcAd.mcAdList.push((value.data.data)[i])
                            };
                        },function (reason) {
                            console.log(reason)
                        })
                    };
                    break;
            }
        };
        //通过申请
        $scope.mcAdAgree=function (isP,sId) {
            var mcAdAgree=appService._postData(URL+"index.php?s=Api/shop_center1/checkStore",{
                token:$scope.mcAd.userInfo.token,
                // way:$scope.mcAd.userInfo.way,
                store_id:sId,
                state:isP
            });
                mcAdAgree.then(function (value) {
                    console.log(value)
                },function (reason) {
                    console.log(reason  )
                })
        };
        //是否
        $scope.mcAdIs=function (isOne,sta,mcId) {
            switch (isOne){
                //是否优质商家
                case 0:
                    $scope.mcAd.ste = sta;
                    $scope.mcAd.mcId = mcId;
                    $scope.mcAd.isWhich = "is_good";
                    break;
                //是否交易
                case 1:
                    $scope.mcAd.ste = sta;
                    $scope.mcAd.mcId = mcId;
                    $scope.mcAd.isWhich = "is_trade";
                    break;
                //是否显示店铺
                case 2:
                    $scope.mcAd.ste = sta;
                    $scope.mcAd.mcId = mcId;
                    $scope.mcAd.isWhich = "is_show";
                    break;
            };
            var isWhat = appService._postData(URL+"index.php?s=Api/shop_center1/functionStore",{
                token:$scope.mcAd.userInfo.token,
                // way:$scope.mcAd.userInfo.way,
                field:$scope.mcAd.isWhich,
                state:$scope.mcAd.ste,
                store_id:$scope.mcAd.mcId
            });
                isWhat.then(function (value) {
                    // console.log(value)
                },function (reason) {
                    console.log(reason)
                })

        }


    }]);