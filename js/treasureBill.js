//财富     购物 账单
yx_mallApp
.controller("treasureBillController",["$scope","appService","$state","$stateParams",function($scope,appService,$state,$stateParams){
	document.title="购物账单";
	 
	
	  $scope.xiaoFei={
	  	billType:true,    //账单类型选择
	  	billDetail:false,//账单详情选择
	  	data:[],//账单数据
		arr:0
	  	
	  };
//	bill_month_info
	var bill=appService._postData(URL+"index.php?s=/Api/wealth/bill_month",{
		    token: JSON.parse(localStorage.getItem("userInfo")).token,
            // way:localStorage.getItem("way")
	});
	bill.then(function(e){
        $scope.xiaoFei.arr=e.data.arr;
		$scope.xiaoFei.data=e.data.data;

	},function(e){
		console.log(e);
	})
  
	
	
}]);