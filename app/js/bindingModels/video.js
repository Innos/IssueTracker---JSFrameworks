var Video = function(){
    function Video(title,picture,length,category, subscriberCount,likes,date,hasSubtitles){
        this.title = title;
        this.picture = picture;
        this.length = length;
        this.category = category;
        this.subscriberCount = subscriberCount;
        this.likes = likes;
        this.date = date;
        this.hasSubtitles = hasSubtitles;
        this._comments = [];
    }

    Video.prototype.addComment = function(comment){
        this._comments.push(comment);
    };

    return Video;
}();
