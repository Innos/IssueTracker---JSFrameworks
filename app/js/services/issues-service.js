'use strict';

angular.module('issueTracker.services')
    .factory('issuesService', ['$http', '$q', 'baseUrl', 'identityService', function ($http, $q, baseUrl, identityService) {

        function setHeaders() {
            $http.defaults.headers.common.Authorization = 'Bearer ' + identityService.getAccessToken();
        }

        function getIssues(id,requestParams) {
            setHeaders();
            var defered = $q.defer();
            var url = baseUrl + 'projects/' + id;
            $http.get(url)
                .success(function success(data) {
                    defered.resolve(data);
                })
                .error(function error(err) {
                    defered.reject(err);
                });

            return defered.promise;
        }

        function getAll() {
            return getIssues("");
        }

        function getById(id) {
            return getIssues(id)
        }

        function getMyIssues(requestParams) {
            setHeaders();
            var pageSize = requestParams.pageSize || 10;
            var pageNumber = requestParams.pageNumber || 1;

            var defered = $q.defer();
            var url = baseUrl + 'issues/me?orderBy=DueDate desc' + '&pageSize=' + pageSize + '&pageNumber=' + pageNumber;
            $http.get(url)
                .success(function success(data) {
                    defered.resolve(data);
                })
                .error(function error(err) {
                    defered.reject(err);
                });

            return defered.promise;
        }

        function getByQuery(query, requestParams) {
            setHeaders();
            var pageSize = requestParams.pageSize || 10;
            var pageNumber = requestParams.pageNumber || 1;

            var defered = $q.defer();
            var url = baseUrl + 'issues?' + 'filter=' + query + '&pageSize=' + pageSize + '&pageNumber=' + pageNumber;
            $http.get(url)
                .success(function success(data) {
                    defered.resolve(data);
                })
                .error(function error(err) {
                    defered.reject(err);
                });

            return defered.promise;
        }

        function postIssue(issue) {
            setHeaders();
            var defered = $q.defer();
            var url = baseUrl + 'issues';
            $http.post(url, issue)
                .success(function success(data) {
                    defered.resolve();
                })
                .error(function error(err) {
                    defered.reject(err);
                });

            return defered.promise;
        }

        function updateIssue(id, issue) {
            setHeaders();
            var defered = $q.defer();
            var url = baseUrl + 'issues/' + id;
            $http.put(url, issue)
                .success(function success(data) {
                    defered.resolve();
                })
                .error(function error(err) {
                    defered.reject(err);
                });

            return defered.promise;
        }

        return {
            getAll: getAll,
            getById: getById,
            getByQuery: getByQuery,
            getMyIssues: getMyIssues,
            postIssue: postIssue,
            updateIssue: updateIssue
        }
    }]);
