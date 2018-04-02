//分类页面 控制器
yx_mallApp
    .controller("classifyController",["$scope","$stateParams","appService",function ($scope,$stateParams,appService) {
        document.title='苏格严选商城--商品分类';
        $scope.classify={
            //分类名称
            classList:[],
            //分类名称的index
            idx:0,
            //首次加载需要的分类ID；
            classId:0,
            //类别
            classBox:[],
            //图片
            classImg:""
        };
        $scope.getClassify=function (index,ele) {
            $scope.classify.idx=index;
            $scope.classify.classId=ele.cate_id;
            $scope.classify.classImg=ele.cate_logo;
            var classBox=appService._postData(URL+"index.php?s=/Api/Classify/classInfo",{parent_id:$scope.classify.classId});
            classBox.then(function (e) {
                $scope.classify.classBox=e.data.data;
            },function (e) {
                console.log(e)
            });
            /*var classImg=appService._postData("http://www.sugemall.com/api/index.php?n=wendy&f=goodcate_ad",{cate_id:$scope.classify.classId});
                classImg.then(function (e) {
                    $scope.classify.classImg=e.data.data;
            },function (e) {
                console.log(e)
            });*/
        };
        // 获取可是高度
        var viewportHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0;
        $(".classify_center").css("height",parseInt(viewportHeight/58)-1.54+"rem");
        //分类名称  数据请求
        var classList=appService._getData(URL+"index.php?s=/Api/Classify/classList");
        classList.then(function (e) {
            $scope.classify.classImg=(e.data.data)[0].cate_logo;
            $scope.classify.classList=e.data.data;
            $scope.classify.classId=(e.data.data)[0].cate_id;
            //首次加载默认显示分类名称对应的分类列表 数据请求
            var classBox=appService._postData(URL+"index.php?s=/Api/Classify/classInfo",{parent_id:$scope.classify.classId});
            classBox.then(function (e) {
                $scope.classify.classBox=e.data.data;
            },function (e) {
                console.log(e)
            });
        },function (e) {
            console.log(e)
        });


        $scope.getCatch=function (idx) {
            switch (idx){
                case 1:
                    $cache.setCache("aaa","ceshi");
                    break;
                case 2:
                    var b=$cache.getCache("aaa");
                    console.log(b)
                    break;
            }

        };

    }]);