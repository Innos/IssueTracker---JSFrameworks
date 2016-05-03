'use strict';

angular.module('issueTracker.controllers', ['ngRoute']);
angular.module('issueTracker.services', []);
angular.module('issueTracker.filters', []);
angular.module('issueTracker.directives', []);

angular.module('issueTracker', [
    'ngRoute',
    'issueTracker.controllers',
    'issueTracker.services',
    'issueTracker.filters',
    'issueTracker.directives',
    'ui.bootstrap.pagination'
])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/'});
    }])
    .constant("baseUrl", "http://softuni-issue-tracker.azurewebsites.net/")
    .constant("separatorImage", "resources/images/separator.png")
    .run(['$rootScope','$location','$route','identityService', function ($rootScope,$location,$route,identityService) {
        $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
            $rootScope.title = current.$$route.title;
        });
        $rootScope.$on('$locationChangeStart',function(event){
            if($location.path() != "/" && !identityService.isLogged()){
                $location.path("/");
            }
        })
    }]);