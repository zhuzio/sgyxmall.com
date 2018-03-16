yx_mallApp
    .controller("applyReturnGoodsController",["$scope","appService","$stateParams","$state",function ($scope,appService,$stateParams,$state) {
        document.title = "申请退货";
        $scope.reg={
            userInfo:[],
            regMoney:"",
            regServiceType:"",
            regReason:"",
            regReasonDis:"",
            txtNum:200,
            txtArea:false,
        };
        $scope.getTxtNum = function () {
            $scope.reg.txtNum = 200-($scope.reg.regReasonDis.length)
        }
    }]);