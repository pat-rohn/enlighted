
import { LEDStatus, LED_OFF } from './ledstatus';

export const DEFAULT_LED_STATUS: LEDStatus = {
  red: 0,
  green: 0,
  blue: 0,
  brightness: 35,
  mode: LED_OFF,
  message: "Not Connected",
}
