//商品搜索详情页面 控制器
yx_mallApp
    .controller("searchDetailController",["$scope","appService","$stateParams",function ($scope,appService,$stateParams) {
        console.log($stateParams);
        $scope.searchDetail={
            searchTitle:$stateParams.goodsClass,
            searchName:$stateParams.goodsClass,
            orderByPrice:"按照价格排序",
            orderBySell:"按照销量排序",
            p_show:false,
            s_show:false,
            sGoods:[],
            noGoods:false,
            haveGoods:true
        };
        //或得搜索名字，进行请求
        var searchGoods=appService._postData(URL+"index.php?s=/Api/Goods/searchGoods",{search_name:$stateParams.goodsClass});
        searchGoods.then(function (e) {
            console.log(e.data.data);

            if (e.data.data == null || e.data.data == ""){
                $scope.searchDetail.noGoods = true;
                $scope.searchDetail.haveGoods = false;
            }else {
                $scope.searchDetail.noGoods = false;
                $scope.searchDetail.haveGoods = true;
                $scope.searchDetail.sGoods = e.data.data;
            }
        },function (e) {
            console.log(e)
        });
        $scope.showOrderBy=function (n) {
            if(n == 0){
                $scope.searchDetail.p_show = true;
                $scope.searchDetail.s_show = false;
            }else if(n == 1){
                $scope.searchDetail.p_show = false;
                $scope.searchDetail.s_show = true;
            }
        };
        $scope.orderByName=function (name,num) {
            console.log(name);
            $scope.searchDetail.p_show = false;
            $scope.searchDetail.s_show = false;
            if(num == 0){
                $scope.searchDetail.orderByPrice = name
            };
            if(num == 1){
                $scope.searchDetail.orderBySell = name
            }
        }
    }])