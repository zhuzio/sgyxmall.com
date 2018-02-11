// 财富 转化记录     控制器
yx_mallApp
    .controller("treasureConversionController", ["$scope", "appService", "$stateParams", "$state", function ($scope, appService, $stateParams, $state) {
        //    用户转化信息
        $scope.treasureConversion = {
            user:[{
                time: '2018-01',
                all_score: 666,
                detail: [{gw: 66, yx: 11, lei: "商城购物", time: "2018-01-11 00:11:12"}, {
                    gw: 16,
                    yx: 10,
                    lei: "商城购物",
                    time: "2018-01-01 10:31:12"
                }]
            }, {
                time: '2017-11',
                all_score: 996,
                detail: [{gw: 656, yx: 110, lei: "商城购物", time: "2017-11-12 00:11:12"}, {
                    gw: 165,
                    yx: 120,
                    lei: "商城购物",
                    time: "2017-11-21 10:31:12"
                }]
            }]
        }
        $scope.showDetail=function (e) {
            $(e.target).siblings(".treCon_list").css("display","block");
            $(e.target).parents(".treCon_one_show").siblings().find(".treCon_list").css("display","none");
        }
    }])
 