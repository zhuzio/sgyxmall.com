//财富  辖区会员收益
yx_mallApp
	.controller("treasurePMEController",["$scope","appService","$state","$stateParams",function($scope,appService,$state,$stateParams){
	
	 //    用户转化信息
       document.title="辖区会员收益";
    
           $scope.arr={
           
            mouth:[],//月账单
            dayDetail:[{classname:"测试",createtime:"2018-01-11 00:11:12",money:44,order_sn:54766452,xq_real_name:"小皇"},{classname:"京东方",money:44,order_sn:54766452,xq_real_name:"小皇",createtime:"2018-01-01 10:31:12"}],
            selected:-1,//选中展示本月信息，默认选不中
            current:0,//本月收益，默认为零
            total:0//累计收益，默认为零
           };
           
   
//   初加载请求
//加载每月记录
    var conversion_record=appService._postData(URL+"index.php?s=/Api/wealth/area_earning_month",{
		    token: localStorage.getItem("tokens"),
            way:localStorage.getItem("way"),type:7 }) ;
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
     	          
				    var conversion_record=appService._postData(URL+"index.php?s=/Api/wealth/area_earning_info",{
						    token: localStorage.getItem("tokens"),
				            way:localStorage.getItem("way"), time:time,type:7}) ;
					     conversion_record.then(function(e){
						$scope.arr.dayDetail=e.data.data;
						
						console.log(e);
					},function(e){
						console.log(e);
					})
				//   初加载请求 
     	    
               }
             
     
	
	
	
	
	
	
}]);