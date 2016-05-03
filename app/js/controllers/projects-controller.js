"use strict";

angular.module("issueTracker.controllers")
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/projects/:id', {
            title: 'Projects',
            templateUrl: 'views/project.html',
            controller: 'ProjectsController'
        });
    }])
    .controller('ProjectsController', ['$scope',
        '$rootScope',
        '$routeParams',
        'identityService',
        'notifyService',
        'projectsService',
        'issuesService',
        'separatorImage',
        function ($scope,
                  $rootScope,
                  $routeParams,
                  identityService,
                  notifyService,
                  projectsService,
                  issuesService,
                  separatorImage) {

            var issuesParams = {
                pageNumber: 1,
                pageSize: 10
            };

            var id = $routeParams['id'];

            projectsService.getById(id).then(
                function success(data){
                    $scope.project = data;
                },function error(err){
                    notifyService.showError("Error resolving project: ",err);
                }
            );

            issuesService.getByQuery('Project.Id=' + id,issuesParams).then(
                function success(data){
                    $scope.issues = data;
                },function error(err){
                    notifyService.showError("Error resolving issues: ",err);
                })

        }]);