
const nodeMailer = require('../config/nodemailer');

// this is another way of exporting method
exports.newComment = (comment) => {
    // console.log('Inside new Comment Mailer', comment);
    let htmlString = nodeMailer.renderTemplate({comment: comment}, 'comments/new_comment.ejs');
    

    nodeMailer.transporter.sendMail({
        from: 'suvendupolley.sp@gmail.com',
        to: comment.user.email,
        subject: "new comment published",
        html: htmlString
    }, (err, info) => {
        if(err){console.log('error in sending mail', err); return;}

        // console.log('Message sent', info);
        return;
    });
}