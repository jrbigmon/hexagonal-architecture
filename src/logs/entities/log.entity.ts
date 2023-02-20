export interface DeviceResult {
  type: string;
  brand: string;
  model: string;
}
export interface OperatingSystemResult {
  name: string;
  version: string;
  platform: string;
}
export interface ClientResult {
  type: string;
  name: string;
  version: string;
  engine: string;
  engineVersion: string;
}

export class Log {
  constructor(
    public device: DeviceResult,
    public os: OperatingSystemResult,
    public client: ClientResult,
    public params: string,
    public method: string,
    public message: string,
    public router: string,
    public ip: string,
  ) {}
}
