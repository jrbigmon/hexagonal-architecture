import { Log } from '../entities/log.entity';
import { DeviceDetectorResult } from 'device-detector-js';

export interface LogGatewayInterface {
  create?(log: DeviceDetectorResult): Promise<Log>;
}
