const {Router} = require('express');
const {ControllerHandler: ch} = require("../../../middlewares")
const {PackController} = require("../../../controllers");
const config = require("../../../config");
const route = Router();
const multer = require("multer");



module.exports = async (app) => {
    app.use("/packs", route);

    route.get("/:id", ch(PackController.getById, (req, res, next) => [req.params.id]))

    route.get("/search/", ch(PackController.searchByText, (req, res, next) => [req.query]))

    route.post("/create", ch(PackController.create, (req, res, next) => [req.body.packName, req.body.tags]))
}

