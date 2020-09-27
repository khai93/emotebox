const {Router} = require('express');
const {ControllerHandler: ch, CheckAuth} = require("../../middlewares");
const {EmoteController, S3Controller} = require("../../controllers");
const { EmoteValidate, S3Validate } = require("../validations");
const config = require("../../config");
const route = Router();
const multer = require("multer");
const EmoteService = require('../../services/emote');

const upload = multer({
    storage: multer.diskStorage(config.multerStorage)
});

module.exports = async (app) => {
    app.use("/emotes", route);

    route.get("/search", ...EmoteValidate('searchByText'), ch(EmoteController.searchByText, (req, res, next) => [req.query]))

    route.get("/id/:id", ...EmoteValidate('getById'), ch(EmoteController.getById, (req, res, next) => [req.params.id]))
    
    route.get("/creator/:id", ...EmoteValidate('getByCreatorId'), ch(EmoteController.getByCreatorId, (req, res, next) => [req.params.id]))
    
    route.get("/images/:filename", ...S3Validate('retrieveImage'), ch(S3Controller.retrieveImage, (req, res, next) => [req.params.filename, res]))

    route.post("/create", CheckAuth, upload.single('file'), ...EmoteValidate('create'), ch(EmoteController.create, (req, res, next) => [req.user, req.body.emoteName, req.file, req.body.tags]))

    route.post("/edit", CheckAuth, ...EmoteValidate('editById'), ch(EmoteController.editById, (req, res, next) => [req.user, req.body]))

    route.post("/edit/tag/add", CheckAuth, ...EmoteValidate('editTag'), ch(EmoteController.addTag, (req, res, next) => [req.user, req.body]))

    route.post("/edit/tag/remove", CheckAuth, ...EmoteValidate('editTag'), ch(EmoteController.removeTag, (req, res, next) => [req.user, req.body]))

}

