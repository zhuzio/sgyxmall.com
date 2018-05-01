//商品搜索页面 控制器
yx_mallApp
    .controller("searchController",["$scope","appService","$state",function ($scope,appService,$state) {
        $scope.search={
            txt:"",
            goodsName:[],
            h_s0:true,
            h_s:true,
            s_p:false,
            historySearch:[],
            hotSearch:[]
        };
        $scope.searchNow=function () {
            if($scope.search.txt != "" ){
                $state.go("searchDetail",{goodsClass:$scope.search.txt})
            }else {
                appService.artTxt("请输入关键字");
            }
        };
        var historySearch=appService._getData(URL+"index.php?s=/Api/Goods/searchHistory");
        historySearch.then(function (e) {
            // console.log(e);
            var allGoodsName=e.data.msg[0];
            $scope.search.historySearch=e.data.msg[1];

            if(!localStorage.getItem("goodsName")){
                localStorage.setItem("goodsName",JSON.stringify(allGoodsName));
            };
            if($scope.search.historySearch == "" || $scope.search.historySearch ==null || $scope.search.historySearch == undefined){
                $scope.search.h_s0 = false;
            }else {
                $scope.search.h_s0 = true;
            }
        },function (e) {
            console.log(e)
        });
        $scope.search.goodsName=JSON.parse(localStorage.getItem("goodsName"));
        $scope.getTxt=function () {
            if($scope.search.txt .length == 0){
                $scope.search.h_s0 = true;
                $scope.search.h_s = true;
                $scope.search.s_p = false;
            }else {
                $scope.search.h_s0 = false;
                $scope.search.h_s = false;
                $scope.search.s_p = true;
            }
        }
    }])