 //商家分类 控制器
 yx_mallApp
.controller("merchantClassifyController",["$scope","appService","$stateParams","$state",function ($scope,appService,$stateParams,$state) {

       $scope.shop=[
	       {id:1,shopName:'饮餐美食'},
	       {id:2,shopName:'百货购物'},
	       {id:3,shopName:'休闲娱乐'},
	       {id:4,shopName:'汽车服务'},
	       {id:5,shopName:'家具装修'}
       ];
       $scope.arr={
            arr1:[],//商家分类宽
            arr2:[],//商家分类种类数据
            arr3:[],//商家数据
           
        };
//     $(".mc_center").css("width",5*1.3675+1+"rem");
       
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
       
       
//     商家分类请求
        $scope.changeWidth($(".mc_center11"),$scope.arr.arr1);
      var shops=appService._getData('url');
	     shops.then(function(e){

	     	console.log(e);
	     },function(e){
	     	console.log(e);
	     })

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
		      
//	改变商家显示分类	 
$(".mc_pr").eq(0).addClass("mc_prbb");
console.log($(".mc_pr").eq(0));
  $scope.change=function($index,data){
  	console.log($index);
$(".mc_pr").removeClass("mc_prbb");
$(".mc_pr").eq($index).addClass("mc_prbb");
//	console.log($event.target);
//	console.log($event.elementSibling);
//$event.target.addclassName(".mc_prbb");  	
  }
  


    }])