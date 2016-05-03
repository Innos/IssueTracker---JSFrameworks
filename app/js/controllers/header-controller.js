"use strict";

angular.module("issueTracker.controllers")
    .controller('HeaderController', ['$scope', '$rootScope', 'identityService', function ($scope, $rootScope, identityService) {
        $scope.identityService = identityService;
        $scope.$on("pageChanged", function (event, selectedPage) {
            $scope.currentPage = selectedPage;
        });
    }]);