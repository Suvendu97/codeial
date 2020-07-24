// requiring express library
const express = require('express');

const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');

//import mongoose.js to use the mongoDB database
const db = require('./config/mongoose');

app.use(express.urlencoded());

app.use(cookieParser());

//use static folder(which is assets in this case)
app.use(express.static('./assets'));


app.use(expressLayouts);
//extract style and script from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//use express router
//any request comes in, it will send that to routes index.js
app.use('/',require('./routes'));


//setup the view engine
app.set('view engine', 'ejs');
// lookout for views in views folder 
app.set('views', './views');

app.listen(port, function(err) {
    if(err) {
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is up and running on port: ${port}`);
});