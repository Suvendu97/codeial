// requiring express library
const express = require('express');

const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');

//import mongoose.js to use the mongoDB database
const db = require('./config/mongoose');
//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
// store the session info even when the server restarts it remains in db so that  signed in user don't get signed out in case the server restarts
const MongoStore = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');

app.use(sassMiddleware( {
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));
app.use(express.urlencoded());

app.use(cookieParser());

//use static folder(which is assets in this case)
app.use(express.static('./assets'));

// make the uploads path available to the browser
app.use('/uploads', express.static(__dirname + '/uploads'));

app.use(expressLayouts);
//extract style and script from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


//setup the view engine
app.set('view engine', 'ejs');
// lookout for views in views folder 
app.set('views', './views');

// mongo store is used to store the session cookie in the db
app.use(session( {
    name: 'codeial',
    // ToDO change the secret before deployment in production mode
    secret:'blaSomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        },
        function(err) {
            console.log(err|'connect-mongodb setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());


app.use(passport.setAuthenticatedUser);

//use express router
//any request comes in, it will send that to routes index.js


app.use(flash());
app.use(customMware.setFlash);

app.use('/',require('./routes'));

app.listen(port, function(err) {
    if(err) {
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is up and running on port: ${port}`);
});
