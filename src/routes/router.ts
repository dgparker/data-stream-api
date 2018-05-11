import * as Path from 'path';
import { SocketHandler } from '../sockets/socket-handler';

export class Router {
  private path;
  public http;
  public socketHandler;

  constructor(app, http) {
    this.path = Path;
    this.http = http;
    this.socketHandler = new SocketHandler(this.http);
    this.mountRoutes(app);
  }

  private mountRoutes(app) {
    app.get('/', (req, res) => res.send('streamer'));

    app.get('/streamer', (req, res) => {
      res.sendStatus(200);
      const payload = JSON.parse(req.get('payload'));
      this.socketHandler.handlePayload(payload);
    });

    app.get('/simulator', (req, res) => {
      res.sendStatus(200);
      const payload = JSON.parse(req.get('options'));
      this.socketHandler.handlePayload(payload, true);
    });
  }
}
