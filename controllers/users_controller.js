const User = require('../models/user');
const fs =require('fs');
const path = require('path');

module.exports.profile = function(req, res) {
    // //res.end('<h1>User Profile</h1>');
    // return res.render('users', {
    //     title : "User Profile"
    // });

    User.findById(req.params.id, function(err, user) {

            //if user is found send the user to the user page (views-> user.ejs)
            return res.render('users', {
                title : "User Profile",
                profile_user: user
            });
    }); 
}

module.exports.update = async function(req, res){
    // if(req.user.id == req.params.id){
    //     User.findByIdAndUpdate(req.params.id, req.body, function(err, user) {
    //         req.flash('success', 'Updated');
    //         return res.redirect('back');
    //     });
    // } else {
    //     req.flash('error','Unauthorized');
    //     return res.status(401).send('Unauthorized');
    // }

    if(req.user.id == req.params.id) {
        try {

            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, function(err){
                if(err) { console.log('****multer Error: ', err)}

                user.name = req.body.name;
                user.email = req.body.email;
                if(req.file) {

                    if(user.avatar){
                        if(fs.existsSync(path.join(__dirname, '..', user.avatar))){
                         fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                        }
                         
                     //    fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                     }

                    // this is saving the path of the uploaded file into the avatar field in the user
                    user.avatar = User.avatarPath +'/'+ req.file.filename;
                }
                user.save();
                return res.redirect('back');
            });

        } catch(err){
            req.flash('error', err);
            return res.redirect('back');
        }
    } else {
        req.flash('error','Unauthorized');
        return res.status(401).send('Unauthorized');
    }
}

//render the sign up page when SignUp method called
module.exports.signUp = function(req, res) {
    // if already authenticated, redirect to profile page it means if the user is authenticated he can't access sign-in or sign-up page
    if(req.isAuthenticated()) {
       return res.redirect('/users/profile');
    }
    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    })
}

//render the sign in page
module.exports.signIn = function(req, res) {
    // if already authenticated, redirect to profile page it means if the user is authenticated he can't access sign-in or sign-up page
    if(req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    })
}


//get the sign up data
module.exports.create = function(req, res) {
    // id confirm password doesn't match with password, return back
    if(req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user) { //
        if(err) {console.log('Error in finding user in signing up'); return}

          
        // if user not found then create a new user
        if(!user) {
            User.create(req.body, function(err, user) {
                if(err) {console.log('Error in creating user while signing up'); return}
                
                return res.redirect('/users/sign-in');
            })
        } else {
            return res.redirect('back');
        }
    });
}

//sign in and create a season for the user
module.exports.createSession = function(req, res) {
    // //steps to suthenticate
    // // find the use
    // User.findOne({email: req.body.email}, function(err, user) {
    //     if(err) {console.log('Error in finding user in signing in'); return}
    //     //handle user found
    //     if(user) {
    //         //handle password which don't match
    //         if(user.password != req.body.password) {
    //             return res.redirect('back');
    //         }
    //         //handle session creation
    //         res.cookie('user_id', user.id);
    //         return res.redirect('/users/profile/<%= user.id %>');
    //     } else {
    //         //handle user not found
    //         return res.redirect('back');
    //     }
    // });
    req.flash('success', 'Logged in Successfully');
    return res.redirect('/');

}

//sign out
module.exports.destroySession = function(req, res){
    req.logout(); 
    req.flash('success', 'You have Logged Out!');
    return res.redirect('/');
}

// module.exports.destroySession=function(req, res) {
//     res.clearCookie('user_id');
//     return res.redirect('/');
// }

