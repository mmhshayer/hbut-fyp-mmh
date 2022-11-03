import { Controller, Get, Request } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Get('mongo')
  getMongoConnectionStatus() {
    return this.appService.getMongoConnectionStatus();
  }

  @Get('whoami')
  whoami(@Request() req) {
    return this.appService.whoami(req);
  }
}
