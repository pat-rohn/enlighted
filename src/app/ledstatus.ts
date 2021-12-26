
export enum LEDMode {
  on = 1,
  off,
  campfire,
  colorful,
  autochange,
  pulse,
}


export interface LabeledLedMode {
  label: string;
  id: LEDMode
}


export interface LEDStatus {
  red: number;
  green: number;
  blue: number;
  brightness: number;
  mode: LabeledLedMode;
  message: string;
}

export const LED_ON: LabeledLedMode = { label: "on", id: LEDMode.on };
export const LED_OFF: LabeledLedMode = { label: "off", id: LEDMode.off };
export const LED_CAMPFIRE: LabeledLedMode = { label: "campfire", id: LEDMode.campfire };
export const LED_COLORS: LabeledLedMode = { label: "colorful", id: LEDMode.colorful };
export const LED_AUTOCHANGE: LabeledLedMode = { label: "autochange", id: LEDMode.autochange };
export const LED_PULSE: LabeledLedMode = { label: "pulse", id: LEDMode.pulse };

