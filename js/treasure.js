  // 财富 控制器
  yx_mallApp
  .controller("treasureController",["$scope","appService","$stateParams","$state",function ($scope,appService,$stateParams,$state) {
      //    用户财产信息
      document.title="财富";
//  $scope.random=Math.floor(Math.random()*6+1) ;
//  console.log($scope.random);
      //    用户财产信息
      $scope.tre={
          level:1, //   身份
          happiness:125,  //幸福积分
          money:124,//可用积分
          point:1,//结余积分
          point_peac:12,//当前权
          earnings:13,//可提
          total:12,
          userInfo:[],
          user:[],//用户信息
          status_gw:true,//购物页面
          status_sy:false,//收益页面
          merchants_layer:false, //招商弹出层
          earnings_layer:false, //收益弹出层
          withdrawal_layer:false, //提现没有绑定银行卡时弹出层
          withdrawal_layer1:false, //关闭提现弹出层
          BalanceIntegral_layer:false, //结余积分提示弹出层
          strictIntegral_layer:false ,//严选积分弹出层
      };
      //   权限等级
      $scope.tre.userInfo=JSON.parse(localStorage.getItem("userInfo"));

    /*  if(!localStorage.getItem("tokens")){
          $state.go("login");
      }
*/
      var userData=appService._postData(URL+"index.php?s=/Api/wealth/my_wealth",{
          token:$scope.tre.userInfo.token,
          // way:localStorage.getItem("way")

      });

      userData.then(function(e){
          //     	成功状态
          // console.log(e)

          $scope.tre.level=e.data.data.type;
          $scope.tre.happiness=e.data.data.happiness;
          $scope.tre.money=e.data.data.money;
          $scope.tre.point=e.data.data.point;
          $scope.tre.point_peac=e.data.data.point_peac;
          $scope.tre.earnings=e.data.data.earnings;
          $scope.tre.total=e.data.data.total;
console.log(e)
      },function(e){
          //	错误状态
          console.log(e);
      });


//    是否绑定银行卡
      $scope.userBCInfo={
          cardList:[],
          userInfo:[]
      };
      $scope.userBCInfo.userInfo = JSON.parse(localStorage.getItem("userInfo"));
      var cardList = appService._postData(URL+"index.php?s=Api/Userset/crad",{
          token:$scope.userBCInfo.userInfo.token,
          // way:$scope.userBCInfo.userInfo.way
      });
      cardList.then(function (e) {
             if(e.data.data.length){
                 // console.log(e.data.data)
                 $scope.tre.withdrawal_layer=true;
             }

          },
          function (reason) {
              console.log(reason)
          });

      //非会员   两个页面的操作
      $scope.change=function(a){
//   	判断显示收益奖励还是购物积分

          localStorage.setItem("status111",a);
          if(a==1){
              $(".tre_container").removeClass("tre_ba1");
              $(".tre_middle_fen").removeClass("tre_middle_b");
              $(".tre_span3").addClass("tre_ba");
              $(".tre_span4").removeClass("tre_ba");

              $scope.tre.status_gw=true;
              $scope.tre.status_sy=false;

          }else if(a==2){
              $(".tre_container").addClass("tre_ba1");
              $(".tre_middle_fen").addClass("tre_middle_b");
              $(".tre_span3").removeClass("tre_ba");
              $(".tre_span4").addClass("tre_ba");
              $scope.tre.status_gw=false;
              $scope.tre.status_sy=true;

          }


      };
       //保存状态
      $scope.load = function() {

          $scope.change(   parseInt(localStorage.getItem("status111"))   );
          // console.log(localStorage.getItem("status111"));
      };




      $scope.zs= true;

      //招商收益弹出层
      $scope.zsOk=function () {
          $scope.tre.merchants_layer = true;
      };
      //收起弹出层
      $scope.zsNo=function () {
          $scope.tre.merchants_layer = false;
      };

      //商家货款弹出层
      $scope.sjOk=function () {
          $scope.tre.earnings_layer = true;
      };
      //收起弹出层
      $scope.sjNo=function () {
          $scope.tre.earnings_layer = false;
      };
      //提现弹出层
      $scope.txOk=function () {
          if(!$scope.tre.withdrawal_layer){
              $scope.tre.withdrawal_layer1 = true;//没有绑定银行卡
          }else{

              $state.go("treasureWithdrawal",{id:"1",name:"1",num:"1"});//绑定了银行卡
          }


      };
      //收起弹出层
      $scope.txNo=function () {
          $scope.tre.withdrawal_layer1= false;
      };
      //结余积分  弹出层
      $scope.jyOk=function () {
          $scope.tre.BalanceIntegral_layer = true;
      };
      //收起弹出层
      $scope.jyNo=function () {
          $scope.tre.BalanceIntegral_layer = false;
      };
      //严选积分 弹出层
      $scope.yxOk=function () {
          $scope.tre.strictIntegral_layer = true;
      };
      //收起弹出层
      $scope.yxNo=function () {
          $scope.tre.strictIntegral_layer = false;
      };




      //非会员   两个页面的操作




  }]);
    