var Comment = function(){
    function Comment(username,content,date,pictureUrl){
        this.username = username;
        this.date = date;
        this.content = content;
        this.websiteUrl = pictureUrl;
    }

    return Comment;
}();
