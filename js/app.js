
    /**
     * Created by User on 2017/12/21.
     */
    var yx_mallApp = angular.module("yx_mallApp",[
        "ui.router",
        "oc.lazyLoad"
    ])
        .config(["$stateProvider","$urlRouterProvider","$provide","$compileProvider","$controllerProvider","$filterProvider","RouterList_Config",
            function ($stateProvider,$urlRouterProvider,$provide,$compileProvider,$controllerProvider,$filterProvider,RouterList_Config) {
                yx_mallApp.controller = $controllerProvider.register;
                yx_mallApp.directive = $compileProvider.directive;
                yx_mallApp.filter = $filterProvider.register;
                yx_mallApp.factory = $provide.factory;
                yx_mallApp.service  =$provide.service;
                yx_mallApp.constant = $provide.constant;
                $urlRouterProvider.otherwise("/_login");
                var routerlist=RouterList_Config
                angular.forEach(routerlist,function(element){
                    if(element.files.length!=0){
                        $stateProvider.state(element.name,{
                            url:element.url,
                            templateUrl:element.templateUrl,
                            controller:element.controller,
                            resolve:{
                                deps:["$ocLazyLoad",function($ocLazyLoad){
                                    return $ocLazyLoad.load(element.files[0]);
                                }]
                            }
                        })
                    }else{
                        $stateProvider.state(element.name,{
                            url:element.url,
                            templateUrl:element.templateUrl,
                            controller:element.controller
                        })
                    }
                })
            }])
        .run(['$rootScope',function ($rootScope) {
            $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                //苏格优品用户进入展示的底部栏
                $rootScope.tabsConfig=[
                    {
                        sref:'.index',
                        img:'images/1_index_noselect.png',
                    },{
                        sref:'.classify',
                        img:'images/2_classify_noselect.png',
                    },{
                        sref:'.shopCar',
                        img:'images/3_shopping_noselect.png',
                    },{
                        sref:'.my',
                        img:'images/4_my_noselect.png',
                    }
                ];
                //苏格时代商城用户进入展示的底部栏
                $rootScope.tabConfig=[
                    {
                        sref:'.index',
                        img:'images/1_index_noselect.png',
                    },{
                        sref:'.classify',
                        img:'images/2_classify_noselect.png',
                    },{
                        sref:'.alliance',
                        img:'images/5_store_noselect.png',
                    },{
                        sref:'.shopCar',
                        img:'images/3_shopping_noselect.png',
                    },{
                        sref:'.myOld',
                        img:'images/4_my_noselect.png',
                    }
                ]
                var stateUrl=toState.url,
                    staUrl=toState.url,
                    _idx=null,
                    _index=null;
                switch (stateUrl){
                    case '/_index':
                        _index=0;
                        break;
                    case '/_classify':
                        _index=1;
                        break;
                    case '_shopCar':
                        _index=2;
                        break;
                    case '_my':
                        _index=3;
                        break;
                    default:
                        _index=0;
                };
                switch (staUrl){
                    case '/_index':
                        _idx=0;
                        break;
                    case '/_classify':
                        _idx=1;
                        break;
                    case '_alliance':
                        _idx=2;
                        break;
                    case '_shopCar':
                        _idx=3;
                        break;
                    case '_myOld':
                        _idx=4;
                        break;
                    default:
                        _idx=0;
                };
                $rootScope.tabsConfig[_index].img=$rootScope.tabsConfig[_index].img.replace('no','');
                $rootScope.tabConfig[_idx].img=$rootScope.tabConfig[_idx].img.replace('no','');
            });

        }])



