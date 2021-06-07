function checkAuth(req, res, next) {
    if (req.isAuthenticated()) return next();

    console.log(req.user);

    res.sendStatus(401);
}

module.exports = checkAuth;