const {Router} = require('express');
const {ControllerHandler: ch} = require("../../../middlewares")
const {EmoteController, PackController, S3Controller} = require("../../../controllers");
const config = require("../../../config");
const route = Router();
const multer = require("multer");


const upload = multer({
    storage: multer.diskStorage(config.multerStorage)
});

module.exports = async (app) => {
    app.use("/emotes", route);

    route.get("/:id", ch(EmoteController.getEmoteById, (req, res, next) => [req.params.id]))

    route.get("/search/", ch(EmoteController.searchByText, (req, res, next) => [req.query]))

    route.post("/create", upload.single('emote_file'), ch(EmoteController.create, (req, res, next) => [req.body.emoteName, req.file.path, req.body.tags]))

    route.get("/images/:filename", ch(S3Controller.retrieveImage, (req, res, next) => [req.params.filename, res]))
}

