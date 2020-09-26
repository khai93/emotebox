const {Router} = require('express');
const {ControllerHandler: ch, CheckAuth} = require("../../middlewares");
const {EmoteController, S3Controller} = require("../../controllers");
const { EmoteValidate, S3Validate } = require("../validations");
const config = require("../../config");
const route = Router();
const multer = require("multer");


const upload = multer({
    storage: multer.diskStorage(config.multerStorage)
});

module.exports = async (app) => {
    app.use("/emotes", route);

    route.get("/search", ...EmoteValidate('searchByText'), ch(EmoteController.searchByText, (req, res, next) => [req.query]))

    route.get("/id/:id", ...EmoteValidate('getById'), ch(EmoteController.getById, (req, res, next) => [req.params.id]))
    
    route.get("/creator/:id", ...EmoteValidate('getByCreatorId'), ch(EmoteController.getByCreatorId, (req, res, next) => [req.params.id]))
    
    route.post("/create", CheckAuth, ...EmoteValidate('create'), upload.single('emote_file'), ch(EmoteController.create, (req, res, next) => [req.user, req.body.emoteName, req.file, req.body.tags]))

    route.get("/images/:filename", ...S3Validate('retrieveImage'), ch(S3Controller.retrieveImage, (req, res, next) => [req.params.filename, res]))
}

