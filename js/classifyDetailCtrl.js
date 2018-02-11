//分类详情页面 控制器
yx_mallApp
    .controller("classifyDetailController",["$scope","$stateParams","appService",function ($scope,$stateParams,appService) {
    document.title='苏格严选商城--分类详情';
    $scope.classifyDetail={
        detail:[],
        page:1,
        search:''
    };
    console.log($stateParams)
    var classifyDetail=appService._postData(URL+"index.php?s=/Api/Classify/cateGoods",{
        cate_id:$stateParams.classifyId,
        page:$scope.classifyDetail.page
    });
    classifyDetail.then(function (e) {
        $scope.classifyDetail.detail=e.data.data;
        console.log( $scope.classifyDetail.detail)
    },function (e) {
        console.log(e)
    })
}])