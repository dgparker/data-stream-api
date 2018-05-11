import * as io from 'socket.io';
import { Simulator } from './simulator/simulator';

export class SocketHandler {
  public io;
  private simulator;

  constructor(http) {
    this.io = io(http);
    this.initializeSockets(this.io);
  }

  private initializeSockets(io) {
    io.on('connection', socket => {
      console.log('a user connected');
      socket.on('disconnect', () => console.log('a user disconnected'));
    });
  }

  public handlePayload(payload, simulate?) {
    if (simulate) {
      this.simulator = new Simulator(this.io, payload);
    } else {
      this.distributePayload(payload);
    }
  }

  public distributePayload(payload) {
    this.io.emit('global', payload);

    this.io.emit(payload.socket, payload);
  }
}
