const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const config = require('./config');
const healthRouter = require('./routes/health');
const webhookRouter = require('./routes/webhook');
const socketService = require('./services/socketService');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/health', healthRouter);
app.use('/webhook', webhookRouter);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

socketService.init(io);

server.listen(config.port, () => {
  console.log(`Server started on port ${config.port}`);
});
