import type { PollenType } from '../constants/PollenInfo';

export type ApiData = {
  speed: number;
  direction: number;
  sugiLevel: number;
  hinokiLevel: number;
  status: string;
};

export type Time = {
  hours: string;
  minutes: string;
  seconds: string;
};

export type Settings = {
  isDemo: boolean;
  demoLevelSugi: number;
  demoLevelHinoki: number;
  pollenType: PollenType;
};

export type PollenTypeInfo = {
  code: string;
  indexInfo?: {
    value: number;
  };
};

export type ErrorType = 'location' | 'api' | 'camera' | null;
