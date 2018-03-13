//财富  收益账单
yx_mallApp
.controller("treasureBill1Controller",["$scope","appService","$state","$stateParams",function($scope,appService,$state,$stateParams){
	document.title="收益账单";
	 
	
	  $scope.xiaoFei={
	  	jl:true,//默认展示奖励
	  	tx:false,
	  	jlBill:[],//奖励数据
	  	txBill:[],//提现数据
	  	billType:true,    //账单类型选择
	  	billDetail:false,//账单详情选择
	  	
	  	
	  };
	  
//	  初次加载奖励
	var bill=appService._postData(URL+"index.php?s=/Api/wealth/profit_month",{
		    token: localStorage.getItem("tokens"),
            way:localStorage.getItem("way"), })         
				bill.then(function(e){

					$scope.xiaoFei.jlBill=e.data;
				},function(e){
					console.log(e);
				})
  
//	切换账单
	$scope.change=function(a){
		if(a==1){
			$scope.xiaoFei.jl=true;
			$scope.xiaoFei.tx=false;
			$(".tre_span3").addClass("tre_ba");
     		$(".tre_span4").removeClass("tre_ba");
     		var bill=appService._postData(URL+"index.php?s=/Api/wealth/profit_month",{
		    token: localStorage.getItem("tokens"),
            way:localStorage.getItem("way"), })         
				bill.then(function(e){

					$scope.xiaoFei.jlBill=e.data;
				},function(e){
					console.log(e);
				})
  
     		
     		
		}else{
			$scope.xiaoFei.jl=false;
			$scope.xiaoFei.tx=true;
			$(".tre_span3").removeClass("tre_ba");
     		 $(".tre_span4").addClass("tre_ba");
     		 var bill=appService._postData(URL+"index.php?s=/Api/wealth/deposit_month",{
		      token: localStorage.getItem("tokens"),
              way:localStorage.getItem("way"), })         
				bill.then(function(e){

					$scope.xiaoFei.txBill=e.data;
				},function(e){
					console.log(e);
				})
     		 
     		 
		}
	}
	
	
	
	
	
	
	
}])