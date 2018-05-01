//财富  账单详情
yx_mallApp
	.controller("treasureBillDetailController",["$scope","appService","$state","$stateParams",function($scope,appService,$state,$stateParams){
	document.title="账单详情";
	
	$scope.detail={
		billId:"",//时间段
		billtype:0,//那种类型的数据请求1是购物积分账单2是收益奖励3是收益提现
		data:[]//
		
	};
	$scope.detail.billId=$stateParams.billId;
	$scope.detail.billtype=$stateParams.billType;//获取传惨

	if($stateParams.billType=='1'){
		//请求1是购物积分账单

		var bill=appService._postData(URL+"index.php?s=/Api/wealth/bill_month_info",{
		    token: JSON.parse(localStorage.getItem("userInfo")).token,
            // way:localStorage.getItem("way"),
           time: $stateParams.billId
		});
			bill.then(function(e){
			$scope.detail.data=	e.data.data;
				// console.log(e);
			},function(e){
				console.log(e);
			})
  
	}else if($stateParams.billType=='2'){
		//2是收益奖励
		// console.log(2);
		var bill=appService._postData(URL+"index.php?s=/Api/wealth/profit_month_info",{
		    token: JSON.parse(localStorage.getItem("userInfo")).token,
            // way:localStorage.getItem("way"),
			time: $stateParams.billId}) ;
			bill.then(function(e){
				$scope.detail.data=	e.data.data;
				// console.log(e);
			},function(e){
				console.log(e);
			})
	}else{
		//3是收益提现   没有详情
		// console.log(3);
//		var bill=appService._postData(URL+"index.php?s=/Api/wealth/deposit_month_info",{
//		    token: localStorage.getItem("tokens"),
//          way:localStorage.getItem("way"), time: $stateParams.billId }) ;        
//			bill.then(function(e){
//				console.log(e);
//			},function(e){
//				console.log(e);
//			})
	}
	
	
	
	
}]);