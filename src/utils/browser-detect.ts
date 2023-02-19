import * as DeviceDetector from 'device-detector-js';

export function getBrowser(
  browser: string,
): DeviceDetector.DeviceDetectorResult {
  const deviceDetector = new DeviceDetector();

  const result = deviceDetector.parse(browser);

  return result;
}
