const net = require("net");
const PACKET_SPLITTER = "|";

class TcpClient {
	constructor(host, port, onCreate, onRead, onEnd, onError) {
		this.options = {
			host, port
		};
		this.onCreate = onCreate;
		this.onRead = onRead;
		this.onEnd = onEnd;
		this.onError = onError;

		
	}
	connect(){
		this.client = net.connect(this.options, ()=>{
			console.log(`connet to ${this.options.host} : ${this.options.port}`);
		});
		registEvent.bind(this)()
	}
	write(data) {
		this.client.write(JSON.stringify(data) + PACKET_SPLITTER);
	}
}

function registEvent(){

	this.client.on("data", (data)=>{
		// this.data = !this.data ? data.toString() :
		// 	this.data.concat(data.toString());

		// let packet = this.data.split(PACKET_SPLITTER);

		let mergedPacket = !this.data ? data.toString() :
					this.data.concat(data.toString());

				const packets = mergedPacket.split(PACKET_SPLITTER);


		packets.forEach((packet, index) => {
			if (mergedPacket[mergedPacket.length - 1] !== PACKET_SPLITTER && index === packets.length - 1) {
				mergedPacket = packets[index];
				return;
			}
			if (packet === "") {
				return;
			}
			this.onRead(JSON.parse(packet));
		});
	});

	this.client.on("end", ()=>{
		this.onEnd();
	});
	this.client.on("error", ()=>{
		this.onError();
	});
}



module.exports = TcpClient;
