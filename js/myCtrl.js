//我的页面--苏格优品商城用户 控制器
yx_mallApp
    .controller("myController",["$scope","appService","$state",function ($scope,appService,$state) {
        if(!localStorage.getItem("tokens")){
            $state.go("login");
        }
        document.title='苏格严选商城--我的';
        $scope.my={
            //用户名称
            username:"张三",
            //用户头像
            userHeadImg:"images/head.png",
            //用户积分
            userIntegral:"1000",
            userInfo:[]
        };
        $scope.my.userInfo = JSON.parse(localStorage.getItem("userInfo"));
        console.log([
            "                   _ooOoo_",
            "                  o8888888o",
            "                  88\" . \"88",
            "                  (| -_- |)",
            "                  O\\  =  /O",
            "               ____/`---'\\____",
            "             .'  \\\\|     |//  `.",
            "            /  \\\\|||  :  |||//  \\",
            "           /  _||||| -:- |||||-  \\",
            "           |   | \\\\\\  -  /// |   |",
            "           | \\_|  ''\\---/''  |   |",
            "           \\  .-\\__  `-`  ___/-. /",
            "         ___`. .'  /--.--\\  `. . __",
            "      .\"\" '<  `.___\\_<|>_/___.'  >'\"\".",
            "     | | :  `- \\`.;`\\ _ /`;.`/ - ` : | |",
            "     \\  \\ `-.   \\_ __\\ /__ _/   .-` /  /",
            "======`-.____`-.___\\_____/___.-`____.-'======",
            "                   `=---='",
            "^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^",
            "         佛祖保佑       永无BUG"
        ].join('\n'));
        //退出登录
        $scope.quitLogin=function () {
            localStorage.clear();
            $state.go("login")
        }

    }])