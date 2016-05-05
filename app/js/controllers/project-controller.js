"use strict";

angular.module("issueTracker.controllers")
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/projects/:id', {
            title: 'Project',
            templateUrl: 'views/project.html',
            controller: 'ProjectController'
        });
    }])
    .controller('ProjectController', ['$scope',
        '$rootScope',
        '$routeParams',
        '$uibModal',
        'identityService',
        'notifyService',
        'projectsService',
        function ($scope,
                  $rootScope,
                  $routeParams,
                  $uibModal,
                  identityService,
                  notifyService,
                  projectsService) {


            $scope.issuesParams = {
                pageNumber: 1,
                pageSize: 5
            };

            $scope.issuesLoading = true;
            $scope.projectLoading = true;

            // on load
            var id = $routeParams['id'];

            projectsService.getById(id).then(
                function success(data) {
                    $scope.project = data;
                    $scope.projectLoading = false;
                    $scope.isAuthorized = (identityService.isAdmin() || $scope.project.Lead.Id === identityService.getId()) === 'true';
                    $rootScope.$broadcast("pageChanged", data.Name);
                }, function error(err) {
                    notifyService.showError("Error accessing Project: ", err);
                }
            );

            $scope.reloadPage = function () {
                if (!$scope.allIssues) {
                    projectsService.getAllIssuesByProjectId(id).then(
                        function success(data) {
                            $scope.issuesLoading = false;
                            $scope.allIssues = data;
                            changePage();
                        }, function error(err) {
                            notifyService.showError("Error accessing issues: ", err);
                        });
                }
                else {
                    changePage();
                }
            };

            function changePage() {
                var start = ($scope.issuesParams.pageNumber - 1) * $scope.issuesParams.pageSize;
                var end = $scope.issuesParams.pageNumber * $scope.issuesParams.pageSize;
                if (end >= $scope.allIssues.length) {
                    end = $scope.allIssues.length - 1;
                }
                $scope.issues = $scope.allIssues.slice(start, end);
            }

            $scope.reloadPage();

        }]);