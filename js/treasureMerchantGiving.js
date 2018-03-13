//财富  商家赠送积分
yx_mallApp
.controller("treasureMerchantGivingController",["$scope","appService","$state","$stateParams",function($scope,appService,$state,$stateParams){
	document.title="商家赠送";
	laydate.render({ elem: '#appDateTime1'});
    laydate.render({ elem: '#appDateTime2'});
	
	
	$scope.dan={
		all:0,
		data:[],
		page:1,
	}
	
	
	$scope.query=function(){
		
		$("#appDateTime1").val()
		$("#appDateTime2").val()

		
		 if($("#cha").val().length==0)  
        {  
           alert('请输入手机号码！');  
           return false;  
        }      
        if($("#cha").val().length!=11)  
        {  
            alert('请输入有效的手机号码！11');  
            return false;  
        }  
          
       
        if(!(/^1[345789]\d{9}$/.test($("#cha").val()-0)))
        {  
            alert('请输入有效的手机号码！');  
            return false;  
        }  
		
		var chaxun=appService._postData(URL+"index.php?s=/Api/wealth/merchant_point_detail",{
			 token: localStorage.getItem("tokens"),
             way:localStorage.getItem("way"),
			add_time_from:$("#appDateTime1").val(),add_time_to:$("#appDateTime2").val(),payment_id:9,
            num:$scope.dan.page,
		})
		
		  chaxun.then(function(e){
		  
		  	   $scope.dan.all =e.data.data.give_count;
		  	    $scope.dan.data =e.data.data.total_amount_jiu;
		  	
		  },function(e){
		  	
		  	
		  	console.log(e);
		  })











    };
	
	//初加载
	var chaxun=appService._postData(URL+"index.php?s=/Api/wealth/merchant_point_detail",{
		     token: localStorage.getItem("tokens"),
             way:localStorage.getItem("way"), 
		add_time_from:$("#appDateTime1").val(),add_time_to:$("#appDateTime2").val(),payment_id:9, num:$scope.dan.page});

		
		  chaxun.then(function(e){

		  	    $scope.dan.all =e.data.data.give_count;
		  	    $scope.dan.data =e.data.data.total_amount_jiu;
		  	
		  },function(e){
		  		  	console.log(e);
		  })
//加载更多
    $scope.more=function () {
        $scope.dan.page=$scope.dan.page+1;

        var moreLike=appService._postData(URL+"index.php?s=/Api/wealth/merchant_point_detail",{
            token: localStorage.getItem("tokens"),
            way:localStorage.getItem("way"),
            add_time_from:$("#appDateTime1").val(),add_time_to:$("#appDateTime2").val(),payment_id:9,
            num:$scope.dan.page,
        });
        moreLike.then(function (e) {
            if(e.data.data.total_amount_jiu == "" ){
                $(".more").html("暂无更多")
            }else {
                $scope.dan.data= $scope.dan.data.concat(e.data.data.total_amount_jiu);
                  if(e.data.data.total_amount_jiu){

                  }

            }

        },function (e) {
            console.log(e)
        })




    };



}]);