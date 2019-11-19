const TcpServer = require("./TcpServer");

class AppListManager extends TcpServer {
  constructor(name, host, port, query) {
    super(name, host, port, query);
  }
}

module.exports = AppListManager;
