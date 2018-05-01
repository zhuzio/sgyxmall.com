yx_mallApp
    .controller("myMemberController",["$scope","appService","$state","$stateParams",function ($scope,appService,$state,$stateParams) {
        document.title="我的会员";
        $scope.member={
            userInfo:[],
            isPull:false,
            //默认筛选框的值：
            selectTxt:"会员",
            // 会员
            memberInfo:[],
            memberMo:true,
            memberInfoNoData:false,
            memberInfoAddMore:false,
            memberInfoPage:1,
            memberInfoTotalPage:0,

            // 商家
            merchantInfo:[],
            merchantMo:false,
            merchantInfoNoData:false,
            merchantInfoAddMore:false,
            merchantInfoPage:1,
            merchantInfoTotalPage:0,
            // 代理
            agencyInfo:[],
            agencyMo:false,
            agencyInfoNoData:false,
            agencyInfoAddMore:false,
            agencyInfoPage:1,
            agencyInfoTotalPage:0,
            // 辖区会员
            areaMemberInfo:[],
            areaMemberMo:false,
            areaMemberInfoNoData:false,
            areaMemberInfoAddMore:false,
            areaMemberInfoPage:1,
            areaMemberInfoTotalPage:0,
            //辖区商家
            areaMerchantInfo:[],
            areaMerchantMo:false,
            areaMerchantInfoNoData:false,
            areaMerchantInfoAddMore:false,
            areaMerchantInfoPage:1,
            areaMerchantInfoTotalPage:0,

            roleType:$stateParams.role,
            isAll:false,

            memberType:1,
            memberTypeState:1

        };
        $scope.member.userInfo =JSON.parse(localStorage.getItem("userInfo"));
        //下拉列表
        $scope.getPullList=function () {
            $(".mmPullDownList").toggleClass("mmIcon_on");
            $scope.checkClass();
        };
        //下拉列表的点击事件
        $scope.getFilterType=function (idx,txt) {
            $scope.member.selectTxt = txt;
            $(".mmPullDownList").removeClass("mmIcon_on");
            $scope.checkClass();
            switch (idx){
                case 1:
                    $scope.member.memberType = 1;
                    $scope.member.memberTypeState = 1;

                    $scope.member.memberMo = true;
                    $scope.member.merchantMo = false;
                    $scope.member.agencyMo = false;
                    $scope.member.areaMemberMo = false;
                    $scope.member.areaMerchantMo = false;

                    $scope.getMemberInfo($scope.member.memberType,$scope.member.memberTypeState,1,idx);

                    break;
                case 2:
                    $scope.member.memberType = 1;
                    $scope.member.memberTypeState = 2;

                    $scope.member.memberMo = false;
                    $scope.member.merchantMo = true;
                    $scope.member.agencyMo = false;
                    $scope.member.areaMemberMo = false;
                    $scope.member.areaMerchantMo = false;

                    $scope.getMemberInfo($scope.member.memberType,$scope.member.memberTypeState,1,idx);

                    break;
                case 3:
                    $scope.member.memberType = 1;
                    $scope.member.memberTypeState = 4;

                    $scope.member.memberMo = false;
                    $scope.member.merchantMo = false;
                    $scope.member.agencyMo = true;
                    $scope.member.areaMemberMo = false;
                    $scope.member.areaMerchantMo = false;

                    $scope.getMemberInfo($scope.member.memberType,$scope.member.memberTypeState,1,idx);

                    break;
                case 4:
                    $scope.member.memberType = 4;
                    $scope.member.memberTypeState = 1;

                    $scope.member.memberMo = false;
                    $scope.member.merchantMo = false;
                    $scope.member.agencyMo = false;
                    $scope.member.areaMemberMo = true;
                    $scope.member.areaMerchantMo = false;

                    $scope.getMemberInfo($scope.member.memberType,$scope.member.memberTypeState,1,idx);

                    break;
                case 5:
                    $scope.member.memberType = 5;
                    $scope.member.memberTypeState = 2;

                    $scope.member.memberMo = false;
                    $scope.member.merchantMo = false;
                    $scope.member.agencyMo = false;
                    $scope.member.areaMemberMo = false;
                    $scope.member.areaMerchantMo = true;

                    $scope.getMemberInfo($scope.member.memberType,$scope.member.memberTypeState,1,idx);

                    break;
            }
        };
        if ($scope.member.roleType == 1 ||$scope.member.roleType == 2){
            $scope.member.isAll = false;
        }else {
            $scope.member.isAll = true;
        }
        //检测class的名字的存在
        $scope.checkClass=function () {
            var isP = $(".mmPullDownList").attr("class").indexOf("mmIcon_on");
            if(isP != -1){
                $(".mmPullDown").animate({
                    left:"-0.2rem",
                    opacity:"1"
                },500);
            }else {
                $(".mmPullDown").animate({
                    left:"-3rem",
                    opacity:"0"
                },500);
            }
        };
        // 获得全部会员信息

        /*
        *   type :1查看推荐人是本人的（所有角色）【会员和商家】 or 4 社区下所有的人【区域代理】 5辖区下所有人【县代】
         *  type_state:区分身份键名 (1-5^3)
         *

        * */
        $scope.getMemberInfo=function (type,typeState,page,idx) {
            var myMebAll = appService._postData(URL+"index.php?s=api/user/myteam",{
                token:$scope.member.userInfo.token,
                // way:$scope.member.userInfo.way,
                type:type,
                type_state:typeState,
                page:page,
            });
            myMebAll.then(function (value) {
                // console.log(value)
                var noData = value.data.data == "" || value.data.data == undefined ||value.data.data == null;

                switch (idx){
                    case 1:
                        if(page == 1){
                            if (noData){
                                $scope.memberInfoNoData = true;
                            }else {
                                $scope.member.memberInfo = value.data.data;
                                $scope.member.memberInfoTotalPage = value.data.totalpage;
                                if ($scope.member.memberInfoTotalPage > 1){
                                    $scope.member.memberInfoAddMore = true;
                                };
                            };
                        }else {
                            if (noData){
                                $scope.member.memberInfoAddMore = false;
                            }else {
                                for (var i in value.data.data){
                                    $scope.member.memberInfo.push((value.data.data)[i]);
                                };
                            };
                        };
                        break;
                    case 2:
                        if(page == 1){
                            if (noData){
                                $scope.member.merchantInfoNoData  = true;
                            }else {
                                $scope.member.merchantInfo = value.data.data;
                                $scope.member.merchantInfoTotalPage = value.data.totalpage;
                                if ($scope.member.merchantInfoTotalPage > 1){
                                    $scope.member.merchantInfoAddMore = true;
                                };
                            };
                        }else {
                            if (noData){
                                $scope.member.merchantInfoAddMore = false;
                            }else {
                                for (var i in value.data.data){
                                    $scope.member.merchantInfo.push((value.data.data)[i]);
                                };
                            };
                        };
                        break;
                    case 3:
                        if(page == 1){
                            if (noData){
                                $scope.member.agencyInfoNoData = true;
                            }else {
                                $scope.member.agencyInfo = value.data.data;
                                $scope.member.agencyInfoTotalPage = value.data.totalpage;
                                if ($scope.member.agencyInfoTotalPage > 1){
                                    $scope.member.agencyInfoAddMore = true;
                                };
                            };
                        }else {
                            if (noData){
                                $scope.member.agencyInfoAddMore = false;
                            }else {
                                for (var i in value.data.data){
                                    $scope.member.agencyInfo.push((value.data.data)[i]);
                                };
                            };
                        };
                        break;
                    case 4:
                        if(page == 1){
                            if (noData){
                                $scope.member.areaMemberInfoNoData = true;
                            }else {
                                $scope.member.areaMemberInfo = value.data.data;
                                $scope.member.areaMemberInfoTotalPage = value.data.totalpage;
                                if ($scope.member.areaMemberInfoTotalPage > 1){
                                    $scope.member.areaMemberInfoAddMore = true;
                                };
                            };
                        }else {
                            if (noData){
                                $scope.member.areaMemberInfoAddMore = false;
                            }else {
                                for (var i in value.data.data){
                                    $scope.member.areaMemberInfo.push((value.data.data)[i]);
                                };
                            };
                        };
                        break;
                    case 5:
                        if(page == 1){
                            if (noData){
                                $scope.member.areaMerchantInfoNoData = true;
                            }else {
                                $scope.member.areaMerchantInfo = value.data.data;
                                $scope.member.areaMerchantInfoTotalPage = value.data.totalpage;
                                if ($scope.member.areaMerchantInfoTotalPage > 1){
                                    $scope.member.areaMerchantInfoAddMore = true;
                                };
                            };
                        }else {
                            if (noData){
                                $scope.member.areaMerchantInfoAddMore = false;
                            }else {
                                for (var i in value.data.data){
                                    $scope.member.areaMerchantInfo.push((value.data.data)[i]);
                                };
                            };
                        };
                        break;

                }
            },function (reason) {
                console.log(reason)
            })
        };
        $scope.getMemberInfo($scope.member.memberType,$scope.member.memberTypeState,1,1);
        // 点击加载更多
        $scope.memberAddMore=function (idx) {
            switch (idx){
                case 1:
                    $scope.member.memberInfoPage+=1;
                    $scope.getMemberInfo($scope.member.memberType,$scope.member.memberTypeState,$scope.member.memberInfoPage,idx);
                    break;
                case 2:
                    $scope.member.merchantInfoPage+=1;
                    $scope.getMemberInfo($scope.member.memberType,$scope.member.memberTypeState,$scope.member.merchantInfoPage,idx);
                    break;
                case 3:
                    $scope.member.agencyInfoPage+=1;
                    $scope.getMemberInfo($scope.member.memberType,$scope.member.memberTypeState,$scope.member.agencyInfoPage,idx);
                    break;
                case 4:
                    $scope.member.areaMemberInfoPage+=1;
                    $scope.getMemberInfo($scope.member.memberType,$scope.member.memberTypeState,$scope.member.areaMemberInfoPage,idx);
                    break;
                case 5:
                    $scope.member.areaMerchantInfoPage+=1;
                    $scope.getMemberInfo($scope.member.memberType,$scope.member.memberTypeState,$scope.member.areaMerchantInfoPage,idx);
                    break;
            }
        }

    }]);