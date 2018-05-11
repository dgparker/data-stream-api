export class Simulator {
  private io;

  public running;
  public payloadsDelivered;
  public duration;
  public rate;
  public time;
  public sockets;

  constructor(io, payload) {
    this.io = io;
    this.duration = payload.duration;
    this.rate = payload.rate;
    this.sockets = payload.sockets;
    this.initSimulation();
  }

  private initSimulation() {
    this.payloadsDelivered = 0;

    this.logStart();
    this.startSimulator();
  }

  private startSimulator() {
    const interval = setInterval(() => {
      let randomSocket = Math.floor(Math.random() * this.sockets.length);

      let mockData = this.generateObject(this.sockets[randomSocket]);
      this.io.emit('global', mockData);
      this.payloadsDelivered++;
      console.log(`PAYLOAD DELIVERED ON SOCKET global | ${new Date()}`);

      this.io.emit(this.sockets[randomSocket], mockData);
      console.log(
        `PAYLOAD DELIVERED ON SOCKET ${
          this.sockets[randomSocket]
        } | ${new Date()}`
      );
    }, this.rate);

    this.running = true;

    this.setSimulationEndTime(interval);
  }

  private setSimulationEndTime(interval) {
    setTimeout(() => {
      clearInterval(interval);
      this.running = false;
      this.logStats();
      this.logEnd();
    }, this.duration);
  }

  private logStart() {
    this.time = new Date();

    console.log('');
    console.log('==========');
    console.log(`SIMULATION BEGINNING | ${this.time}`);
    console.log('==========');
    console.log('');
  }

  private logStats() {
    const seconds = this.duration / 1000;
    const averageOrders = this.payloadsDelivered / seconds;

    console.log('');
    console.log('|| Statistics ||');
    console.log('----------------');
    console.log('');
    console.log(`Simulation runtime: ${seconds} seconds`);
    console.log(`Number of payloads simulated: ${this.payloadsDelivered}`);
    console.log(`Average payloads per second: ${averageOrders}`);
  }

  private logEnd() {
    this.time = new Date();

    console.log('');
    console.log('==========');
    console.log(`SIMULATION ENDING | ${this.time}`);
    console.log('==========');
    console.log('');
  }

  private generateObject(mockSocket) {
    return { total: '25', socket: mockSocket, items: ['sandy', 'soup'] };
  }
}
