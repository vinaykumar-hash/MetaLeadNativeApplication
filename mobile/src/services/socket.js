import { io } from 'socket.io-client';

const BACKEND_URL = 'http://10.0.2.2:3000';

const socket = io(BACKEND_URL, {
  transports: ['websocket'],
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 2000,
  reconnectionDelayMax: 10000,
  timeout: 15000,
});

export default socket;
