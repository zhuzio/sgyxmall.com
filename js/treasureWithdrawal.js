//财富  提现
yx_mallApp
    .controller("treasureWithdrawalController",["$scope","appService","$state","$stateParams",function($scope,appService,$state,$stateParams){
	
	$scope.Withdrawal={
	    money:0,
        data:[]
    };
	var  uesr=appService._postData(URL+"index.php?s=/Api/wealth/member_deposit",{
        token: localStorage.getItem("tokens"),
        way:localStorage.getItem("way")
    });
	uesr.then(function (e) {
        $scope.Withdrawal.money=e.data.data.maxMoney;
        $scope.Withdrawal.data=e.data.data.default_card;
        console.log(e);
    },function (e) {
        console.log(e);
    })

$scope.maxMoney=function (e) {
    console.log(e);

}


}]);