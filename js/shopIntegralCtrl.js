yx_mallApp
    .controller("shopIntegralController",["$scope","appService",function ($scope,appService) {
        document.title = '购物积分优惠专区'
        $scope.sig={
            className:[],
            goodsList:[],
            Idx:0,
            classNameLength:0,
            allAddMore:false,
            nowPage:1
        };
        $scope.getDefGoodsInfo =function (idx,sta,page) {
            var sigData = appService._postData(URL+'index.php?s=/Api/Goods/moneyGoods/',{
                cate_id:'',
                page:$scope.sig.nowPage
            });
            sigData.then(function (value) {
                var noDatas = value.data.data == undefined || value.data.data == null || value.data.data == "" ;
                if (page==1){
                    if (noDatas){
                        $scope.sig.allAddMore = false;
                    }else {
                        $scope.sig.goodsList = value.data.data;
                        if (value.data.data.totalPage == 1){
                            $scope.sig.allAddMore = false;
                        }else {
                            $scope.sig.allAddMore = true;
                        }
                    }
                }else {
                    if (noDatas){
                        $scope.sig.allAddMore = false;
                    }else {
                        for (var i in value.data.data){
                            $scope.sig.goodsList.push((value.data.data)[i])
                        }
                    }
                }
            },function (reason) {
                console.log(reason)
            })
        }
        var sigDetailCache = $cache.getCache("sigDetail");
        console.log(sigDetailCache)
        if (sigDetailCache) {
            $scope.sig = sigDetailCache.currentData;
            setTimeout(function () {
                $(window).scrollTop(sigDetailCache.scrollHeight)
            }, 0)
        } else {
            /*var sigDatas = appService._postData(URL+'index.php?s=/Api/Goods/moneyGoods/',{
                cate_id:'',
                page:$scope.sig.nowPage
            });
            sigDatas.then(function (value) {
                $scope.sig.goodsList = value.data.data;
                if (value.data.data.totalPage > 1){
                    $scope.sig.allAddMore = true;
                }
            },function (reason) {

            })*/
            $scope.getDefGoodsInfo('','',$scope.sig.nowPage)
        }
        // 获得购物积分专区 分类名称
        var shopIntergral =appService._getData(URL+'index.php?s=/Api/Classify/moneyGoodsCate');
            shopIntergral.then(function (value) {
                $scope.sig.classNameLength = value.data.data.length;
                $scope.sig.className = value.data.data;
               setTimeout(function () {
                   switch ($scope.sig.classNameLength) {
                       case 1:
                           $(".sigListHead p").css("width","100%");
                           break;
                       case 2:
                           $(".sigListHead p").css("width","50%");
                           break;
                       case 3:
                           $(".sigListHead p").css("width","33.3333%");
                           break;
                       case 4:
                           $(".sigListHead p").css("width","25%");
                           break;
                       case 5:
                           $(".sigListHead p").css("width","20%");
                           break;
                       case 6:
                           $(".sigListHead p").css({width:'16.666%'});
                           break;
                       default:
                            $(".sigListHead p").css({width:'1.2rem'});
                            $(".sigListHead div").css({width:1.2*6+'rem'});
                            break;
                   }
               },0)
            },function (reason) {
                console.log(reason)
            })
        // tab点击事件
        $scope.changeSigTab=function (ele,idx) {
                console.log(ele)
            $scope.sig.Idx = idx
            $scope.getDefGoodsInfo(ele.cate_id)
        }

        // $scope.getDefGoodsInfo('','',$scope.sig.nowPage)
        $scope.sigDataAdd =function () {
            $scope.sig.nowPage+=1;
            $scope.getDefGoodsInfo('','',$scope.sig.nowPage)
        };

        var currentScrollHeight;
        $(window).scroll(function (e) {
            currentScrollHeight = $(window).scrollTop()
        });
        $scope.$on("$destroy", function () {
            $cache.remove("sigDetail");
            var scrollHeight = currentScrollHeight, currentData = $scope.sig;
            $cache.setCache("sigDetail", {scrollHeight: scrollHeight, currentData: currentData})
        })
    }])