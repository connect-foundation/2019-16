require("dotenv").config({ path: ".env.gateway" });
const App = require("../lib/tcp/App");
const { makePacket, makeKey } = require("../lib/tcp/util");

const express = require('express')
const app = express()
const port = 3000



class ApiGateWay extends App {
    constructor() {
        super("apigateway", "127.0.0.1", 8001);
        this.appClientMap = {};
        this.icConnectMap = {};
        this.resMap = {};
    }
}
const apigateway = new ApiGateWay();

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, async () => {



})
