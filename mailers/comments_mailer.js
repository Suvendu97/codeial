
const nodeMailer = require('../config/nodemailer');

// this is another way of exporting method
exports.newComment = (comment) => {
    console.log('Inside new Comment Mailer', comment);

    nodeMailer.transporter.sendMail({
        from: 'suvendupolley.sp@gmail.com',
        to: comment.user.email,
        subject: "new comment published",
        html: '<h1> Yor Comment is now published</h1>' 
    }, (err, info) => {
        if(err){console.log('error in sending mail', err); return;}

        console.log('Message sent', info);
        return;
    });
}