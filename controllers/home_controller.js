const Post = require('../models/post');

const User = require('../models/user');

//exports home function which renders a view call home using ejs
module.exports.home = function(req, res) {
    // console.log(req.cookies);
    // res.cookie('user_id',25);
    //return res.end('<h1>Express is up for codeial!</h1>');
    // Post.find({}, function(err, posts) {
    //     return res.render('home', {
    //         title : "Codeial | Home",
    //         posts: posts
    //     });
    // });

    // finding all the post and populating user of each post, after that I'm doing call back
    Post.find({})
    .populate('user')
    .populate({        //preloading two models, 1.comments and user of the comments
        path: 'comments',
        populate: {
            path:'user'
        }
    })
    .exec(function(err, posts){

        User.find({}, function(err, users) {
            return res.render('home', {
                title : "Codeial | Home",   // these are response locals we can only access in font page template 
                posts: posts,
                all_users: users
            });
        });
    
    })
    
}