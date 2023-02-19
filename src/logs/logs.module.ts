import { LogGatewayHttp } from './gateways/logs-gateways-http';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { LogsService } from './logs.service';

const services = [
  LogsService,
  LogGatewayHttp,
  {
    provide: 'logGatewayHttp',
    useExisting: LogGatewayHttp,
  },
];

@Module({
  providers: services,
  imports: [
    HttpModule.register({
      baseURL: 'http://localhost:4000',
    }),
  ],
  exports: services,
})
export class LogsModule {}
