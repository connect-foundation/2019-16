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

  onRead(socket, data){
    const key = makeKey(socket.remoteAddress + socket.remotePort);
    const { method, query } = data;
  
    if(query !== "distribute"){
      return
    }
    let packet;
  
    switch (method) {
      case "GET" : 
      packet = makePacket("POST", "nodes",{},{nodeList},this.context);
      this.send(socket, packet)
        break;
      case "POST" : 
      nodeList[key] = {};
      nodeList[key].socket = socket;
      nodeList[key].info = data.info;
      packet = makePacket("POST", "nodes", {}, {nodeList}, this.context);
        break;
      case "DELETE" : 
      delete nodeList[key];
      packet = makePacket("POST", "nodes",{},{nodeList},this.context);
        break;
      default:
        break;
    }
  
  }
}

module.exports = Distributor;