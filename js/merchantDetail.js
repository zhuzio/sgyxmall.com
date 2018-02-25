/**
 * Created by Administrator on 2018/2/10 0010.
 */
//商家详情 控制器

yx_mallApp.controller("merchantDetailController",["$scope","appService","$stateParams","$state",function ($scope,appService,$stateParams,$state) {
        document.title="商家详情";

        $scope.index={
             b:"",
            arr3:[],//商家数据
            swipers:[] //商家详情轮播图
        };

        console.log($stateParams.shopId);
        //请求店铺详情
        var  fenlei=appService._postData(URL+"index.php?s=/Api/store/shop_info",{store_id:$stateParams.shopId});
        fenlei.then(function(e){
            console.log(e);
            $scope.index.arr3=e.data.data;
            $scope.index.swipers.push(e.data.data.image_1);
            $scope.index.swipers.push(e.data.data.image_2);
            $scope.index.swipers.push(e.data.data.image_3);
            console.log($scope.index.swipers);
            if(!$scope.index.arr3.description){
                $scope.index.arr3.description="暂无介绍";
            }
            if(!$scope.index.arr3.activity){
                $scope.index.arr3.activity="暂无介绍";
            }
        },function(e){

            console.log(e);

        })











    }]);