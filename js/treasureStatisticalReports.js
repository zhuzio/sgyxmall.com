//财富  统计报表
yx_mallApp
	.controller("treasureStatisticalReportsController",["$scope","appService","$state","$stateParams",function($scope,appService,$state,$stateParams){
	
	laydate.render({
	  elem: '#test3'
	  ,type: 'month'
	 
	});
         $scope.bb={
         	startTime:"",
         	data:[],
         	dq:""
         };
	
	
	var baoBiao=appService._postData(URL+"index.php?s=/Api/wealth/report_statistics",{
		token: localStorage.getItem("tokens"),
             way:localStorage.getItem("way")
             
	});
	baoBiao.then(function(e){
			console.log(e);
		$scope.bb.data=	e.data.data;
		$scope.bb.qu=	e.data.arr.area;
		console.log($scope.bb.qu);
		},function(e){
			console.log(e);
		});
	$scope.qurch=function(){
		
		var baoBiao=appService._postData(URL+"index.php?s=/Api/wealth/report_statistics",{
		token: localStorage.getItem("tokens"),
             way:localStorage.getItem("way"),
             startTime:$("#test3").val()
	});
		baoBiao.then(function(e){
			console.log(e);
			$scope.bb.data=	e.data.data;
		   $scope.bb.qu=	e.data.arr.area;
		},function(e){
			console.log(e);
		})
		
		
	}
	
	
	
	
	
}]);