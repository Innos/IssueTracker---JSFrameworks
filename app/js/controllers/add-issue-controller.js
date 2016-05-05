"use strict";

angular.module("issueTracker.controllers")
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/projects/:id/add-issue', {
            title:"Add Issue",
            resolve: {
                showModal: ['$uibModal', '$route', function ($uibModal, $route) {
                    var modalInstance = $uibModal.open({
                        animation: true,
                        templateUrl: 'views/modal/add-issue.html',
                        controller: 'AddIssueController',
                        resolve: {
                            id: function () {
                                return $route.current.params['id'];
                            }
                        }
                    });
                }]
            }
        });
    }])
    .controller('AddIssueController', ['$scope', '$uibModalInstance', '$location','projectsService', 'issuesService','notifyService', 'id',
        function ($scope, $uibModalInstance, $location, projectsService, issuesService, notifyService, id) {

            projectsService.getById(id).then(function success(data){
                $scope.project = data;
            },function error(err){
                notifyService.showError('Error accessing project:', err);
            });



            $scope.addIssue = function () {
                issuesService.postIssue(issue).then(function success(data) {
                    $uibModalInstance.close();
                    $location.path('/projects/' + id);
                    notifyService.showInfo('Issue added successfully');
                }, function error(err) {
                    $uibModalInstance.dismiss('cancel');
                    $location.path('/projects/' + id);
                    notifyService.showError('Error adding issue:', err);
                });
            };

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
                $location.path('/projects/' + id);
            };


            //Datepicker
            $scope.today = function() {
                $scope.dt = new Date();
            };
            $scope.today();

            $scope.openDatepicker = function() {
                $scope.datepicker.opened = true;
            };

            $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
            $scope.format = $scope.formats[0];
            $scope.altInputFormats = ['M!/d!/yyyy'];

            $scope.datepicker = {
                opened: false
            };

            $scope.dateOptions = {
                formatYear: 'yy',
                maxDate: new Date(2020, 5, 22),
                minDate: new Date(),
                startingDay: 1
            };


        }]);