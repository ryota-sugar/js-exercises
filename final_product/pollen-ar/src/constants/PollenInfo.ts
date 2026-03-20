export const POLLEN_LEVEL_TO_COUNT = [0, 50, 200, 500, 1000, 2000];

export const POLLEN_TYPES = {
  BOTH: 'both',
  SUGI: 'sugi',
  HINOKI: 'hinoki',
} as const;

export type PollenType = (typeof POLLEN_TYPES)[keyof typeof POLLEN_TYPES];

// 表示エリアのサイズ
export const AR_AREA_SIZE = 40;

// 風の影響度
export const WIND_INFLUENCE_SCALE = 0.1;
export const WIND_ANIMATION_SPEED = 5;

// 花粉のスケール範囲
export const PARTICLE_SCALE_MIN = 0.05;
export const PARTICLE_SCALE_MAX = 0.1;

// 花粉の回転スピードの範囲
export const SPIN_SPEED_MIN = 1;
export const SPIN_SPEED_MAX = 3;

// 花粉の落下速度
export const FALL_SPEED = 0.5;

// 風による上下の揺らぎの係数
export const WIND_FLUTTER_FACTOR = 0.005;
