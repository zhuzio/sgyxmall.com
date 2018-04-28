//财富  商家货款积分
yx_mallApp.controller("treasureMerchantPaymentController",["$scope", "appService","$state","$stateParams",function($scope,appService,$state,$stateParams){
	document.title="商家货款";
	laydate.render({ elem: '#appDateTime1'});
    laydate.render({ elem: '#appDateTime2'});
	
	
	$scope.dan={
		all:0,
		data:[],
		page:1
	};
	
	
	$scope.query=function(){
		
		$("#appDateTime1").val();
		$("#appDateTime2").val();

		 if($("#cha").val().length==0)  
        {
            appService.artTxt("请输入手机号码！").then(function () {
                return false;
            });
        }      
        if($("#cha").val().length!=11)  
        {
            appService.artTxt("请输入有效的手机号码！").then(function () {
                return false;
            });
        }  
          
       
        if(!(/^1[34578]\d{9}$/.test($("#cha").val()-0)))  
        {
            appService.artTxt("请输入有效的手机号码！").then(function () {
                return false;
            });
        }  
		
		var chaxun=appService._postData(URL+"index.php?s=/Api/wealth/merchant_point_detail",{
			 token: JSON.parse(localStorage.getItem("userInfo")).token,
             // way:localStorage.getItem("way"),
			add_time_from:$("#appDateTime1").val(),add_time_to:$("#appDateTime2").val(),payment_id:3,
            num:$scope.dan.page
		});
		
		  chaxun.then(function(e){
		  
		  	   $scope.dan.all =e.data.data.get_count;
		  	    $scope.dan.data =e.data.data.total_amount_san;
		  	
		  },function(e){
		  	
		  	
		  	console.log(e);
		  })
		
	};
	
	//初加载
	var chaxun=appService._postData(URL+"index.php?s=/Api/wealth/merchant_point_detail",{
		     token: JSON.parse(localStorage.getItem("userInfo")).token,
             // way:localStorage.getItem("way"), 
		add_time_from:$("#appDateTime1").val(),add_time_to:$("#appDateTime2").val(),payment_id:3,
	      num:$scope.dan.page
	});
		
		  chaxun.then(function(e){

		  	    $scope.dan.all =e.data.data.get_count;
		  	    $scope.dan.data =e.data.data.total_amount_san;
		  	
		  },function(e){
		  	
		  	
		  	console.log(e);
		  });



    //加载更多
    $scope.more=function () {
        $scope.dan.page=$scope.dan.page+1;

        var moreLike=appService._postData(URL+"index.php?s=/Api/wealth/merchant_point_detail",{
            token: JSON.parse(localStorage.getItem("userInfo")).token,
            // way:localStorage.getItem("way"),
            add_time_from:$("#appDateTime1").val(),add_time_to:$("#appDateTime2").val(),payment_id:3,
            num:$scope.dan.page,
        });
        moreLike.then(function (e) {
            if(e.data.data.total_amount_san == "" ){
                $(".more").html("暂无更多")
            }else {

                $scope.dan.data.push.apply($scope.dan.data,e.data.data.total_amount_san);
            }

        },function (e) {
            console.log(e)
        })




    };


}]);