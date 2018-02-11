//财富 商家收益
yx_mallApp
.controller("treasureBusinessIncomeController",["$scope","appService","$state","$stateParams",function($scope,appService,$state,$stateParams){
	
	
	   //    用户转化信息
       document.title="商家收益";
    
           $scope.arr={
           
            mouth:[],//月账单
            dayDetail:[{content:"sdfsfioisd破洞将覆盖东方破解GDP经费",createtime:"2018-01-11 00:11:12"},{content:"offline东方饭店该京东方",createtime:"2018-01-01 10:31:12"}],
            selected:-1,//选中展示本月信息，默认选不中
            current:0,//本月收益，默认为零
            total:0//累计收益，默认为零
           };
           
   
//   初加载请求
//加载每月记录
    var conversion_record=appService._postData(URL+"index.php?s=/Api/wealth/shop_earing_month",{
		    token: localStorage.getItem("tokens"),
            way:localStorage.getItem("way") }) ;
	conversion_record.then(function(e){
		$scope.arr.mouth=e.data.data;
        $scope.arr.total=e.data.arr;
        $scope.arr.current=e.data.data[0].money;
	    console.log(e);
	},function(e){
		console.log(e);
	});

	
//   初加载请求 

           
        //   点击请求加载本月数据
       $scope.change=function($index,time){
     	          //   点击请求加载本月数据
     	          $scope.arr.selected=$index;
     	          console.log($index);
     	          console.log($scope.arr.selected);
     	          console.log(time);
     	          
				    var conversion_record=appService._postData(URL+"index.php?s=/Api/wealth/shop_earing_info",{
						    token: localStorage.getItem("tokens"),
				            way:localStorage.getItem("way"), time:time}) ;
					     conversion_record.then(function(e){
						$scope.arr.dayDetail=e.data.data;
						
						console.log(e);
					},function(e){
						console.log(e);
					})
				//   初加载请求 
     	    
               }

	
	
}]);