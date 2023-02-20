import { Log } from '../entities/log.entity';

export interface LogGatewayInterface {
  create?(log: Log): Promise<Log>;
}
