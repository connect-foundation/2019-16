function readyToSend(client, packet) {
  return (function*() {
    const resolve = yield;

    client.write(packet);
    const data = yield;

    resolve(data);
  })();
}

async function fetchData(packetGenerator) {
  const data = await new Promise(resolve => {
    packetGenerator.next();
    packetGenerator.next(resolve);
  });

  return data;
}

// packetInfo: { method, query, body }
// packet의 params는 포함되지 않으며 2줄 아래에 있는 인자를 따로 넣어줘야함
function resolverLogic(serviceName, packetInfo) {
  return async function(_, params) {
    let tcpClient = nodeInfo[serviceName].socket;

    if (!tcpClient) {
      const { serviceHost, servicePort } = nodeInfo[serviceName];

      tcpClient = new TcpClient(
        serviceHost,
        servicePort,
        () => {},
        payload => {
          packetGenerator.next(payload.body);
        },
        () => {},
        () => {}
      );

      tcpClient.connect();
    }

    const { method, query, body = {} } = packetInfo;
    const packet = await makePacket(
      method, // POST
      query, // login
      params,
      body,
      {
        name: "gateway",
        host: GATE_HOST,
        port: GATE_PORT
      }
    );

    var packetGenerator = readyToSend(tcpClient, packet);
    const data = fetchData(packetGenerator);

    return data;
  };
}

const typeDefs = gql`
  type Query {
  }
  type Mutation {
  }
`;

const resolvers = {
  Query: {},
  Mutation: {
    login: resolverLogic("login", { method: "POST", query: "login" })
  }
};
