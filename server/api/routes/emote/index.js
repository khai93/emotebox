const {Router} = require('express');
const {ControllerHandler: ch} = require("../../../middlewares")
const {EmoteController, PackController} = require("../../../controllers");
const route = Router();

module.exports = async (app) => {
    app.use("/emotes", route);

    route.get("/:id", ch(EmoteController.getEmoteById, (req, res, next) => [req.params.id]))

    route.get("/search/", ch(EmoteController.searchByText, (req, res, next) => [req.query]))

    route.post("/create", ch(EmoteController.create, (req, res, next) => []))
}

