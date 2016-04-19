'use strict';

angular.module('issueTracker', [
    'ngRoute',
    'issueTracker.controllers.home',
    'issueTracker.services.users',
    'commonFilters.customFilters'
])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/'});
    }])
    .constant("baseUrl", "http://softuni-issue-tracker.azurewebsites.net/")
    .run(['$rootScope', function ($rootScope) {
        $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
            $rootScope.title = current.$$route.title;
        });
    }]);