const express = require("express");
const router = express.Router();

const { makePacket } = require("../../../../lib/tcp/util");

module.exports = function (apiGateway) {
    router.post("/joinGroups", (req, res, next) => {
        const joiningGroups = req.body;

        req.packet = makePacket(
            "GET",
            "apigateway",
            "updateJoiningGroups",
            "updateJoiningGroups",
            { ...joiningGroups },
            {},
            req.resKey,
            apiGateway.context
        );

        next();
    });
    router.post("/ownGroups", (req, res, next) => {
        const ownGroups = req.body;

        req.packet = makePacket(
            "GET",
            "apigateway",
            "updateOwnGroups",
            "updateOwnGroups",
            { ...ownGroups },
            {},
            req.resKey,
            apiGateway.context
        );

        next();
    });
    return router;
};
