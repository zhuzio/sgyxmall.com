yx_mallApp
    .controller("merchantOrderController",["$scope","appService",function ($scope,appService) {
        document.title = "商家订单";
        $scope.MOrder={

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

            //展示数据模块
            moduel:false,
            moduelName:"查看收入",
            moduelNum:9
        };
        $scope.MOrder.userInfo = JSON.parse(localStorage.getItem("userInfo"));
        // 获取数据

        // 点击查看 支出和 收入
        $scope.changeOutIn=function () {
            $scope.MOrder.moduel = !$scope.MOrder.moduel;
            if ($scope.MOrder.moduel){
                $scope.MOrder.moduelName = "查看支出";
                $scope.MOrder.moduelNum = 3;

            }else {
                $scope.MOrder.moduelName = "查看收入";
                $scope.MOrder.moduelNum = 9
            };
            $scope.MOrder.waitAudit = [];
            $scope.MOrder.isAudit = true;
            $scope.MOrder.isAuditMo= true;

            $scope.MOrder.isPass = false;
            $scope.MOrder.isPassMo = false;

            $scope.MOrder.isReject = false;
            $scope.MOrder.isRejectMo = false;

            $scope.MOrder.AudNoData = false;
            $scope.MOrder.PasNoData = false;
            $scope.MOrder.RejNoData = false;

            $scope.getMOrderData(1,1,$scope.MOrder.moduelNum,0);
        };


        /*
        * is_cheeck : 0 未审核 1 通过 2驳回
        * payment_id:  3 收入  9 支出
        * */
        $scope.getMOrderData=function (idx,page,paymentId,isCheck) {
            var datas=appService._postData(URL+"index.php?s=Api/order/storeorderoffline",{
                token:$scope.MOrder.userInfo.token,
                // way:$scope.MOrder.userInfo.way,
                page:page,
                payment_id:paymentId,
                is_check:isCheck
            });
            datas.then(function (value) {
                console.log(value);
                var noDatas = value.data.data == "" || value.data.data == undefined ||value.data.data == null;
                switch (paymentId){
                    //paymentId为查看的部分 9查看支出 3查看收入
                    case 9:
                        switch (idx){
                            // idx为tab按钮的值  1未审核模块 2已通过模块 3已驳回模块
                            case 1:
                                if (page == 1){
                                    if (noDatas){
                                        $scope.MOrder.AudNoData = true;
                                    }else{
                                        $scope.MOrder.AudNoData = false;
                                        $scope.MOrder.waitAudit = value.data.data;
                                        $scope.MOrder.TAudPage = value.data.totalpage;
                                        if ($scope.MOrder.TAudPage > 1){
                                            $scope.MOrder.more_aud = true;
                                        };
                                    };
                                }else  if(page != 1){
                                    if (noDatas){
                                        $scope.MOrder.more_aud = false;
                                    }else {
                                        for (var i in value.data.data){
                                            $scope.MOrder.waitAudit.push((value.data.data)[i]);
                                        };
                                    };
                                };
                                break;
                            case 2:
                                if (page == 1){
                                    if (noDatas){
                                        $scope.MOrder.PasNoData = true;
                                    }else{
                                        $scope.MOrder.PasNoData = false;
                                        $scope.MOrder.havePass = value.data.data;
                                        $scope.MOrder.TPasTPage = value.data.totalpage;
                                        if ($scope.MOrder.TPasTPage > 1){
                                            $scope.MOrder.more_pas = true;
                                        };
                                    };
                                }else  if(page != 1){
                                    if (noDatas){
                                        $scope.MOrder.more_pas = false;
                                    }else {
                                        for (var i in value.data.data){
                                            $scope.MOrder.havePass.push((value.data.data)[i]);
                                        };
                                    };
                                };
                                break;
                            case 3:
                                if (page == 1){
                                    if (noDatas){
                                        $scope.MOrder.RejNoData = true;
                                    }else{
                                        $scope.MOrder.RejNoData = false;
                                        $scope.MOrder.haveReject = value.data.data;
                                        $scope.MOrder.TRejTPage = value.data.totalpage;
                                        if ($scope.MOrder.TRejTPage > 1){
                                            $scope.MOrder.more_rej = true;
                                        };
                                    };
                                }else  if(page != 1){
                                    if (noDatas){
                                        $scope.MOrder.more_rej = false;
                                    }else {
                                        for (var i in value.data.data){
                                            $scope.MOrder.haveReject.push((value.data.data)[i]);
                                        };
                                    };
                                };
                                break;
                        };
                        break;
                    case 3:
                        switch (idx){
                            // idx为tab按钮的值  1未审核模块 2已通过模块 3已驳回模块
                            case 1:
                                if (page == 1){
                                    if (noDatas){
                                        $scope.MOrder.AudNoData = true;
                                    }else{
                                        $scope.MOrder.AudNoData = false;
                                        $scope.MOrder.waitAudit = value.data.data;
                                        $scope.MOrder.TAudPage = value.data.totalpage;
                                        if ($scope.MOrder.TAudPage > 1){
                                            $scope.MOrder.more_aud = true;
                                        };
                                    };
                                }else  if(page != 1){
                                    if (noDatas){
                                        $scope.MOrder.more_aud = false;
                                    }else {
                                        for (var i in value.data.data){
                                            $scope.MOrder.waitAudit.push((value.data.data)[i]);
                                        };
                                    };
                                };
                                break;
                            case 2:
                                if (page == 1){
                                    if (noDatas){
                                        $scope.MOrder.PasNoData = true;
                                    }else{
                                        $scope.MOrder.PasNoData = false;
                                        $scope.MOrder.havePass = value.data.data;
                                        $scope.MOrder.TPasTPage = value.data.totalpage;
                                        if ($scope.MOrder.TPasTPage > 1){
                                            $scope.MOrder.more_pas = true;
                                        };
                                    };
                                }else  if(page != 1){
                                    if (noDatas){
                                        $scope.MOrder.more_pas = false;
                                    }else {
                                        for (var i in value.data.data){
                                            $scope.MOrder.havePass.push((value.data.data)[i]);
                                        };
                                    };
                                };
                                break;
                            case 3:
                                if (page == 1){
                                    if (noDatas){
                                        $scope.MOrder.RejNoData = true;
                                    }else{
                                        $scope.MOrder.RejNoData = false;
                                        $scope.MOrder.haveReject = value.data.data;
                                        $scope.MOrder.TRejTPage = value.data.totalpage;
                                        if ($scope.MOrder.TRejTPage > 1){
                                            $scope.MOrder.more_rej = true;
                                        };
                                    };
                                }else  if(page != 1){
                                    if (noDatas){
                                        $scope.MOrder.more_rej = false;
                                    }else {
                                        for (var i in value.data.data){
                                            $scope.MOrder.haveReject.push((value.data.data)[i]);
                                        };
                                    };
                                };
                                break;
                        };
                        break
                };
            },function (reason) {
                console.log(reason)
            })
        };
        // getMOrderData 五个参数 tab切换传值  page值 paymentId值 isCheck值
        $scope.getMOrderData(1,1,9,0);
        // tab 切换
        $scope.changeMOrderMo=function (idx) {
            switch (idx){
                case 1:
                    $scope.MOrder.isAudit = true;
                    $scope.MOrder.isAuditMo= true;

                    $scope.MOrder.isPass = false;
                    $scope.MOrder.isPassMo = false;

                    $scope.MOrder.isReject = false;
                    $scope.MOrder.isRejectMo = false;

                    $scope.MOrder.isSearchMo = true;
                    $scope.MOrder.status = 0;

                    $scope.MOrder.AudNoData = false;

                    $scope.MOrder.waitAudit = [];

                    $scope.getMOrderData(idx,1,$scope.MOrder.moduelNum,$scope.MOrder.status);
                    break;
                case 2:
                    $scope.MOrder.isAudit = false;
                    $scope.MOrder.isAuditMo= false;

                    $scope.MOrder.isPass = true;
                    $scope.MOrder.isPassMo = true;

                    $scope.MOrder.isReject = false;
                    $scope.MOrder.isRejectMo = false;

                    $scope.MOrder.isSearchMo = false;
                    $scope.MOrder.status = 1;

                    $scope.MOrder.PasNoData = false;

                    $scope.MOrder.havePass = [];

                    $scope.getMOrderData(idx,1,$scope.MOrder.moduelNum,$scope.MOrder.status);
                    break;
                case 3:
                    $scope.MOrder.isAudit = false;
                    $scope.MOrder.isAuditMo= false;

                    $scope.MOrder.isPass = false;
                    $scope.MOrder.isPassMo = false;

                    $scope.MOrder.isReject = true;
                    $scope.MOrder.isRejectMo = true;

                    $scope.MOrder.isSearchMo = false;
                    $scope.MOrder.status = 2;

                    $scope.MOrder.RejNoData = false;

                    $scope.MOrder.haveReject = [];

                    $scope.getMOrderData(idx,1,$scope.MOrder.moduelNum,$scope.MOrder.status);
                    break;
            }
        };
        // 点击加载更多
        $scope.MOAddMore=function (idx) {
            switch (idx){
                case 1:
                    $scope.MOrder.pasPage+=1;
                    break;
                case 2:
                    $scope.MOrder.rejPage+=1;
                    $scope.getMOrderData(idx,$scope.MOrder.rejPage,$scope.MOrder.moduelNum,1)
                    break;
                case 3:
                    $scope.MOrder.audPage+=1;
                    break;
            };
        };
    }]);