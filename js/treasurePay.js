//支付 记录   控制器
yx_mallApp
	.controller("treasurePayController",["$scope","appService","$stateParams","$state",function ($scope,appService,$stateParams,$state) {

 document.title="支付记录";

 //    用户支付信息
      
     
           $scope.arr={
           
            mouth:[],//月账单
            dayDetail:[{money:66,order_sn:11555,to_name:"541",add_time:"2018-01-11 00:11:12"},{money:16,order_sn:1057945,to_name:"offline",add_time:"2018-01-01 10:31:12"}],
            selected:-1,//选中展示本月信息，默认选不中
            current:0,//本月支付，默认为零
            total:0,//累计支付，默认为零
               oldselected:-2,
               page:1,
           };
           
   
//   初加载请求
//加载每月记录
    var conversion_record=appService._postData(URL+"index.php?s=/Api/wealth/payment_record",{
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


           $scope.arr.oldselected=$scope.arr.selected;//记录上次选中
           $scope.arr.selected=$index;      //保存当前选中


           if($scope.arr.oldselected==$scope.arr.selected){
               $scope.arr.oldselected=-2;
               $scope.arr.selected=-1;
               $scope.arr.dayDetail=[];
               return false;
           }

				    var conversion_record=appService._postData(URL+"index.php?s=/Api/wealth/payment_record_month",{
						    token: localStorage.getItem("tokens"),
				            way:localStorage.getItem("way"), time:time});
					     conversion_record.then(function(e){
						$scope.arr.dayDetail=e.data.data;
						
						console.log(e);
					},function(e){
						console.log(e);
					})
				//   初加载请求 
     	    
               }



        $scope.more=function(e){
            $scope.arr.page=$scope.arr.page+1;
            var conversion_record=appService._postData(URL+"index.php?s=/Api/wealth/payment_record_month",{
                token: localStorage.getItem("tokens"),
                way:localStorage.getItem("way"), time:e,page:$scope.arr.page});
            conversion_record.then(function(e){
                if(e.data.data.length == "" ){
                    $(".more").html("暂无更多")
                }else {
                    $scope.arr.dayDetail.concat(e.data.data);

                }
                console.log(e);
            },function(e){
                console.log(e);
            })


        }














    }]);