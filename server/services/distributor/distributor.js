const TcpServer = require("../../lib/tcp/tcpServer");
const TcpClient = require("../../lib/tcp/tcpClient");
const {makeKey, makePacket} = require("../../lib/tcp/util");

let instance;
const nodeList = {};

class Distributor extends TcpServer{
  constructor(){
    if(instance) return instance;
    super("distributor", "127.0.0.1", 8100, "distribute");
    instance = this;
  }
}

module.exports = Distributor;