yx_mallApp
    .controller("allianceOrderController",["$scope","appService",function ($scope,appService) {
        document.title="联盟订单";
        $scope.ao={
            userInfo:[],
            page:1,

            isAudit:true,
            isPass:false,
            isReject:false,

            isAuditMo:true,
            isPassMo:false,
            isRejectMo:false,

            waitAudit:[],
            havePass:[],
            haveReject:[],

            more_aud:false,
            more_pas:false,
            more_rej:false,

            pasPage:1,
            rejPage:1,
            audPage:1,

            // 初始化totalPage
            TAudPage:0,
            TPasTPage:0,
            TRejTPage:0,

            status:0,

            //暂无数据
            AudNoData:false,
            PasNoData:false,
            RejNoData:false,


        };
        $scope.ao.userInfo = JSON.parse(localStorage.getItem("userInfo"));

        $scope.getAoData=function (idx,page,status) {
            var allianceOrder = appService._postData(URL+"index.php?s=Api/order/personoffline",{
                token:$scope.ao.userInfo.token,
                // way:$scope.ao.userInfo.way,
                page:page,
                /*
                * status : 0 未审核 1 已审核 2 已驳回
                *
                * */
                status:status
            });
            allianceOrder.then(function (value) {
                console.log(value);
                switch (idx){
                    case 1:
                        $scope.ao.waitAudit = value.data.data;
                        if ($scope.ao.waitAudit == "" || $scope.ao.waitAudit == null || $scope.ao.waitAudit == undefined){
                            $scope.ao.AudNoData = true ;
                        }
                        $scope.ao.TAudPage = value.data.totalpage;
                        if ($scope.ao.TAudPage > 1){
                            $scope.ao.more_aud = true;
                        }
                        break;
                    case 2:
                        $scope.ao.havePass = value.data.data;
                        if ($scope.ao.havePass == "" || $scope.ao.havePass == null || $scope.ao.havePass == undefined){
                            $scope.ao.PasNoData = true ;
                        }
                        $scope.ao.TPasTPage = value.data.totalpage;
                        if ($scope.ao.TPasTPage > 1){
                            $scope.ao.more_pas = true;
                        }
                        break;
                    case 3:
                        $scope.ao.haveReject = value.data.data;
                        if ($scope.ao.haveReject == "" || $scope.ao.haveReject == null || $scope.ao.haveReject == undefined){
                            $scope.ao.RejNoData = true ;
                        }
                        $scope.ao.TRejTPage = value.data.totalpage;
                        if ($scope.ao.TRejTPage > 1){
                            $scope.ao.more_rej = true;
                        }
                        break;
                }
            },function (reason) {
                console.log(reason)

            });
        };
        //默认情况请求  已通过  页数为 1 的数据
        $scope.getAoData(1,1,0);
        //tab切换
        $scope.changeAoMo=function (idx) {
            switch (idx){
                case 1:
                    $scope.ao.isAudit = true;
                    $scope.ao.isAuditMo= true;

                    $scope.ao.isPass = false;
                    $scope.ao.isPassMo = false;

                    $scope.ao.isReject = false;
                    $scope.ao.isRejectMo = false;

                    $scope.ao.isSearchMo = true;
                    $scope.ao.status = 0;

                    $scope.ao.audPage=1;

                    $scope.getAoData(idx,$scope.ao.audPage,$scope.ao.status);
                    break;
                case 2:
                    $scope.ao.isAudit = false;
                    $scope.ao.isAuditMo= false;

                    $scope.ao.isPass = true;
                    $scope.ao.isPassMo = true;

                    $scope.ao.isReject = false;
                    $scope.ao.isRejectMo = false;

                    $scope.ao.isSearchMo = false;
                    $scope.ao.status = 1;

                    $scope.ao.pasPage=1;

                    $scope.getAoData(idx,$scope.ao.pasPage,$scope.ao.status);
                    break;
                case 3:
                    $scope.ao.isAudit = false;
                    $scope.ao.isAuditMo= false;

                    $scope.ao.isPass = false;
                    $scope.ao.isPassMo = false;

                    $scope.ao.isReject = true;
                    $scope.ao.isRejectMo = true;

                    $scope.ao.isSearchMo = false;
                    $scope.ao.status = 2;

                    $scope.ao.rejPage=1;

                    $scope.getAoData(idx,$scope.ao.rejPage,$scope.ao.status);
                    break;
            }
        };
        //点击加载更多
        $scope.aoAddMore=function (idx) {
            switch (idx){
                case 1:
                    $scope.ao.audPage+=1;
                    $scope.aoAddMoreData(idx, $scope.ao.audPage,0);
                    break;
                case 2:
                    $scope.ao.pasPage+=1;
                    $scope.aoAddMoreData(idx, $scope.ao.pasPage,1);
                    break;
                case 3:
                    $scope.ao.rejPage+=1;
                    $scope.aoAddMoreData(idx, $scope.ao.rejPage,2);
                    break;
            }
        };
        $scope.aoAddMoreData=function (idx,page,sta) {
            var aoAddMoreData=appService._postData(URL+"index.php?s=Api/order/personoffline",{
                token:$scope.ao.userInfo.token,
                // way:$scope.ao.userInfo.way,
                page:page,
                // status : 0 未审核 1 已审核 2 已驳回
                status:sta
            });
                aoAddMoreData.then(function (value) {
                    console.log(value);
                    if (value.data.data == ""){
                        switch (idx){
                            case 1:
                                $scope.ao.more_aud = false;
                                break;
                            case 2:
                                $scope.ao.more_pas = false;
                                break;
                            case 3:
                                $scope.ao.more_rej = false;
                                break;
                        }
                    };
                    for (var i in value.data.data ){
                        switch (idx){
                            case 1:
                                $scope.ao.waitAudit.push((value.data.data)[i]);
                                break;
                            case 2:
                                $scope.ao.havePass.push((value.data.data)[i]);
                                break;
                            case 3:
                                $scope.ao.haveReject.push((value.data.data)[i]);
                                break;
                        }
                    }


                },function (reason) {
                    console.log(reason)
                })

        }

    }])