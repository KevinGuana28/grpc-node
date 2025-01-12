const express = require('express');
const cors = require('cors'); // Importa el middleware CORS
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

// Cargar el archivo .proto
const packageDefinition = protoLoader.loadSync('data.proto', {});
const dataProto = grpc.loadPackageDefinition(packageDefinition).data;

// Configurar el servidor HTTP
const app = express();
const port = 3000;

app.use(cors()); // Habilita CORS para todas las rutas

app.get('/api/data', (req, res) => {
  const client = new dataProto.DataService('localhost:50051', grpc.credentials.createInsecure());

  client.GetData({}, (error, response) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.json(response);
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor HTTP escuchando en http://localhost:${port}`);
});
