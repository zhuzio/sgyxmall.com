//联盟商家 控制器
yx_mallApp
.controller("allianceMerchantController",["$scope","appService","$stateParams","$state",function ($scope,appService,$stateParams,$state) {
		$scope.index={
            //联盟轮播图
            swipers:[],
            //分类
            classif:[],
            //附近商家
            shop:[],
           
            page:1,
            more:true
        };
		//首页轮播图 数据请求
		        var swipers=appService._postData(URL+"index.php?s=/Api/index/advertising_site",{site:0});
		            swipers.then(function (e) {
		                // console.log(e)
		                $scope.index.swipers=e.data.data;
		                setTimeout(function () {
		                    var swiper = new Swiper('.swiper-container', {
		                        pagination: '.swiper-pagination',
		                        nextButton: '.swiper-button-next',
		                        prevButton: '.swiper-button-prev',
		                        paginationClickable: true,
		                        spaceBetween: 0,
		                        centeredSlides: true,
		                        autoplay: 2500,
		                        autoplayDisableOnInteraction: false,
		                        loop:true
		                    });
		                },0)
		            },function (e) {
		                console.log(e)
		            });
		            
//		 商家数据           
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
    	        
		            
		            
		            
		            
		            
    }])
