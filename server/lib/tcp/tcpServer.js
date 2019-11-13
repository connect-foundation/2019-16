const net = require("net");
const PACKET_SPLITTER = "|";
// const Client = require('./tcpClient');

class TcpServer {
	constructor(name, host, port, queries = []) {
		this.context = {
			name, host, port, queries
		};

		this.dataMap = {};
		this.server = net.createServer(socket => {
			socket.on("data", data => {
				const key = socket.remoteAddress + socket.remotePort;

				// this.dataMap[key] = !this.dataMap[key] ? data.toString() :
				//     this.dataMap[key].concat(data.toString());
				// let packets = this.dataMap[key].split(PACKET_SPLITTER);
				let mergedPacket = !this.dataMap[key] ? data.toString() :
					this.dataMap[key].concat(data.toString());

				const packets = mergedPacket.split(PACKET_SPLITTER);

				packets.forEach((packet, index) => {
					// if (this.dataMap[key][this.dataMap[key].length - 1] !== PACKET_SPLITTER ||
					//     index === packets.length - 1) {
					// 	this.dataMap[key] = packets[index];
					// 	return;
					// }
					if (mergedPacket[mergedPacket.length - 1] !== PACKET_SPLITTER &&
                        index === packets.length - 1) {
						this.dataMap[key] = packets[index];
						return;
					}
					if (packet === "") {
						return;
					}
					this.onRead(socket, JSON.parse(packet));
				});
			});
		});
		this.server.listen(port, host, () => {
			console.log(`${name} Server Listening!`);
		});
	}
	onRead(socket, data) {
		console.log(JSON.stringify(data));
		socket.write(JSON.stringify(data) + PACKET_SPLITTER);
	}
}

module.exports = TcpServer;
