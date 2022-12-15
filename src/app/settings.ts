

import { LEDStatus } from './ledstatus';

export interface Settings {
  ledstatus: LEDStatus;
  address: string;
  usedAddresses: string[];
}

export interface DaySetting {
  AlarmTime: string;
  IsActive: boolean;
}

export interface SunriseSettings {
  IsActivated: boolean;
  SunriseLightTime: number;
  Monday: DaySetting;
  Tuesday: DaySetting;
  Wednesday: DaySetting;
  Thursday: DaySetting;
  Friday: DaySetting;
  Saturday: DaySetting;
  Sunday: DaySetting;
}


export interface DeviceSettings {
  IsConfigured: boolean;
  ServerAddress: string;
  SensorID: string;
  WiFiName: string;
  WiFiPassword: string;
  DhtPin: number;
  WindSensorPin: number;
  RainfallSensorPin: number;
  LEDPin: number;
  Button1: number;
  Button2: number;
  NumberOfLEDs: number;
  FindSensors: boolean;
  IsOfflineMode: boolean;
  ShowWebpage: boolean;
  SunriseSettings: SunriseSettings;
}
