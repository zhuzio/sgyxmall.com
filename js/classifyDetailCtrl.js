//分类详情页面 控制器
yx_mallApp.controller("classifyDetailController", ["$scope", "$stateParams", "appService", function ($scope, $stateParams, appService) {
    document.title = "苏格严选商城--分类详情";
    $scope.classifyDetail = {
        detail: [],
        page: 1,
        search: "",
        addMore: false,
    };
    var classiftDetailCache = $cache.getCache("classifyDetail");
    if (classiftDetailCache) {
        $scope.classifyDetail = classiftDetailCache.currentData;
        setTimeout(function () {
            $(window).scrollTop(classiftDetailCache.scrollHeight)
        }, 0)
    } else {
        var classifyDetail = appService._postData(URL + "index.php?s=/Api/Classify/cateGoods", {
            cate_id: $stateParams.classifyId,
            page: $scope.classifyDetail.page
        });
        classifyDetail.then(function (e) {
            // console.log(e);
            $scope.classifyDetail.detail = e.data.data;
            if (e.data.totalpage > 1) {
                $scope.classifyDetail.addMore = true
            }
        }, function (e) {
            console.log(e)
        })
    }
    $scope.classifyDetailAddMore = function () {
        $scope.classifyDetail.page += 1;
        var classifyDetailAddMore = appService._postData(URL + "index.php?s=/Api/Classify/cateGoods", {
            cate_id: $stateParams.classifyId,
            page: $scope.classifyDetail.page
        });
        classifyDetailAddMore.then(function (e) {
            if (e.data.data == "" || e.data.data == null) {
                $scope.classifyDetail.addMore = false
            } else {
                for (var i in e.data.data) {
                    $scope.classifyDetail.detail.push((e.data.data)[i])
                }
            }
        }, function (e) {
            console.log(e)
        })
    };
    var currentScrollHeight;
    $(window).scroll(function (e) {
        currentScrollHeight = $(window).scrollTop()
    });
    $scope.$on("$destroy", function () {
        $cache.remove("classifyDetail");
        var scrollHeight = currentScrollHeight, currentData = $scope.classifyDetail;
        $cache.setCache("classifyDetail", {scrollHeight: scrollHeight, currentData: currentData})
    })
}]);