 //商家分类 控制器
 yx_mallApp.controller("merchantClassifyController",["$scope","appService","$stateParams","$state",function ($scope,appService,$stateParams,$state) {
    document.title="商家分类";

    $scope.arr={
        arr1:[],//商家分类宽
        arr2:[],//商家分类种类数据
        arr3:[],//商家数据
        shopType:"建修建材" ,
    };

    $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
        //这里写获取dom的操作，

        if($stateParams.classifyId==1){
            $(".mc_pr").eq(0).addClass("mc_prbb");
            $scope.arr.shopType="建修建材";
        }else if($stateParams.classifyId==43){
            $scope.arr.shopType="家具家电";
            $(".mc_pr").eq(1).addClass("mc_prbb");
        }else if($stateParams.classifyId==42){
            $scope.arr.shopType="餐饮美食";
            $(".mc_pr").eq(2).addClass("mc_prbb");
        }



    });

    //请求店铺分类类型
    var  fenlei=appService._postData(URL+"index.php?s=/Api/store/store_category",{});
    fenlei.then(function(e){

        $scope.arr.arr2=e.data.data;
        $scope.changeWidth($(".mc_center11"),$scope.arr.arr1);

    },function(e){

        console.log(e);

    })



    console.log($stateParams.classifyId);

    //改变元素宽度
    $scope.changeWidth=function (parent,arr) {
        setTimeout(function () {
            var each_pr=$(parent).find(".mc_pr");
            for (var i =0; i<each_pr.length; i++){
                arr.push(parseInt($(each_pr[i]).css("width")))
            };
            $(parent).find(".mc_center").css("width",(parseFloat(eval(arr.join("+"))/58)+(each_pr.length*0.5)+2)+"rem");
        },0)
    };




//请求页面初加载  店铺分类数据
    var  detail=appService._postData(URL+"index.php?s=/Api/store/nearby_shops_cate",{cate_id:$stateParams.classifyId,lon:sessionStorage.getItem("lon"),lat:sessionStorage.getItem("lat")});
    detail.then(function(e){

        $scope.arr.arr3=e.data.data;

    },function(e){

        console.log(e);

    })


    $scope.change=function($index,name,id){
         $scope.arr.shopType=name;
        $(".mc_pr").removeClass("mc_prbb");
        $(".mc_pr").eq($index).addClass("mc_prbb");
        //请求店铺分类数据
        var  detail=appService._postData(URL+"index.php?s=/Api/store/nearby_shops_cate",{cate_id:id,lon:sessionStorage.getItem("lon"),lat:sessionStorage.getItem("lat")});
        detail.then(function(e){

            $scope.arr.arr3=e.data.data;

        },function(e){

            console.log(e);

        })

    }



}])