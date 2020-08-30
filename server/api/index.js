const { Router } = require("express");
const test = require("./routes/test");
const auth = require("./routes/auth");

module.exports = () => {
    const app = Router();
    test(app);
    auth(app);

    return app;
}