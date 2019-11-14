const TcpServer = require("../../lib/tcp/tcpServer");
const TcpClient = require("../../lib/tcp/tcpClient");
const {makeKey, makePacket} = require("../../lib/tcp/util");
const logger = require("../logger/logger")
let distributorInstance;
const nodeList = {};

class Distributor extends TcpServer{
  constructor(){
    if(distributorInstance) return distributorInstance;
    super("distributor", "127.0.0.1", 8100, "distribute");
    distributorInstance = this;
  }

  async onRead(socket, data){
    const key = await makeKey(socket);
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
      this.broadCast(packet);
        break;
      case "DELETE" : 
      delete nodeList[key];
      packet = makePacket("POST", "nodes",{},{nodeList},this.context);
      this.broadCast(packet);
        break;
      default:
        break;
    }
  }
  send(socket, packet){
    socket.write(packet);
  }
  broadCast(packet){
    for(let nodeKey in nodeList){
      nodeList[nodeKey].socket.write(packet);
    }
  }

  printNodeList(){
    for(let nodeKey in nodeList){
      logger.info(JSON.stringify(nodeList[nodeKey].info));
    }
  }
}

module.exports = Distributor;