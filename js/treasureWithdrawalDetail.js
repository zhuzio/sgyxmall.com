//财富  体现明细
yx_mallApp
    .controller("treasureWithdrawalDetailController",["$scope","appService","$state","$stateParams",function($scope,appService,$state,$stateParams){
        document.title="财富体现明细";
        $scope.wo={
            page:1,
            data:[{ip:0,money:121,createtime:"2018-01",bank_code:"建行",operatortime:"2018-02"},
                {ip:1,money:121,createtime:"2018-01",bank_code:"建行",operatortime:"2018-02"},
                {ip:2,money:121,createtime:"2018-01",bank_code:"建行",operatortime:"2018-02"}]//提现详情
        };
        var  uesr=appService._postData(URL+"index.php?s=/Api/wealth/deposit_detail",{
            token: localStorage.getItem("tokens"),
            way:localStorage.getItem("way")
        });
        uesr.then(function (e) {
            $scope.wo.data=e.data.data;
            console.log(e);
        },function (e) {
            console.log(e);
        })

        $scope.more=function () {

            $scope.wo.page=$scope.wo.page+1;
            var moreLike=appService._postData(URL+"index.php?s=/Api/wealth/deposit_detail",{page:$scope.wo.page,token: localStorage.getItem("tokens"),
                way:localStorage.getItem("way")});
            moreLike.then(function (e) {
                if(e.data.data == "" ){
                    $(".more").html("没有更多了...")
                }else {
                    $scope.wo.data= $scope.wo.data.concat(e.data.data);

                    console.log(e);
                }

            },function (e) {
                console.log(e)
            })




        };



    }]);