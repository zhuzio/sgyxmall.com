//财富  统计报表
yx_mallApp
	.controller("treasureStatisticalReportsController",["$scope","appService","$state","$stateParams",function($scope,appService,$state,$stateParams){
	
	laydate.render({
	  elem: '#test3'
	  ,type: 'month'
	 
	});
         $scope.bb={
         	startTime:"",//时间
         	data:[],//数据
         	dq:"",//地区
			 page:1,//页数
         };
	
	// 初加载
	var baoBiao=appService._postData(URL+"index.php?s=/Api/wealth/report_statistics",{
		token: localStorage.getItem("tokens"),
		way:localStorage.getItem("way"),
        page:$scope.bb.page
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
             startTime:$("#test3").val(),
			page:$scope.bb.page
	});
		baoBiao.then(function(e){
			console.log(e);
			$scope.bb.data=	e.data.data;
		     $scope.bb.qu=	e.data.arr.area;
		},function(e){
			console.log(e);
		})
		
		
	}


        //加载更多
        $scope.more=function () {
            $scope.bb.page=$scope.bb.page+1;

            var moreLike=appService._postData(URL+"index.php?s=/Api/wealth/report_statistics",{
                token: localStorage.getItem("tokens"),
                way:localStorage.getItem("way"),
                startTime:$("#test3").val(),
                page:$scope.bb.page
            });
            moreLike.then(function (e) {
                if(e.data.data == "" ){
                    $(".more").html("暂无更多")
                }else {
                    $scope.bb.data= $scope.bb.data.concat(e.data.data);


                }

            },function (e) {
                console.log(e)
            })




        };






    }]);