//财富  体现明细
yx_mallApp
    .controller("treasureWithdrawalDetailController",["$scope","appService","$state","$stateParams",function($scope,appService,$state,$stateParams){
        document.title="财富体现明细";
        $scope.wo={
            page:1,
            data:[]//提现详情
        };
        var  uesr=appService._postData(URL+"index.php?s=/Api/wealth/deposit_detail",{
            token: JSON.parse(localStorage.getItem("userInfo")).token,
            // way:localStorage.getItem("way")
        });
        uesr.then(function (e) {
            $scope.wo.data=e.data.data;
            if(!e.data.data.length){
                $(".more").html("暂无更多")
            }

        },function (e) {
            console.log(e);
        })

        $scope.more=function () {

            $scope.wo.page=$scope.wo.page+1;
            var moreLike=appService._postData(URL+"index.php?s=/Api/wealth/deposit_detail",{
                page:$scope.wo.page,
                token: JSON.parse(localStorage.getItem("userInfo")).token,
                // way:localStorage.getItem("way")
            });
            moreLike.then(function (e) {
                if(e.data.data == "" ){
                    $(".more").html("暂无更多")
                }else {

                    $scope.wo.data.push.apply($scope.wo.data,e.data.data);

                }

            },function (e) {
                console.log(e)
            })




        };



    }]);