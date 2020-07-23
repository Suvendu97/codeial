const mongoose = require('mongoose');

//mongodb is running in background
//the server is running in localhost
//giving the database name as codeial_development
mongoose.connect('mongodb://localhost/codeial_development');

//getting the connection
const db = mongoose.connection;

//in case there is an erron connection to the db
// console.err displays my console.log like an error
db.on('err', console.error.bind(console, "Error in connecting to mongodb"));

db.once('open', function() {
    console.log('connected to Database :: MongoDB');
});

// export this module to use it
module.exports = db;