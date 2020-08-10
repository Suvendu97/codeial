module.exports.index = function(req, res) {
    return res.json(200, {
        messages: "Lists of Posts",
        posts: []
    })
}