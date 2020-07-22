const express = require('express');
const app = express();
const port = 8000;

//use express router
//any request comes in, it will send that to routes index.js
app.use('/',require('./routes'));


//setup the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port, function(err) {
    if(err) {
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is up and running on port: ${port}`);
});