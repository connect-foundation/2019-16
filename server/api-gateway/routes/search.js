var express = require('express');
var router = express.Router();

const { makePacket } = require("../../lib/tcp/util");

module.exports = function (apigateway) {

    router.get('/query/:searchWord/:category/:isRecruit', async (req, res, next) => {

        const { searchWord, category, isRecruit } = req.params;

        const packet = makePacket("POST", "searchStudyGroup", { searchWord, category, isRecruit }, {}, req.resKey, apigateway.context);

        req.packet = packet;
        next();
    })

    router.get('/all', async (req, res, next) => {

        const packet = makePacket("POST", "searchAllStudyGroupWithFiltering", { isRecruit: true }, {}, req.resKey, apigateway.context);

        req.packet = packet;
        next();

    })
    return router;
}



