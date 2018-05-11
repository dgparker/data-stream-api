import * as Express from 'express';
import * as Http from 'http';

import { Router } from './routes/router';

class Server {
  public app;
  public http;
  public router;

  constructor() {
    this.app = Express();
    this.http = new Http.Server(this.app);
    this.router = new Router(this.app, this.http);

    this.bootstrap();
  }

  private bootstrap() {
    this.http.listen(3000, () =>
      console.log('streamer listening on port 3000!')
    );
  }
}

const server = new Server();
