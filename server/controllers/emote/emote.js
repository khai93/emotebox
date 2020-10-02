const { json } = require("body-parser");
const { EmoteService } = require("../../services");
const { EmoteUtil } = require("../../utils");
const S3Controller = require("../s3");

const EmoteController = {}

EmoteController.getAllByName = (name) => EmoteService.getAllByName(name);

EmoteController.getById = (id) => EmoteService.getById(id);

EmoteController.getByCreatorId = (id) => EmoteService.getByCreatorId(id);

EmoteController.searchByText = (query) => {
    try {
        const limit = parseInt(query.limit) || 25;
        const startAt = parseInt(query.startAt) || 0;
        const searchTerm = query.searchTerm;

        return EmoteService.searchByText(searchTerm, startAt, limit);
    } catch (e) {
        throw e;
    }
}

EmoteController.create = async (user, name, imageFile, tagsParam) => {
    const imagePath = imageFile.path;
    let tags = tagsParam;

    try {
        const upload = await S3Controller.uploadFile(imagePath);

        const split = upload.Location.split("emotes/");
        
        if (split.length < 2) {
            throw new Error("Unexpected upload location");
        }

        return EmoteService.create(name, upload.Location.split("emotes/")[1], tags || [],  user.id);
    } catch (e) {
        throw e;
    }
}

EmoteController.editById = async (user, body) =>  {
    const emote_id = body.emote_id;
    const name = body.name;
    const tags = body.tags;

    try {
        const emote = await EmoteUtil.checkIfEmoteOwner(emote_id, user.id);

        if (!emote) {
            throw new Error("You are not authorized to edit this emote!")
        }

        return EmoteService.editById(emote_id, name, tags);
    } catch (e) {
        throw e;
    }
}

EmoteController.addTag = async (user, body) => {
    const emote_id = body.emote_id;
    const tag = body.tag;
    
    try {
        const emote = await EmoteUtil.checkIfEmoteOwner(emote_id, user.id);

        if (!emote) {
            throw new Error("You are not authorized to edit this emote!")
        }

        return EmoteService.addTag(emote_id, tag);
    } catch (e) {
        throw e;
    }
}

EmoteController.removeTag = async (user, body) => {
    const emote_id = body.emote_id;
    const tag = body.tag;

    try {
        const emote = await EmoteUtil.checkIfEmoteOwner(emote_id, user.id);

        if (!emote) {
            throw new Error("You are not authorized to edit this emote!")
        }

        return EmoteService.removeTag(emote_id, tag);
    } catch (e) {
        throw e;
    }
}

EmoteController.deleteOne = (id) => EmoteService.deleteOneById(id)


module.exports = EmoteController;