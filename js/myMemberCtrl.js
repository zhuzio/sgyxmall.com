yx_mallApp
    .controller("myMemberController",["$scope","appService","$state",function ($scope,appService,$state) {
        document.title="我的会员";
        $scope.member={
            userInfo:[],
            isPull:false,
            //默认筛选框的值：
            selectTxt:"所有推荐"
        };
        $scope.member.userInfo =JSON.parse(localStorage.getItem("userInfo"));
        //下拉列表
        $scope.getPullList=function () {
            $(".mmPullDownList").toggleClass("mmIcon_on");
            $scope.checkClass();
        };
        //下拉列表的点击事件
        $scope.getFilterType=function (idx,txt) {
            $scope.member.selectTxt = txt;
            $(".mmPullDownList").removeClass("mmIcon_on");
            $scope.checkClass();
        };
        //检测class的名字的存在
        $scope.checkClass=function () {
            var isP = $(".mmPullDownList").attr("class").indexOf("mmIcon_on");
            if(isP != -1){
                $(".mmPullDown").animate({
                    left:"-0.2rem",
                    opacity:"1"
                },500);
            }else {
                $(".mmPullDown").animate({
                    left:"-3rem",
                    opacity:"0"
                },500);
            }
        };

    }])