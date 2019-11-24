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

let searchRouter = require("./routes/search")(apigateway)

app.get('/', (req, res) => res.send('Hello World!'));

app.use('/search', searchRouter);

app.listen(port, async () => {

    makeAppClient("search");
    makeAppClient("search2");

})

async function makeAppClient(name) {
    const client = await apigateway.connectToApp(name,
        () => {
            apigateway.appClientMap[name] = client;
            apigateway.icConnectMap[name] = true;
            console.log(`${name} service connect`)
        },
        (data) => {
            apigateway.resMap[data.key].json(data.body.studygroups);
            delete apigateway.resMap[data.key];
        },
        () => {
            apigateway.icConnectMap[name] = false;
            console.log(`${name} service end`)
        },
        () => {
            apigateway.icConnectMap[name] = false;
            console.log(`${name} service error`)
        }
    );

    setInterval(() => {
        if (!apigateway.icConnectMap[name]) {
            console.log(`try connect to search2`);
            client.connect();
        }
    }, 2000);

    return client;
}
