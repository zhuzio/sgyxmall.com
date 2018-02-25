yx_mallApp
    .controller("allianceOrderAuditController",["$scope","appService","$state","$stateParams",function ($scope,appService,$state,$stateParams) {
        document.title = "联盟订单审核";
        $scope.aoa={
            userInfo:[],
            //显示  未审核
            isAudit:true,
            isAuditMo:true,
            //显示  已通过
            isPass:false,
            isPassMo:false,
            //显示  已驳回
            isReject:false,
            isRejectMo:false,
            //显示通过 和 驳回按钮
            isBtn:true,
            //显示 三个加载更多 的状态
            more_pas:false,
            more_rej:false,
            more_aud:false,
            // 三个模块的page初始化
            pasPage:1,
            rejPage:1,
            audPage:1,
            //显示 搜索栏
            isSearchMo:true,
            //待审核数据
            waitAudit:[],
            //已通过数据
            havePass:[],
            //已驳回数据
            haveReject:[],
            is_check:0,
            // 搜索条件
            merchantAccount:"",
            shopName:"",
            buyerAccount:"",
            // 初始化totalPage
            TAudPage:0,
            TPasTPage:0,
            TRejTPage:0,
            // 批量操作
            aoaCA:true,
            //选择操作
            choseDo:true,
            //全部通过
            passAll:false,
            //全部驳回
            rejAll:false,
            //批量操作弹出层
            doAll:false


        };
        $scope.aoa.userInfo = JSON.parse(localStorage.getItem("userInfo"));
        //tab 切换
        $scope.changeAoAMo=function (idx) {
            switch (idx){
                case 1:
                    $scope.aoa.isAudit = true;
                    $scope.aoa.isAuditMo= true;

                    $scope.aoa.isPass = false;
                    $scope.aoa.isPassMo = false;

                    $scope.aoa.isReject = false;
                    $scope.aoa.isRejectMo = false;

                    $scope.aoa.isSearchMo = true;
                    $scope.aoa.is_check = 0;

                    $scope.aoa.audPage=1;

                    $scope.getDatas(idx,$scope.aoa.is_check);
                    $(".aoaCenter").css("margin-top","2.8rem");
                    break;
                case 2:
                    $scope.aoa.isAudit = false;
                    $scope.aoa.isAuditMo= false;

                    $scope.aoa.isPass = true;
                    $scope.aoa.isPassMo = true;

                    $scope.aoa.isReject = false;
                    $scope.aoa.isRejectMo = false;

                    $scope.aoa.isSearchMo = false;
                    $scope.aoa.is_check = 1;

                    $scope.aoa.pasPage=1;

                    $scope.getDatas(idx,$scope.aoa.is_check);
                    $(".aoaCenter").css("margin-top","1.8rem");
                    break;
                case 3:
                    $scope.aoa.isAudit = false;
                    $scope.aoa.isAuditMo= false;

                    $scope.aoa.isPass = false;
                    $scope.aoa.isPassMo = false;

                    $scope.aoa.isReject = true;
                    $scope.aoa.isRejectMo = true;

                    $scope.aoa.isSearchMo = false;
                    $scope.aoa.is_check = 2;

                    $scope.aoa.rejPage=1;

                    $scope.getDatas(idx,$scope.aoa.is_check);
                    $(".aoaCenter").css("margin-top","1.8rem");
                    break;
            }
        };

        // 请求数据
        $scope.getDatas=function(idx,is_check) {
            /*
            * 0 . 待审核
            * 1 . 审核通过
            * 2 . 驳回
            * */
            var aoaData=appService._postData(URL+"index.php?s=Api/order/auditorder",{
                token:$scope.aoa.userInfo.token,
                way:$scope.aoa.userInfo.way,
                page:1,
                is_check:is_check
            });
            aoaData.then(function (value) {
                console.log(value);
                switch (idx){
                    case 1:
                        $scope.aoa.waitAudit = value.data.data;
                        $scope.aoa.TAudPage = value.data.totalpage;
                        if ($scope.aoa.TAudPage > 1){
                            $scope.aoa.more_aud = true;
                        }
                        break;
                    case 2:
                        $scope.aoa.havePass = value.data.data;
                        $scope.aoa.TPasTPage = value.data.totalpage;
                        break;
                    case 3:
                        $scope.aoa.haveReject = value.data.data;
                        $scope.aoa.TRejTPage = value.data.totalpage;
                        break;
                }
            },function (reason) {
                console.log(reason)
            })
        };
        $scope.getDatas(1,0);
        //  通过/驳回申请
        $scope.aoaReject=function (sta,orderId,eve) {

            var aoaReject = appService._postData(URL+"index.php?s=Api/shop_center1/check_order",{
                token:$scope.aoa.userInfo.token,
                way:$scope.aoa.userInfo.way,
                order_sn:orderId,
                is_check:sta,
                order_type:"offline"
            });
                aoaReject.then(function (value) {
                    console.log(value);
                    if (value.data.ret == "success"){
                        switch (sta){
                            // 审核驳回
                            case 2:
                                $(eve.target).parents(".aoaAudit").find(".boH").css("display","block");
                                $scope.aoa.isBtn = false;
                                break;
                            // 审核通过
                            case 1:
                                $(eve.target).parents(".aoaAudit").find(".Tong").css("display","block");
                                $scope.aoa.isBtn = false;
                                break;
                        }
                    }else {
                        alert(value.data.msg);
                        return false;
                    }
                },function (reason) {
                    console.log(reason)
                })
        };
        //  搜索条件
        $scope.searchAud=function () {
            var searchAud=appService._postData(URL+"index.php?s=Api/order/auditorder",{
                token:$scope.aoa.userInfo.token,
                way:$scope.aoa.userInfo.way,
                page:1,
                is_check:0,
                user_name:$scope.aoa.merchantAccount,
                store_name:$scope.aoa.shopName,
                buy_name:$scope.aoa.buyerAccount
            });
                searchAud.then(function (value) {
                    $scope.aoa.waitAudit = value.data.data;
                },function (reason) {
                    console.log(reason)
                })
        };

        $scope.addMoreData=function (idx,page,is_check) {
            console.log(page)
            var addMoreData = appService._postData(URL+"index.php?s=Api/order/auditorder",{
                token:$scope.aoa.userInfo.token,
                way:$scope.aoa.userInfo.way,
                page:page,
                is_check:is_check
            });
                addMoreData.then(function (value) {
                    console.log(value);
                    if (value.data.data == ""){
                        switch (idx){
                            case 1:
                                $scope.aoa.more_aud = false;
                                break;
                            case 2:
                                $scope.aoa.more_pas = false;
                                break;
                            case 3:
                                $scope.aoa.more_rej = false;
                                break;
                        }
                    };
                    for (var i in value.data.data){
                        switch (idx){
                            case 1:
                                $scope.aoa.waitAudit.push((value.data.data)[i]);
                                break;
                            case 2:
                                $scope.aoa.havePass.push((value.data.data)[i]);
                                break;
                            case 3:
                                $scope.aoa.haveReject.push((value.data.data)[i]);
                                break;
                        }
                    }
                },function (reason) {
                    console.log(reason)
                })
        };
        // 点击加载更多
        $scope.aoaAddMore=function (idx) {
            console.log(idx)
            switch (idx){
                case 1:
                    $scope.aoa.audPage+=1;
                    $scope.addMoreData(idx,$scope.aoa.audPage,0);
                    break;
                case 2:
                    $scope.aoa.pasPage+=1;
                    $scope.addMoreData(idx,$scope.aoa.pasPage,1);
                    break;
                case 3:
                    $scope.aoa.rejPage+=1;
                    $scope.addMoreData(idx,$scope.aoa.rejPage,2);
                    break;
            }
        };

        // 批量操作 弹出层
        $scope.aoaCheckAll=function () {
           $scope.aoa.doAll = true;
        };
        $scope.whatDo=function (idx) {
            /*
            * 0 :取消操作
            * 1 ：全部通过按钮
            * 2 ：全部驳回按钮
            * 3 ：全部通过操作
            * 4 ：全部驳回操作
            *
            * */
            switch (idx){
                case 0:
                    $scope.aoa.doAll = false;
                    $scope.aoa.choseDo = true;
                    $scope.aoa.passAll = false;
                    $scope.aoa.rejAll = false;
                    break;
                case 1:
                    $scope.aoa.choseDo = false;
                    $scope.aoa.passAll = true;
                    $scope.aoa.rejAll = false;
                    break;
                case 2:
                    $scope.aoa.choseDo = false;
                    $scope.aoa.passAll = false;
                    $scope.aoa.rejAll = true;
                    break;
                case 3:



            }
        }

    }])