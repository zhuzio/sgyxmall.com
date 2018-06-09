yx_mallApp
    .controller("shopIntegralController",["$scope","appService",function ($scope,appService) {
        document.title = '购物积分专区'
        $scope.sig={
            className:[],
            goodsList:[],
            Idx:0,
            classNameLength:0
        };
        // 获得购物积分专区 分类名称
        var shopIntergral =appService._getData(URL+'index.php?s=/Api/Classify/moneyGoodsCate');
            shopIntergral.then(function (value) {
                console.log( value.data.data)
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
        $scope.getDefGoodsInfo =function (idx) {
            var sigData = appService._getData(URL+'index.php?s=/Api/Goods/moneyGoods/cate_id/'+idx+'');
            sigData.then(function (value) {
                console.log(value.data.data)
                $scope.sig.goodsList = value.data.data
            },function (reason) {
                console.log(reason)
            })
        }
        $scope.getDefGoodsInfo(5)
    }])