import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class AppService {
  constructor(@InjectConnection() private connection: Connection) {}

  getData(): { message: string } {
    return { message: 'Welcome to backend!' };
  }

  async getMongoConnectionStatus() {
    const connection = await this.connection.readyState;
    const options = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting',
      99: 'uninitialized',
    };
    return { mongoStatus: options[connection] };
  }

  whoami(req) {
    return req.user;
  }
}
