const {Router} = require('express');
const route = Router();

module.exports = async (app) => {
    app.use("/test", route);
    route.get("/world", (req, res) => {
        return res.send("Hello World!")
    });
}