//支付 记录   控制器
yx_mallApp
	.controller("treasurePayController",["$scope","appService","$stateParams","$state",function ($scope,appService,$stateParams,$state) {

 document.title="支付记录";

 //    用户支付信息
      
     
           $scope.arr={
           
            mouth:[],//月账单
            dayDetail:[],
            selected:-1,//选中展示本月信息，默认选不中
            current:0,//本月支付，默认为零
            total:0,//累计支付，默认为零
            oldselected:-2,
            page:1,
               type:"",
               // 购物积分
               tabShop:true,
               // 严选积分
               tabStrict:false

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
        $scope.getMothData=function (type) {
            var conversion_record=appService._postData(URL+"index.php?s=/Api/wealth/payment_record",{
                token: JSON.parse(localStorage.getItem("userInfo")).token,
                type:type
                // way:localStorage.getItem("way")
            }) ;
            conversion_record.then(function(e){
                console.log(e)
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
        };
        $scope.getMothData($scope.arr.type);

//tab 切换
        $scope.changeTreasureTab=function (idx) {
            switch (idx){
                case 0:
                    $scope.arr.type = "";
                    $scope.arr.tabShop = true;
                    $scope.arr.tabStrict = false;
                    $scope.getMothData($scope.arr.type);
                    break;
                case 1:
                    $scope.arr.type = "yx";
                    $scope.arr.tabShop = false;
                    $scope.arr.tabStrict = true;
                    $scope.getMothData($scope.arr.type);
                    break;
            };
        };
	
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
						    token: JSON.parse(localStorage.getItem("userInfo")).token,
				            // way:localStorage.getItem("way"),
                        type:$scope.arr.type,
                        time:time});
                     conversion_record.then(function(e){
                         console.log(e)
                        $scope.arr.dayDetail=e.data.data;

					},function(e){
						console.log(e);
					})
				//   初加载请求 
     	    
               }



        $scope.more=function(e){
            $scope.arr.page=$scope.arr.page+1;
            var conversion_record=appService._postData(URL+"index.php?s=/Api/wealth/payment_record_month",{
                token: JSON.parse(localStorage.getItem("userInfo")).token,
                type:$scope.arr.type,
                // way:localStorage.getItem("way"), 
                time:e,page:$scope.arr.page});
            conversion_record.then(function(e){
                if(e.data.data.length == "" ){
                    $(".more").html("暂无更多")
                }else {

                    $scope.arr.dayDetail.push.apply($scope.arr.dayDetail,e.data.data);

                }

            },function(e){
                console.log(e);
            })


        }


    }]);