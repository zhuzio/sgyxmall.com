yx_mallApp
    .directive('payKeyboard',function(){
        return{
            restrict:'EA',
            replace:true,
            templateUrl:'js/directive/applyDirective.html',
            scope:{
                fullMoney:'@',
            },
            link:function(){},
            controller:function($scope){
                $scope.applyObject={
                    pan:['1','2','3','4','5','6','7','8','9','取消','0','删除'],
                    passwordGroup:[],
                    currentInputIndex:-1
                };
                $scope.initPasswordGroup=function(){
                    console.log( $scope.applyObject.currentInputIndex)
                    $scope.applyObject.currentInputIndex = -1;

                    $scope.applyObject.passwordGroup=[];

                    for(var i=0;i<6;i++){
                        $scope.applyObject.passwordGroup.push({
                            value:null
                        })
                    };
                };
                $scope.initPasswordGroup();
                $scope.inputPsd=function (num) {
                    switch (num){
                        case '取消':
                            $scope.$emit('cancelApply');

                            $scope.initPasswordGroup();
                            break;
                        case '删除':
                            try {
                                $scope.applyObject.passwordGroup[$scope.applyObject.currentInputIndex].value=null;
                                $scope.applyObject.currentInputIndex--;
                            }catch (e){
                                return true;
                            }
                            break;
                        default:
                            $scope.applyObject.currentInputIndex++;
                            $scope.applyObject.passwordGroup[$scope.applyObject.currentInputIndex].value=num;
                            console.log($scope.applyObject.passwordGroup)
                            break;
                    }
                };
                $scope.$watch('applyObject.currentInputIndex',function(nv){
                    if(nv){
                        if(nv==5){
                            try{
                                var afterInputPassword='';
                                angular.forEach($scope.applyObject.passwordGroup,function(element){
                                    afterInputPassword+=element.value;
                                });
                                $scope.initPasswordGroup();
                                $scope.applyObject.currentInputIndex=-1;
                                $scope.$emit('applyInputSuccess',afterInputPassword);
                                //密码输入完成,afterInputPassword就是密码;直接发起请求;
                                //请求处理完毕,currentInputIndex重置为-1,遍历数组填充为{value:null}
                                //为防止请求期间网络问题，当用户输入完毕发起请求的同时，最好出现一个遮罩层,防止用户点击操作
                            }catch(e){
                                return true;
                            }
                        }else if(nv<-1){
                            $scope.applyObject.currentInputIndex=-1;
                            //删除完毕;
                            //todo...
                        }
                    }
                });
            }
        }
    })