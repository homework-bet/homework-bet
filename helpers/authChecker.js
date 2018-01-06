// from https://stackoverflow.com/questions/18700729/how-to-use-the-middleware-to-check-the-authorization-before-entering-each-route

var authChecker = function(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.redirect("/login");
    }
}

module.exports = authChecker;