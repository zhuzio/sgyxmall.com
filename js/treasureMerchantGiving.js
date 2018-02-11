//财富  商家赠送积分
yx_mallApp
.controller("treasureMerchantGivingController",["$scope","appService","$state","$stateParams",function($scope,appService,$state,$stateParams){
	document.title="商家赠送";
	laydate.render({ elem: '#appDateTime1'});
    laydate.render({ elem: '#appDateTime2'});
	
	
	$scope.dan={
		all:0,
		data:[],
	}
	
	
	$scope.query=function(){
		
		$("#appDateTime1").val()
		$("#appDateTime2").val()
		console.log(typeof ($("#cha").val()-0));
		console.log($("#appDateTime1").val());
		
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
          
       
        if(!(/^1[34578]\d{9}$/.test($("#cha").val()-0)))  
        {  
            alert('请输入有效的手机号码！');  
            return false;  
        }  
		
		var chaxun=appService._postData(URL+"index.php?s=/Api/wealth/merchant_point_detail",{
			 token: localStorage.getItem("tokens"),
             way:localStorage.getItem("way"),
			add_time_from:$("#appDateTime1").val(),add_time_to:$("#appDateTime2").val(),payment_id:9
		})
		
		  chaxun.then(function(e){
		  
		  	   $scope.dan.all =e.data.data.give_count;
		  	    $scope.dan.data =e.data.data.total_amount_jiu;
		  	
		  },function(e){
		  	
		  	
		  	console.log(e);
		  })
		
		
		
		
		
		
		
		
		
		
		
		
	}
	
	
	var chaxun=appService._postData(URL+"index.php?s=/Api/wealth/merchant_point_detail",{
		     token: localStorage.getItem("tokens"),
             way:localStorage.getItem("way"), 
		add_time_from:$("#appDateTime1").val(),add_time_to:$("#appDateTime2").val(),payment_id:9})
		
		  chaxun.then(function(e){
		  	console.log(e);
		  	    $scope.dan.all =e.data.data.give_count;
		  	    $scope.dan.data =e.data.data.total_amount_jiu;
		  	
		  },function(e){
		  	
		  	
		  	console.log(e);
		  })  
	
	
	
	
	
	
	
}])