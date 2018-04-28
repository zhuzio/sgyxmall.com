//财富 商家收益
yx_mallApp
.controller("treasureBusinessIncomeController",["$scope","appService","$state","$stateParams",function($scope,appService,$state,$stateParams){
	
	
	   //    用户转化信息
       document.title="商家收益";
    
           $scope.arr={
           
            mouth:[],//月账单
            dayDetail:[],
            selected:-1,//选中展示本月信息，默认选不中
            current:0,//本月收益，默认为零
            total:0,//累计收益，默认为零
			   oldselected:-2,
               page:1,
           };

    function getNowFormatDate() {
        var date = new Date();

        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }

        var currentdate = date.getFullYear() +  month;

        return currentdate;
    }
//   初加载请求
//加载每月记录
    var conversion_record=appService._postData(URL+"index.php?s=/Api/wealth/shop_earing_month",{
		    token: JSON.parse(localStorage.getItem("userInfo")).token,
            // way:localStorage.getItem("way")
    }) ;
	conversion_record.then(function(e){
		$scope.arr.mouth=e.data.data;
        $scope.arr.total=e.data.arr;
        if(!e.data.data[0]){
            $scope.arr.current=0;
        }else{

            if(getNowFormatDate()==e.data.data[0].times){

                $scope.arr.current=e.data.data[0].money;
            }else {
                $scope.arr.current=0;
            }

        }

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
     	          
				    var conversion_record=appService._postData(URL+"index.php?s=/Api/wealth/shop_earing_info",{
                        token: JSON.parse(localStorage.getItem("userInfo")).token,
                        // way:localStorage.getItem("way"),
                        time:time
				    }) ;
					     conversion_record.then(function(e){
						$scope.arr.dayDetail=e.data.data;

					},function(e){
						console.log(e);
					})
				//   初加载请求 
     	    
               }

// 加载更多

    $scope.more=function(e){
        $scope.arr.page=$scope.arr.page+1;
        var conversion_record=appService._postData(URL+"index.php?s=/Api/wealth/shop_earing_info",{
            token: JSON.parse(localStorage.getItem("userInfo")).token,
            // way:localStorage.getItem("way"),
            time:e,
            page:$scope.arr.page
        });
        conversion_record.then(function(e){
            if(e.data.data == "" ){
                $(".more").html("暂无更多")
            }else {

                $scope.arr.dayDetail.push.apply($scope.arr.dayDetail,e.data.data);

            }

        },function(e){
            console.log(e);
        })


    }

}]);