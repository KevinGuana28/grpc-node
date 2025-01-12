const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync('data.proto', {});
const dataProto = grpc.loadPackageDefinition(packageDefinition).data;

const client = new dataProto.DataService('localhost:50051', grpc.credentials.createInsecure());

client.GetData({}, (error, response) => {
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Datos obtenidos:', response);
  }
});
