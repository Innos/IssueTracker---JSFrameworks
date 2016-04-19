"use strict";

angular.module('videoApp.services.videos',[])
    .factory('videos',[function(){

        var video = new Video('Course introduction','http://newtrend.bg/wp-content/uploads/2015/03/SoftUni-Logo.png',new VideoLength(3,32,1),'IT',3,2,new Date(2014,11,15),false);
        var video2 = new Video('JS Frameworks','http://code-maven.com/img/angularjs.png',new VideoLength(1,30,12),'Java Script',21,150,new Date(2016,3,1),true);
        var video3 = new Video('Applications JS','http://newtrend.bg/wp-content/uploads/2015/03/SoftUni-Logo.png',new VideoLength(2,15,17),'Java Script',48,15,new Date(2016,3,1),true);
        var video4 = new Video('Google','http://i.telegraph.co.uk/multimedia/archive/03105/Google_3105693b.jpg',new VideoLength(12,10,3),'IT',13,27,new Date(2015,11,24),false);
        video2.addComment(new Comment("Gosho","Damn Hard. Need more info.",new Date(2016, 3, 4, 12, 30, 0),'https://softuni.bg'));
        video2.addComment(new Comment("Pesho","De si be Gosho, che mi grumna glavata ot toq Angular da piem po edna bira!",new Date(2016, 3, 5, 22, 30, 0),'http://www.pesho.pl/'));
        video.addComment(new Comment("Pesho","Congratulations Nakov",new Date(2016, 0, 9, 12, 30, 0),'http://www.pesho.pl/'));

        var videos = [video,video2,video3,video4];

        function getVideos(){
            return videos;
        }

        function addVideo(video){
            videos.push(video);
        }

        return {
            getVideos: getVideos,
            addVideo: addVideo
        }
    }]);
