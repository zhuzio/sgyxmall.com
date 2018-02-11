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
                    console.log(e)
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
                    console.log(e);
                    defer.reject(e);
                });
                return defer.promise;
            }
        }
    }]);