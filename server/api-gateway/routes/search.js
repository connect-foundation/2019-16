var express = require('express');
var router = express.Router();

const { makePacket, makeKey } = require("../../lib/tcp/util");

module.exports = function (apigateway) {

    router.get('/', async (req, res) => {
        res.send("hello search")
    })

    router.get('/all', async (req, res) => {
        const key = await makeKey(req.client);
        const packet = makePacket("POST", "searchAllStudyGroupWithFiltering", { isRecruit: true }, {}, key, apigateway.context);

        apigateway.resMap[key] = res;
        apigateway.appClientMap["search"].write(packet);
    })

    router.get('/all2', async (req, res) => {
        const key = await makeKey(req.client);
        const packet = makePacket("POST", "searchAllStudyGroupWithFiltering2", { isRecruit: true }, {}, key, apigateway.context);

        apigateway.resMap[key] = res;
        apigateway.appClientMap["search2"].write(packet);
    });

    router.get('/:searchWord', async (req, res) => {

        const searchWord = req.params.searchWord;
        const key = await makeKey(req.client);
        const packet = makePacket("POST", "searchStudyGroup", { searchWord, isRecruit: true }, {}, key, apigateway.context);

        apigateway.resMap[key] = res;
        apigateway.appClientMap["search"].write(packet);
    })

    return router;
}



