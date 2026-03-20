import { POLLEN_LEVEL_TO_COUNT, POLLEN_TYPES } from '../constants/PollenInfo';
import type { ApiData, Settings } from '../types/Type';

type Props = {
  settings: Settings;
  apiData: ApiData;
};

export function usePollenCount({ settings, apiData }: Props) {
  const getDisplayCount = (level: number) => POLLEN_LEVEL_TO_COUNT[level] || 0;

  let displaySugi = 0;
  let displayHinoki = 0;

  if (settings.isDemo) {
    displaySugi = getDisplayCount(settings.demoLevelSugi);
    displayHinoki = getDisplayCount(settings.demoLevelHinoki);
  } else {
    displaySugi = getDisplayCount(apiData.sugiLevel);
    displayHinoki = getDisplayCount(apiData.hinokiLevel);
  }

  if (settings.pollenType === POLLEN_TYPES.SUGI) {
    displayHinoki = 0;
  } else if (settings.pollenType === POLLEN_TYPES.HINOKI) {
    displaySugi = 0;
  }

  return { displaySugi, displayHinoki };
}
