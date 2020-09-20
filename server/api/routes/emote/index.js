const {Router} = require('express');
const {ControllerHandler: ch, CheckAuth} = require("../../../middlewares")
const {EmoteController, S3Controller} = require("../../../controllers");
const config = require("../../../config");
const route = Router();
const multer = require("multer");


const upload = multer({
    storage: multer.diskStorage(config.multerStorage)
});

module.exports = async (app) => {
    app.use("/emotes", route);

    route.get("/search", ch(EmoteController.searchByText, (req, res, next) => [req.query]))

    route.get("/id/:id", ch(EmoteController.getById, (req, res, next) => [req.params.id]))
    
    route.get("/creator/:id", ch(EmoteController.getByCreatorId, (req, res, next) => [req.params.id]))
    
    route.post("/create", CheckAuth, upload.single('emote_file'), ch(EmoteController.create, (req, res, next) => [req.user, req.body.emoteName, req.file, req.body.tags]))

    route.get("/images/:filename", ch(S3Controller.retrieveImage, (req, res, next) => [req.params.filename, res]))
}

