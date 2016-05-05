"use strict";

angular.module('issueTracker.services')
    .factory('authorizationService', ['$http', '$q', 'baseUrl', 'identityService', function ($http, $q, baseUrl, identityService) {

        function login(user) {
            var defered = $q.defer();
            var url = baseUrl + 'api/Token';
            var data = 'Username=' + user.Email + '&Password=' + user.Password + '&grant_type=password';
            $http.post(url, data, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
                .success(function success(data) {
                    $http.defaults.headers.common.Authorization = 'Bearer ' + data.access_token;
                    setIdentity(data.access_token).then(function () {
                        defered.resolve(data);
                    });
                })
                .error(function error(err) {
                    defered.reject(err);
                });

            return defered.promise;
        }

        function register(user) {
            var defered = $q.defer();
            var url = baseUrl + 'api/Account/Register';
            $http.post(url, user)
                .success(function success() {
                    $http.defaults.headers.common.Authorization = 'Bearer ' + data.access_token;
                    login(user).then(function success(userData) {
                        setIdentity(userData.access_token).then(function () {
                            defered.resolve(userData);
                        });
                    })
                })
                .error(function error(err) {
                    defered.reject(err);
                });

            return defered.promise;
        }

        function setIdentity(accessToken) {
            var defered = $q.defer();
            var url = baseUrl + 'users/me';

            $http.get(url).success(function success(user) {
                identityService.setIdentity(user,accessToken);
                defered.resolve(user);
            });

            return defered.promise;
        }

        function changePassword(passwordData) {
            var defered = $q.defer();
            var url = baseUrl + 'api/Account/ChangePassword';
            var data = 'OldPassword=' + passwordData.oldPassword + '&NewPassword=' + passwordData.newPassword + '&ConfirmPassword=' + passwordData.confirmPassword;
            $http.post(url, data, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
                .success(function success(data) {
                    defered.resolve(data);
                })
                .error(function error(err) {
                    defered.reject(err);
                });

            return defered.promise;
        }

        function logout() {
            identityService.removeIdentity();
        }

        return {
            login: login,
            register: register,
            logout: logout,
            changePassword: changePassword
        }
    }]);
