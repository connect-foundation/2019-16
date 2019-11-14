const net = require("net");
const TcpClient = require('./tcpClient');
const {makeKey, makePacket} = require("./util");

const PACKET_SPLITTER = "|";

class TcpServer {
	constructor(name, host, port, query) {
		this.context = {
			name, host, port, query
		};

		this.dataMap = {};
		this.isConnectToDistributor = false;
		this.server = net.createServer(socket => {
			socket.on("data", async(data) => {
				const key = await makeKey(socket);

				let mergedPacket = !this.dataMap[key] ? data.toString() :
					this.dataMap[key].concat(data.toString());

				const packets = mergedPacket.split(PACKET_SPLITTER);

				packets.forEach((packet, index) => {
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

	connectToDistributor() {
		let intervalId;

		console.log(this.isConnectToDistributor);
		this.distributor = new TcpClient("127.0.0.1", 8100, () => {
			this.isConnectToDistributor = true;
			console.log(`${this.context.host}:${this.context.port} is connected to Distributor`);
			const packet = makePacket("POST", "distribute",{},{}, this.context);

			this.distributor.write(packet)
		},
		() => {
			console.log("It is read function at Port:", this.context.port);		
		},
		() => {
			console.error("It is disconnect ");
			this.isConnectToDistributor = false;
		},
		() => {
			console.log("It is Error Situation");
			this.isConnectToDistributor = false;
		});
		this.distributor.connect();
		intervalId = setInterval(() => {
			if(!this.isConnectToDistributor) {
				clearInterval(intervalId);
				this.connectToDistributor();
			}
		}, 3600);
	}
}

module.exports = TcpServer;
