"use strict";

angular.module("videoApp.AddVideo", ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/AddVideo', {
            templateUrl: 'AddVideo/AddVideo.html',
            controller: 'AddVideoController'
        });
    }])
    .controller('AddVideoController', ['$scope', 'videos', '$location', function ($scope, videos, $location) {
        $scope.videos = videos.getVideos();

        $scope.submit = function (video) {
            console.log(video.date);
            video.date = video.date ? new Date(video.date) : new Date();
            video.length = new VideoLength(video.hours,video.minutes,video.seconds);
            video.subscriberCount = video.subscriberCount || 0;
            video.likes = video.likes || 0;
            video.hasSubtitles = video.hasSubtitles === "true" ? true : false;

            videos.addVideo(new Video(video.title, video.picture, video.length, video.category, video.subscriberCount,video.likes, video.date, video.hasSubtitles));
            $location.path('/Home');
        }
    }]);