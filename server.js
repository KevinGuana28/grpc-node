const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync('data.proto', {});
const dataProto = grpc.loadPackageDefinition(packageDefinition).data;

const server = new grpc.Server();

server.addService(dataProto.DataService.service, {
  GetData: (call, callback) => {
    const response = {
      id: 1,
      name: 'Ejemplo de datos',
      description: 'Esto es un ejemplo de datos para una gRPC API.'
    };
    callback(null, response);
  }
});

server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
  console.log('Servidor gRPC escuchando en http://localhost:50051');
  server.start();
});
