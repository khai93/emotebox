const sinon = require('sinon'),
      assert = require('assert'),
      EmoteController = require('./emote'),
      { EmoteService } = require('../../services'),
      { EmoteUtil } = require("../../utils"),
      S3Controller = require("../s3");


const emotes = [{
    _id: 1,
    name: "Lorem",
    imageKey: "fake.png",
    installs: 24,
    tags: ["Smile"],
    creator_id: "creator1"
},
{
    _id: 2,
    name: "Lorem2",
    imageKey: "fake2.png",
    installs: 0,
    tags: ["Smile2"],
    creator_id: "creator2"
},
{
    _id: 3,
    name: "Lorem3",
    imageKey: "fake3.png",
    installs: 13,
    tags: ["Smile3"],
    creator_id: "creator3"
}];


describe('EmoteController', () => {
    describe('#getAllByName', () => {
        it('should return a promise', async () => {
            const stub = sinon.stub(EmoteService, 'getAllByName').callsFake((name) => {
                return Promise.resolve(emotes);
            });

            assert.deepStrictEqual(await EmoteController.getAllByName("mock"), emotes);
        });
    });

    describe('#getById', () => {
        it('should return a promise', async () => {
            const stub = sinon.stub(EmoteService, 'getById').callsFake((id) => {
                return Promise.resolve(emotes);
            });

            assert.deepStrictEqual(await EmoteController.getById("mock"), emotes);
        });
    });

    describe('#getByCreatorId', () => {
        it('should return a promise', async () => {
            const stub = sinon.stub(EmoteService, 'getByCreatorId').callsFake((id) => {
                return Promise.resolve(emotes);
            });

            assert.deepStrictEqual(await EmoteController.getByCreatorId("mock"), emotes);
        });
    });

    describe('#searchByText', () => {
        it('should return a promise', async () => {
            const stub = sinon.stub(EmoteService, 'searchByText').callsFake((text) => {
                return Promise.resolve(emotes);
            });

            assert.deepStrictEqual(await EmoteController.getAllByName("mock"), emotes);
        });
    });

    describe('#create', () => {
        it('should return a promise', async () => {
            const uploadData = {
                Location: "emotes/mock.png"
            };

            const mockEmote = emotes[0];

            const uploadStub = sinon.stub(S3Controller, 'uploadFile').callsFake((imagePath) => {
                return Promise.resolve(uploadData);
            });

            const createStub = sinon.stub(EmoteService, 'create').callsFake((name, imageKey, tags, creator_id) => {
                return Promise.resolve(mockEmote);
            });
    
            assert.deepStrictEqual(await EmoteController.create({}, mockEmote.name, {}, []), mockEmote);
            S3Controller.uploadFile.restore();
        });

        it('should return rejected promise if upload location is unexpected', async () => {
            const uploadData = {
                Location: "mock"
            }
            const mockEmote = emotes[0];

            const uploadStub = sinon.stub(S3Controller, 'uploadFile').callsFake((imagePath) => {
                return Promise.resolve(uploadData);
            });

            assert.rejects(async () => {
                await EmoteController.create({}, mockEmote.name, {}, [])
            });

            S3Controller.uploadFile.restore();
        });
    });

    describe('#editById', () => {
        it('should return a promise if successful', async () => {
            const emoteOwnerCheckStub = sinon.stub(EmoteUtil, 'checkIfEmoteOwner').callsFake(() => {
                return Promise.resolve(true);
            });

            const editStub = sinon.stub(EmoteService, 'editById').callsFake(() => {
                return Promise.resolve(emotes[0]);
            })

            assert.deepStrictEqual(await EmoteController.editById({}, {}), emotes[0]);

            EmoteUtil.checkIfEmoteOwner.restore();
        });

        it('should return a rejected promise if the request user is not the owner of the emote', () => {
        
            const editStub = sinon.stub(EmoteUtil, 'checkIfEmoteOwner').callsFake(() => {
                return Promise.resolve(false);
            });

            assert.rejects(async () => {
                await EmoteController.editById({}, {})
            });

            EmoteUtil.checkIfEmoteOwner.restore();
        });
    });

    describe('#addTag', () => {
        it('should return a promise if successful', async () => {
            const emoteOwnerCheckStub = sinon.stub(EmoteUtil, 'checkIfEmoteOwner').callsFake(() => {
                return Promise.resolve(true);
            });

            const editStub = sinon.stub(EmoteService, 'addTag').callsFake(() => {
                return Promise.resolve(emotes[0]);
            })

            assert.deepStrictEqual(await EmoteController.addTag({}, {}), emotes[0]);

            EmoteUtil.checkIfEmoteOwner.restore();
        });

        it('should return a rejected promise if the request user is not the owner of the emote', () => {
        
            const editStub = sinon.stub(EmoteUtil, 'checkIfEmoteOwner').callsFake(() => {
                return Promise.resolve(false);
            });

            assert.rejects(async () => {
                await EmoteController.addTag({}, {})
            });

            EmoteUtil.checkIfEmoteOwner.restore();
        });
    });

    describe('#removeTag', () => {
        it('should return a promise if successful', async () => {
            const emoteOwnerCheckStub = sinon.stub(EmoteUtil, 'checkIfEmoteOwner').callsFake(() => {
                return Promise.resolve(true);
            });

            const editStub = sinon.stub(EmoteService, 'removeTag').callsFake(() => {
                return Promise.resolve(emotes[0]);
            })

            assert.deepStrictEqual(await EmoteController.removeTag({}, {}), emotes[0]);

            EmoteUtil.checkIfEmoteOwner.restore();
        });

        it('should return a rejected promise if the request user is not the owner of the emote', () => {
        
            const editStub = sinon.stub(EmoteUtil, 'checkIfEmoteOwner').callsFake(() => {
                return Promise.resolve(false);
            });

            assert.rejects(async () => {
                await EmoteController.removeTag({}, {})
            });

            EmoteUtil.checkIfEmoteOwner.restore();
        });
    });
});



