const Post = require('../models/post');

const User = require('../models/user');

//exports home function which renders a view call home using ejs
module.exports.home = async function(req, res) {

    // finding all the post and populating user of each post, after that I'm doing call back
    try{
        // populate the user of each post
       let posts = await Post.find({})
       .sort('-createdAt')
       .populate('user')
       .populate({
           path: 'comments',
           populate: {
               path: 'user'
           },
           populate: {
               path: 'likes'
           }
       }).populate('comments')
       .populate('likes');
   
       let users = await User.find({});

       return res.render('home', {
           title: "Codeial | Home",
           posts:  posts,
           all_users: users
       });

   }catch(err){
       console.log('Error', err);
       return;
   }
  
}
