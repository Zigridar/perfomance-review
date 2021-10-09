import {Server} from 'socket.io';
import socketEvents from './socketEvents';

/**
 * Controller of socket events
 * */
const socketController = (io: Server) => {
  io.on(socketEvents.connect, async (socket) => {
    //todo socket messages
  });
};

export default socketController;
