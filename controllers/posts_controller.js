const Post = require('../models/post');
// const user = require('../models/user');
const Comment = require('../models/comment');

// to create a post in DB
module.exports.create = function(req, res) {
  
 Post.create({
        content: req.body.content,
        user: req.user._id
    }, function(err, post) {
        
        if(err) { console.log('error in creating a post'); return; }

        return res.redirect('back');
    }); 
}


module.exports.destroy = function(req, res) {
    Post.findById(req.params.id, function(err, post) {
        //  ideally we should be doing ._id
        //  but when I'm comparing two ids of two objects we need to convert them into string
        // .id means converting the object id into string
        if(post.user == req.user.id){
            post.remove();

            Comment.deleteMany({post: req.params.id}, function(err){
                return res.redirect('back');
            });
        } else {
            return res.redirect('back');
        }
    });
}