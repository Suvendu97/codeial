

module.exports.address = function(req, res) {
    //res.end('<h1>I am from Kolkata</h1>');
    return res.render('address', {
        title : "Users location"
    });
}

//now http://localhost:8000/address/location the search completed and it will send the response to the browser