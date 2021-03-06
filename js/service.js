/**
 * Created by User on 2017/12/21.
 */
yx_mallApp
    .factory("appService",["$http","$q",function ($http,$q) {
        return{
            _getData:function (url) {
                var defer = $q.defer();
                $http({
                    url:url,
                    method:'GET'
                }).then(function (e) {
                    defer.resolve(e);
                },function (e) {
                    // console.log(e)
                    defer.reject(e)
                });
                return defer.promise;
            },
            _postData:function (url,data) {
                var defer = $q.defer();
                $http({
                    method: 'POST',
                    url: url,
                    headers: {
                        'Content-Type':'application/x-www-form-urlencoded'
                    },
                    transformRequest:function(data){
                        return $.param(data);
                    },
                    data:data
                }).then(function (e) {
                    defer.resolve(e)
                },function (e) {
                    // console.log(e);
                    defer.reject(e);
                });
                return defer.promise;
            },
            artTxt: function (txt) {
                var defer = $q.defer();
                $("body").append("<div class='alert'><p><span>" + txt + "</span></p ></div>");
                $(".alert p").animate({ bottom: "40%", opacity: "1" }, 300, function () {
                    setTimeout(function () {
                        $(".alert p").animate({
                            bottom: "25%",
                            opacity: "0"
                        }, 300);
                    }, 1500);
                    setTimeout(function () {
                        $(".alert").remove();
                        defer.resolve();
                    }, 2100);
                });
                return defer.promise;
            },
            conform:function (txt) {
                var defer = $q.defer();
                $("body").append("<div class='alert1'><div class='conformBox'>" +
                    "<p>"+txt+"</p><div class='conformBtn'>" +
                    "<span class='c_cancel'>取消</span><span class='c_conform'>确认</span>" +
                    "</div></div></div>");
                $(".conformBox").addClass("conformBox_on").animate({opacity:"1"},300);
                $(".c_conform").click(function () {
                    defer.resolve();
                    $(".alert1").remove();
                });
                $(".c_cancel").click(function () {
                    defer.reject();
                    $(".alert1").remove();
                })
                return defer.promise;
            }
        }
    }]).filter("datatimes",function(){
    return function(num){
        var lens=num.length;
        var timer1=num.substr(0,4);
        var timer2=num.substr(4,lens-4);
        return timer1+"-"+timer2;

    };
})
    .directive('onFinish', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit('ngRepeatFinished');
                });
            }
        }
    }}).filter("order_type",function(){

    return function(order_type){

        if(order_type=="offline"){
            return "联盟购物";
        }else{
            return "商城购物";
        }



    };

}).filter("order_type1",function(){

    return function(order_type){

        if(order_type=="1"){
            return "会员转化";
        }else if(order_type=="2"){
            return "购物积分奖励";
        }else{
            return "市场补贴";
        }



    };

})
    .filter("km",function(){

    return function(num){

        if(parseInt(num)<1000){
            return num+"m";
        }else if(parseInt(num)<100000) {
            var a= parseFloat(num)/1000;

               return  a+ "km";
        }else {
            var a= parseInt(parseInt(num)/1000)  ;

            return a + "km";
        }



    };
}).filter("txImg",function(){

    return function(num){
        if(num=="0"){
            return "Audit.png";
        }else if(num=="1"){
            return "Adoption.png";
        }else {
            return "Rejected.png";
        }




    };
})
    .filter("imgPay",function(){

        return function(aa){

            if(aa=="0"){
                return "w_dsh.jpg"
            }else if(aa=="1"){
                return "w_tok.png";
            }else{
                return "w_tno.png";
            }



        };
})
    .filter("textPay",function(){

        return function(aa){

            if(aa=="0"){
                return "待审核"
            }else if(aa=="1"){
                return "已到账";
            }else{
                return "已驳回";
            }



        };
    })
    .filter("imgChange",function(){

        return function(aa){

            if(aa=="1"){
                return "tre_jf2.png";
            }else if(aa=="2"){
                return "tre_jf1.png";
            }else{
                return "tre_jf3.png";
            }



        };
    })
    .filter("conversion",function(){

        return function(aa){

            if(aa=="1970-01-01 08:00:00"){
                return "未审核";
            }else{
                return aa;
            }



        };
    }).filter("shopImg1",function(){

    return function(num){
        if(num=="冻结中"){
            return "Frozen.png";
        }else{
            return "Conversion.png";
        }




    };
}).filter("imgChange1",function(){

    return function(aa){

        if(aa=="offline"){
            return "hyjl_lm.png";
        }else{
            return "hyjl_sc.png";
        }



    };
});

