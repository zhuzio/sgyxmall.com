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
        console.log(ngRepeatFinishedEvent);
        if($stateParams.classifyId==1){
            $(".mc_pr").eq(0).addClass("mc_prbb");
        }else if($stateParams.classifyId==41){
            $(".mc_pr").eq(1).addClass("mc_prbb");
        }else if($stateParams.classifyId==42){
            $(".mc_pr").eq(2).addClass("mc_prbb");
        }



    });

    //请求店铺分类类型
    var  fenlei=appService._postData(URL+"index.php?s=/Api/store/store_category",{});
    fenlei.then(function(e){
        console.log(e);
        $scope.arr.arr2=e.data.data;
        $scope.changeWidth($(".mc_center11"),$scope.arr.arr1);
        console.log($scope.arr.arr2);
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



//		 分类商家数据
    $scope.order={

        shop:[{

            goods:"复古元素条纹女式外套",//商品名字
            color:"酒红色",//颜色
            size:"0.1",//大小
            prices_cash:99,//现金
            prices_integral:99,//积分
            num:1,//数量

        },{

            goods:"复古元素条纹复古风女式外套",//商品名字
            color:"紫色",//颜色
            size:"0.4",//大小
            prices_cash:999,//现金
            prices_integral:199,//积分
            num:1,//数量

        },{

            goods:"复古元素条纹女式外套",//商品名字
            color:"酒红色",//颜色
            size:"0.5",//大小
            prices_cash:99,//现金
            prices_integral:99,//积分
            num:1,//数量

        },{

            goods:"复古元素条纹女式外套",//商品名字
            color:"酒红色",//颜色
            size:"2",//大小
            prices_cash:"啥都好说掉了尽快送圣诞快乐电视柜ID覅噢地方山东省考了掉了掉了及山东省地",//现金
            prices_integral:99,//积分
            num:1,//数量

        }]



    };

    if($scope.order){
        $scope.num=false;
    }else{
        $scope.num=true;
    }

//请求页面初加载  店铺分类数据
    var  detail=appService._postData(URL+"index.php?s=/Api/store/nearby_shops_cate",{cate_id:$stateParams.classifyId,lon:sessionStorage.getItem("lon"),lat:sessionStorage.getItem("lat")});
    detail.then(function(e){
        console.log(e);
        $scope.arr.arr3=e.data.data;
        console.log($scope.arr.arr3);
    },function(e){

        console.log(e);

    })



    console.log($(".mc_pr").eq(0));
    $scope.change=function($index,name,id){

        $(".mc_pr").removeClass("mc_prbb");
        $(".mc_pr").eq($index).addClass("mc_prbb");
        //请求店铺分类数据
        var  detail=appService._postData(URL+"index.php?s=/Api/store/nearby_shops_cate",{cate_id:id,lon:sessionStorage.getItem("lon"),lat:sessionStorage.getItem("lat")});
        detail.then(function(e){
            console.log(e);
            $scope.arr.arr3=e.data.data;
            console.log($scope.arr.arr3);
        },function(e){

            console.log(e);

        })

    }


}])