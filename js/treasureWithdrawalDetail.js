//财富  体现明细
yx_mallApp
    .controller("treasureWithdrawalDetailController",["$scope","appService","$state","$stateParams",function($scope,appService,$state,$stateParams){

        $scope.wo={

            data:[{ip:0,money:121,createtime:"2018-01",bank_code:"建行",operatortime:"2018-02"},
                {ip:1,money:121,createtime:"2018-01",bank_code:"建行",operatortime:"2018-02"},
                {ip:2,money:121,createtime:"2018-01",bank_code:"建行",operatortime:"2018-02"}]//提现详情
        };
        var  uesr=appService._postData(URL+"index.php?s=/Api/wealth/deposit_detail",{
            token: localStorage.getItem("tokens"),
            way:localStorage.getItem("way")
        });
        uesr.then(function (e) {
            console.log(e);
        },function (e) {
            console.log(e);
        })
	
	
	
}]);