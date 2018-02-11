yx_mallApp
    .controller("indexController",["$scope","appService",function ($scope,appService) {
        document.title='苏格严选商城';
        $scope.index={
            //首页轮播图
            swipers:[],
            //好物甄选
            egoods:[],
            //人气推荐·好物精选
            pr:[],
            //严选精品·物美价优   女装图片 皮鞋图片
            fe_male_img:[],
            //严选精品·物美价优   女装数据
            female:[],
            //严选精品·物美价优   皮鞋数据
            male:[],
            //猜你喜欢
            guessLike:[],
            //今日首发·天天新款
            dayUpdate:[],
            //页数
            page:1,
            more:true
        };
        $scope.arr={
            arr1:[],
            arr2:[],
            arr3:[],
            arr4:[],
            arrColor:[]
        };
        //改变元素宽度
        $scope.changeWidth=function (parent,arr) {
            setTimeout(function () {
                var each_pr=$(parent).find(".each_pr");
                for (var i =0; i<each_pr.length; i++){
                    arr.push(parseInt($(each_pr[i]).css("width")))
                };
                $(parent).find(".pr_center").css("width",(parseFloat(eval(arr.join("+"))/58)+(each_pr.length*0.5)+2)+"rem");
            },0)
        };
        //生成随机色
        $scope.getRandomColor=function () {
            var rgba='rgba('+Math.floor(Math.random()*255)+','
                +Math.floor(Math.random()*255)+','
                +Math.floor(Math.random()*255)+',0.1'+')';
            return rgba;
        };
        //首页轮播图 数据请求
        var swipers=appService._postData(URL+"index.php?s=/Api/index/advertising_site",{site:0});
        swipers.then(function (e) {
            // console.log(e)
            $scope.index.swipers=e.data.data;
            setTimeout(function () {
                var swiper = new Swiper('.swiper-container', {
                    pagination: '.swiper-pagination',
                    nextButton: '.swiper-button-next',
                    prevButton: '.swiper-button-prev',
                    paginationClickable: true,
                    spaceBetween: 0,
                    centeredSlides: true,
                    autoplay: 2500,
                    autoplayDisableOnInteraction: false,
                    loop:true
                });
            },0)
        },function (e) {
            console.log(e)
        });
        //好物甄选 数据请求
        var egoods=appService._postData(URL+"index.php?s=/Api/index/advertising_site",{site:1});
        egoods.then(function (e) {
            // console.log(e)
            $scope.index.egoods=e.data.data;
        },function (e) {
            console.log(e)
        });
        //人气推荐·好物精选 数据请求
        var pr=appService._getData(URL+"index.php?s=/Api/Index/recommend");
        pr.then(function (e) {
            $scope.index.pr=e.data;
            $scope.changeWidth($(".pr_center_container1"),$scope.arr.arr1);
        },function (e) {
            console.log(e)
        });
        //严选精品·物美价优   女装图片 皮鞋图片 数据请求
        var femaleImg=appService._postData(URL+"index.php?s=/Api/index/advertising_site",{site:2});
        femaleImg.then(function (e) {
            $scope.index.fe_male_img=e.data.data;
        },function (e) {
            console.log(e)
        });
        //严选精品·物美价优   女装数据请求
        var female=appService._getData(URL+"index.php?s=/Api/Index/is_beautiful");
        female.then(function (e) {
            console.log(e.data.woman)
            $scope.index.female=e.data.woman;
            $scope.changeWidth($(".pr_center_container2"),$scope.arr.arr2);
        },function (e) {
            console.log(e)
        });
        //严选精品·物美价优   男装数据请求
        var male=appService._getData(URL+"index.php?s=/Api/Index/is_beautiful");
        male.then(function (e) {
            $scope.index.male=e.data.man;
            $scope.changeWidth($(".pr_center_container3"),$scope.arr.arr3);
        },function (e) {
            console.log(e)
        });
        //猜你喜欢 数据请求
        var guessLike=appService._getData(URL+"index.php?s=/Api/Index/is_like");
        guessLike.then(function (e) {
            console.log(e.data)
            $scope.index.guessLike=e.data;
            setTimeout(function () {
                var obj= $(".each_gf");
                for (var i =0; i<obj.length; i++){
                    $scope.arr.arr4.push(parseInt($(obj).css("width")));
                };
                $(".gf_cen").css("width",(parseFloat(eval($scope.arr.arr4.join("+"))/58)+($(obj).length*0.35))+"rem");
                for (var i =0 ; i< obj.length; i++){
                    $scope.arr.arrColor.push($scope.getRandomColor());
                    for (var j= 0; j<$scope.arr.arrColor.length;j++){
                        $(obj[i]).css("background",$scope.arr.arrColor[j]);
                    }
                };
            },0);
        },function (e) {
            console.log(e)
        });
        //今日首发·天天新款 数据请求
        var dayUpdate=appService._postData(URL+"index.php?s=/Api/Index/everyday_goods",{page:$scope.index.page});
        dayUpdate.then(function (e) {
            console.log(e.data.data)
            $scope.index.dayUpdate=e.data.data;
        },function (e) {
            console.log(e)
        });

        function scrollFn(){
            //真实内容的高度
            var pageHeight = Math.max(document.body.scrollHeight,document.body.offsetHeight);
            //视窗的高度
            var viewportHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0;
            //隐藏的高度
            var scrollHeight = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
            if( pageHeight - viewportHeight - scrollHeight <= 10){	//如果满足触发条件，执行
                $(".addMore").css("display","block");
                if ($scope.index.more){
                    $scope.index.more = false;
                    $scope.index.page=$scope.index.page+1;
                    var moreLike=appService._postData(URL+"index.php?s=/Api/Index/everyday_goods",{page:$scope.index.page})
                    moreLike.then(function (e) {
                        if(e.data.data == "" ){
                            $(".addMore").html("没有更多了...")
                        }else {
                            for (var i in e.data.data){
                                $scope.index.dayUpdate.push((e.data.data)[i]);
                            }
                            $scope.index.more=true;
                        }

                    },function (e) {
                        console.log(e)
                    })
                }

            }
        }
        $(window).bind("scroll",scrollFn);	//绑定滚动事件

    }])