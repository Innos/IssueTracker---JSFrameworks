"use strict";

angular.module("issueTracker.home", ['ngRoute', 'customFilters'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            title:'Home',
            templateUrl: 'partials/home.html',
            controller: 'HomeController'
        });
    }])
    .controller('HomeController', ['$scope', 'users', function ($scope, users) {

    }]);