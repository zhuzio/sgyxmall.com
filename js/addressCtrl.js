//我的地址页面 控制器
yx_mallApp
    .controller("addressController",["$scope","appService","$state",function ($scope,appService,$state) {
        $scope.address={
            txt:"编辑",
            addressInfo:[
                {
                    name:"柱子",
                    address:"河南省南阳市卧龙区车站南路中达明淯新城E区苏格实业有限公司",
                    tel:"15738669091",
                    defaults:"1"
                },
                {
                    name:"柱子",
                    address:"河南省南阳市卧龙区车站南路中达明淯新城E区苏格实业有限公司",
                    tel:"15738669091",
                    defaults:"0"
                },
                {
                    name:"柱子",
                    address:"河南省南阳市卧龙区车站南路中达明淯新城E区苏格公司",
                    tel:"15738669321",
                    defaults:"0"
                },
                {
                    name:"柱子",
                    address:"河南省南阳市卧龙区中达明淯新城E区苏格实业有限公司",
                    tel:"15738669091",
                    defaults:"0"
                },
                {
                    name:"柱子",
                    address:"河南省南阳市卧龙区车站南路E区苏格实业有限公司",
                    tel:"15738669091",
                    defaults:"0"
                },
            ]
        };
        //点击 出现 编辑 或者 完成
        $scope.checkis=function (e) {
            if(e.isCheck){
                $scope.address.txt = "完成";
                $('.ads_delete').animate({
                    right:"0"
                },300);
            }else {
                $scope.address.txt = "编辑";
                $('.ads_delete').animate({
                    right:"-20%"
                },300);
            }
        };
        //删除地址
        $scope.deleteAddress=function (ele,idx) {
            ele.splice(idx,1)
        }

    }])