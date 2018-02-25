// 财富 获赠积分     控制器
yx_mallApp
	.controller("treasureGivenController",["$scope","appService","$stateParams","$state",function ($scope,appService,$stateParams,$state) {
     document.title="获赠积分";

 //    用户支付信息
      
     
           $scope.arr={
           
            mouth:[],//月账单
            dayDetail:[{get_money:66,order_sn:"",user_name:"15236058819",username:"小明",oto:"541",createtime:"2018-01-11 00:11:12"},{get_money:16,user_name:"15236058819",order_sn:1057945,username:"小明",oto:"offline",createtime:"2018-01-01 10:31:12"}],
            selected:-1,//选中展示本月信息，默认选不中
            current:0,//本月获赠，默认为零
            total:0//累计获赠，默认为零
           };
           
   
//   初加载请求
//加载每月记录
    var conversion_record=appService._postData(URL+"index.php?s=/Api/wealth/bonus_points",{
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
     	          
				    var conversion_record=appService._postData(URL+"index.php?s=/Api/wealth/bonus_points_month",{
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
             



}])