"use strict";

angular.module('issueTracker.services.users',[])
    .factory('users',['$http','$q','baseUrl',function($http,$q,baseUrl){

        function login(user){
            var defered = $q.defer();
            var url = baseUrl + 'api/Token';
            $http.post(url,user).then(
                function (success) {
                    defered.resolve(success.data);
                },
                function (error){
                    defered.$$reject(error);
                }
            );

            return defered.promise;
        }

        function register(user){
            var defered = $q.defer();
            var url = baseUrl + 'api/Account/Register';
            $http.post(url,user).then(
                function (success){
                    defered.resolve(success.data);
                },
                function (error) {
                    defered.reject(error);
                }
            )

            return defered.promise;
        }

        function changePassword(){

        }

        function logout(){

        }

        return {
            getVideos: getVideos,
            addVideo: addVideo
        }
    }]);
