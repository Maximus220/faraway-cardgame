type Wonder = 'stone' | 'chimera' | 'thistle';

type WonderCount = {
  [W in Wonder]?: number;
};

type Biome = 'red' | 'green' | 'blue' | 'yellow' | 'colorless';

type BiomeCombo = {
  region1: Biome;
  region2: Biome;
};

type Fame =
  | number
  | {
      per:
        | 'night'
        | Wonder
        | 'clue'
        | 'colorSet'
        | 'wonderSet'
        | BiomeCombo
        | Biome;
      score: number;
    };

export type Region = {
  number: number;
  biome: Biome;
  night?: true;
  clue?: true;
  wonders?: WonderCount;
  quest?: WonderCount;
  fame?: Fame;
};

export const regions: Region[] = [
  {
    number: 0,
    biome: 'colorless',
    wonders: {
      stone: 1,
      chimera: 1,
      thistle: 1,
    },
  },
  {
    number: 1,
    biome: 'red',
    wonders: {
      stone: 1,
      chimera: 1,
    },
  },
  {
    number: 2,
    biome: 'blue',
    wonders: { stone: 2 },
  },
  {
    number: 3,
    biome: 'green',
    fame: 4,
  },
  {
    number: 4,
    biome: 'red',
    wonders: { stone: 1, chimera: 1 },
  },
  {
    number: 5,
    biome: 'green',
    wonders: { chimera: 1 },
  },
  {
    number: 6,
    biome: 'blue',
    clue: true,
    wonders: {
      stone: 1,
    },
  },
  {
    number: 7,
    biome: 'red',
    wonders: {
      chimera: 1,
      thistle: 1,
    },
  },
  {
    number: 8,
    biome: 'green',
    clue: true,
    wonders: {
      chimera: 1,
    },
  },
  {
    number: 9,
    biome: 'blue',
    fame: 5,
  },
  {
    number: 10,
    biome: 'red',
    fame: {
      per: 'night',
      score: 3,
    },
  },
  {
    number: 11,
    biome: 'green',
    fame: {
      per: 'clue',
      score: 3,
    },
  },
  {
    number: 12,
    biome: 'yellow',
    clue: true,
    wonders: {
      thistle: 1,
    },
  },
  {
    number: 13,
    biome: 'blue',
    fame: {
      per: 'stone',
      score: 2,
    },
  },
  {
    number: 14,
    biome: 'red',
    fame: {
      per: 'night',
      score: 2,
    },
  },
  {
    number: 15,
    biome: 'green',
    clue: true,
    fame: {
      per: 'chimera',
      score: 2,
    },
  },
  {
    number: 16,
    biome: 'red',
    wonders: {
      chimera: 1,
    },
    fame: {
      per: 'chimera',
      score: 2,
    },
  },
  {
    number: 17,
    biome: 'blue',
    wonders: {
      stone: 1,
    },
    quest: {
      chimera: 2,
    },
    fame: {
      per: 'stone',
      score: 3,
    },
  },
  {
    number: 18,
    biome: 'green',
    wonders: {
      chimera: 1,
    },
    fame: {
      per: 'wonderSet',
      score: 10,
    },
  },
  {
    number: 19,
    biome: 'red',
    wonders: {
      thistle: 1,
    },
    fame: {
      per: 'thistle',
      score: 2,
    },
  },
  {
    number: 20,
    biome: 'green',
    night: true,
    clue: true,
    quest: {
      stone: 1,
    },
    fame: {
      per: 'night',
      score: 2,
    },
  },
  {
    number: 21,
    biome: 'blue',
    night: true,
    quest: {
      stone: 2,
    },
    fame: 8,
  },
  {
    number: 22,
    biome: 'green',
    night: true,
    clue: true,
    fame: {
      per: 'clue',
      score: 1,
    },
  },
  {
    number: 23,
    biome: 'red',
    night: true,
    wonders: {
      stone: 1,
      chimera: 1,
    },
    fame: {
      per: 'colorSet',
      score: 10,
    },
  },
  {
    number: 24,
    biome: 'blue',
    night: true,
    wonders: {
      stone: 1,
    },
    quest: {
      chimera: 1,
    },
    fame: {
      per: 'night',
      score: 2,
    },
  },
  {
    number: 25,
    biome: 'yellow',
    night: true,
    fame: {
      per: { region1: 'yellow', region2: 'green' },
      score: 1,
    },
  },
  {
    number: 26,
    biome: 'red',
    night: true,
    wonders: {
      chimera: 1,
    },
    fame: {
      per: 'thistle',
      score: 3,
    },
  },
  {
    number: 27,
    biome: 'yellow',
    night: true,
    fame: {
      per: { region1: 'yellow', region2: 'blue' },
      score: 1,
    },
  },
  {
    number: 28,
    biome: 'red',
    night: true,
    wonders: {
      stone: 1,
    },
    fame: {
      per: 'chimera',
      score: 3,
    },
  },
  {
    number: 29,
    biome: 'yellow',
    night: true,
    wonders: {
      thistle: 1,
    },
    fame: {
      per: 'thistle',
      score: 2,
    },
  },
  {
    number: 30,
    biome: 'red',
    night: true,
    wonders: {
      stone: 1,
    },
    fame: {
      per: 'stone',
      score: 2,
    },
  },
  {
    number: 31,
    biome: 'yellow',
    night: true,
    fame: {
      per: { region1: 'yellow', region2: 'red' },
      score: 1,
    },
  },
  {
    number: 32,
    biome: 'red',
    night: true,
    wonders: {
      stone: 1,
      chimera: 1,
    },
    quest: {
      stone: 3,
    },
    fame: 7,
  },
  {
    number: 33,
    biome: 'yellow',
    night: true,
    clue: true,
    fame: {
      per: 'thistle',
      score: 3,
    },
  },
  {
    number: 34,
    biome: 'green',
    night: true,
    wonders: {
      chimera: 1,
    },
    quest: {
      stone: 2,
    },
    fame: {
      per: 'chimera',
      score: 3,
    },
  },
  {
    number: 35,
    biome: 'yellow',
    night: true,
    wonders: {
      chimera: 1,
    },
    fame: {
      per: 'colorSet',
      score: 10,
    },
  },
  {
    number: 36,
    biome: 'red',
    night: true,
    quest: {
      chimera: 2,
    },
    fame: {
      per: 'thistle',
      score: 4,
    },
  },
  {
    number: 37,
    biome: 'yellow',
    night: true,
    quest: {
      thistle: 1,
    },
    fame: {
      per: 'night',
      score: 3,
    },
  },
  {
    number: 38,
    biome: 'green',
    night: true,
    quest: {
      chimera: 1,
      thistle: 1,
    },
    fame: {
      per: 'clue',
      score: 3,
    },
  },
  {
    number: 39,
    biome: 'red',
    night: true,
    wonders: {
      stone: 1,
      thistle: 1,
    },
    quest: {
      chimera: 2,
    },
    fame: 9,
  },
  {
    number: 40,
    biome: 'blue',
    night: true,
    quest: {
      stone: 1,
      chimera: 1,
      thistle: 1,
    },
    fame: {
      per: 'night',
      score: 10,
    },
  },
  {
    number: 41,
    biome: 'green',
    wonders: {
      thistle: 1,
    },
    quest: {
      stone: 2,
      chimera: 1,
    },
    fame: {
      per: 'night',
      score: 4,
    },
  },
  {
    number: 42,
    biome: 'yellow',
    quest: {
      stone: 1,
      chimera: 1,
    },
    fame: {
      per: { region1: 'yellow', region2: 'green' },
      score: 2,
    },
  },
  {
    number: 43,
    biome: 'blue',
    wonders: {
      stone: 1,
    },
    fame: {
      per: 'colorSet',
      score: 10,
    },
  },
  {
    number: 44,
    biome: 'yellow',
    quest: {
      stone: 1,
      thistle: 1,
    },
    fame: {
      per: { region1: 'yellow', region2: 'blue' },
      score: 2,
    },
  },
  {
    number: 45,
    biome: 'green',
    wonders: {
      stone: 1,
    },
    quest: {
      chimera: 3,
    },
    fame: 13,
  },
  {
    number: 46,
    biome: 'blue',
    clue: true,
    quest: {
      stone: 2,
      chimera: 1,
    },
    fame: 10,
  },
  {
    number: 47,
    biome: 'yellow',
    quest: {
      thistle: 1,
      chimera: 1,
    },
    fame: {
      per: { region1: 'yellow', region2: 'red' },
      score: 2,
    },
  },
  {
    number: 48,
    biome: 'red',
    wonders: {
      chimera: 1,
    },
    fame: {
      per: 'stone',
      score: 3,
    },
  },
  {
    number: 49,
    biome: 'blue',
    clue: true,
    quest: {
      stone: 2,
      thistle: 1,
    },
    fame: 12,
  },
  {
    number: 50,
    biome: 'yellow',
    wonders: {
      stone: 1,
    },
    quest: {
      thistle: 2,
    },
    fame: {
      per: 'green',
      score: 4,
    },
  },
  {
    number: 51,
    biome: 'blue',
    wonders: {
      stone: 1,
    },
    quest: {
      stone: 4,
    },
    fame: 14,
  },
  {
    number: 52,
    biome: 'red',
    quest: {
      stone: 3,
    },
    fame: {
      per: 'chimera',
      score: 4,
    },
  },
  {
    number: 53,
    biome: 'yellow',
    wonders: {
      chimera: 1,
    },
    quest: {
      thistle: 2,
    },
    fame: {
      per: 'red',
      score: 4,
    },
  },
  {
    number: 54,
    biome: 'green',
    wonders: {
      chimera: 1,
    },
    quest: {
      thistle: 2,
    },
    fame: {
      per: 'clue',
      score: 4,
    },
  },
  {
    number: 55,
    biome: 'blue',
    clue: true,
    wonders: {
      stone: 1,
    },
    quest: {
      chimera: 1,
      thistle: 2,
    },
    fame: {
      per: 'thistle',
      score: 3,
    },
  },
  {
    number: 56,
    biome: 'yellow',
    wonders: {
      thistle: 1,
    },
    quest: {
      stone: 1,
      chimera: 2,
    },
    fame: {
      per: 'blue',
      score: 4,
    },
  },
  {
    number: 57,
    biome: 'red',
    quest: {
      thistle: 3,
    },
    fame: {
      per: 'stone',
      score: 4,
    },
  },
  {
    number: 58,
    biome: 'green',
    clue: true,
    quest: {
      chimera: 3,
    },
    fame: {
      per: 'clue',
      score: 3,
    },
  },
  {
    number: 59,
    biome: 'yellow',
    clue: true,
    quest: {
      stone: 1,
      chimera: 3,
    },
    fame: {
      per: { region1: 'yellow', region2: 'red' },
      score: 3,
    },
  },
  {
    number: 60,
    biome: 'blue',
    clue: true,
    quest: {
      stone: 2,
      chimera: 2,
    },
    fame: 16,
  },
  {
    number: 61,
    biome: 'green',
    quest: {
      chimera: 4,
    },
    fame: 17,
  },
  {
    number: 62,
    biome: 'yellow',
    clue: true,
    quest: {
      thistle: 3,
    },
    fame: {
      per: { region1: 'yellow', region2: 'blue' },
      score: 3,
    },
  },
  {
    number: 63,
    biome: 'green',
    clue: true,
    quest: {
      chimera: 2,
      thistle: 1,
    },
    fame: 15,
  },
  {
    number: 64,
    biome: 'blue',
    clue: true,
    quest: {
      stone: 2,
      thistle: 2,
    },
    fame: 18,
  },
  {
    number: 65,
    biome: 'yellow',
    clue: true,
    quest: {
      thistle: 3,
    },
    fame: {
      per: { region1: 'yellow', region2: 'green' },
      score: 3,
    },
  },
  {
    number: 66,
    biome: 'blue',
    quest: {
      stone: 4,
    },
    fame: 20,
  },
  {
    number: 67,
    biome: 'green',
    clue: true,
    quest: {
      chimera: 2,
      thistle: 2,
    },
    fame: 19,
  },
  {
    number: 68,
    biome: 'blue',
    quest: {
      stone: 5,
    },
    fame: 24,
  },
  {
    number: 69,
    biome: 'red',
    clue: true,
    fame: {
      per: 'wonderSet',
      score: 7,
    },
  },
  {
    number: 70,
    clue: true,
    biome: 'colorless',
    fame: 6,
  },
  {
    number: 71,
    biome: 'green',
    wonders: {
      stone: 1,
    },
    fame: {
      per: 'wonderSet',
      score: 7,
    },
  },
  {
    number: 72,
    biome: 'colorless',
    clue: true,
    night: true,
    quest: {
      chimera: 5,
    },
    fame: 26,
  },
  {
    number: 73,
    biome: 'yellow',
    night: true,
    wonders: {
      chimera: 1,
    },
    quest: {
      thistle: 4,
    },
    fame: {
      per: 'colorless',
      score: 5,
    },
  },
  {
    number: 74,
    biome: 'colorless',
    night: true,
    wonders: {
      thistle: 1,
    },
    fame: {
      per: 'wonderSet',
      score: 7,
    },
  },
  {
    number: 75,
    biome: 'blue',
    night: true,
    clue: true,
    quest: {
      stone: 6,
    },
    fame: 28,
  },
  {
    number: 76,
    biome: 'colorless',
    night: true,
    quest: {
      stone: 2,
      chimera: 2,
      thistle: 2,
    },
    fame: {
      per: 'colorless',
      score: 4,
    },
  },
];

export type Sanctuary = {
  tile: number;
  biome: Biome;
  night?: boolean;
  clue?: boolean;
  wonders?: WonderCount;
  fame?: Fame;
};

export const sanctuaries: Sanctuary[] = [
  {
    tile: 1,
    biome: 'green',
    fame: {
      per: 'green',
      score: 1,
    },
  },
  {
    tile: 2,
    biome: 'red',
    fame: {
      per: 'red',
      score: 1,
    },
  },
  {
    tile: 3,
    biome: 'blue',
    fame: {
      per: 'blue',
      score: 1,
    },
  },
  {
    tile: 4,
    biome: 'yellow',
    fame: {
      per: 'yellow',
      score: 1,
    },
  },
  {
    tile: 5,
    biome: 'colorless',
    fame: {
      per: { region1: 'blue', region2: 'yellow' },
      score: 1,
    },
  },
  {
    tile: 6,
    biome: 'colorless',
    fame: {
      per: { region1: 'green', region2: 'red' },
      score: 1,
    },
  },
  {
    tile: 7,
    biome: 'colorless',
    fame: {
      per: { region1: 'red', region2: 'yellow' },
      score: 1,
    },
  },
  {
    tile: 8,
    biome: 'colorless',
    fame: {
      per: { region1: 'yellow', region2: 'green' },
      score: 1,
    },
  },
  {
    tile: 9,
    biome: 'colorless',
    fame: {
      per: { region1: 'green', region2: 'blue' },
      score: 1,
    },
  },
  {
    tile: 10,
    biome: 'colorless',
    fame: {
      per: { region1: 'red', region2: 'blue' },
      score: 1,
    },
  },
  {
    tile: 11,
    biome: 'blue',
    wonders: {
      chimera: 1,
    },
  },
  {
    tile: 12,
    biome: 'blue',
    wonders: {
      stone: 1,
    },
  },
  {
    tile: 13,
    biome: 'blue',
    wonders: {
      thistle: 1,
    },
  },
  {
    tile: 14,
    biome: 'green',
    wonders: {
      chimera: 1,
    },
  },
  {
    tile: 15,
    biome: 'green',
    wonders: {
      stone: 1,
    },
  },
  {
    tile: 16,
    biome: 'green',
    clue: true,
  },
  {
    tile: 17,
    biome: 'red',
    wonders: {
      chimera: 1,
    },
  },
  {
    tile: 18,
    biome: 'red',
    wonders: {
      thistle: 1,
    },
  },
  {
    tile: 19,
    biome: 'red',
    wonders: {
      stone: 1,
    },
  },
  {
    tile: 20,
    biome: 'yellow',
    wonders: {
      stone: 1,
    },
  },
  {
    tile: 21,
    biome: 'yellow',
    clue: true,
  },
  {
    tile: 22,
    biome: 'yellow',
    fame: {
      per: 'colorSet',
      score: 4,
    },
  },
  { tile: 23, biome: 'yellow', fame: { per: 'clue', score: 1 } },
  {
    tile: 24,
    biome: 'colorless',
    fame: 5,
  },
  {
    tile: 25,
    biome: 'blue',
    clue: true,
  },
  {
    tile: 26,
    biome: 'colorless',
    clue: true,
    wonders: {
      stone: 1,
    },
  },
  {
    tile: 27,
    biome: 'colorless',
    clue: true,
    wonders: {
      chimera: 1,
    },
  },
  {
    tile: 28,
    biome: 'colorless',
    clue: true,
    wonders: {
      thistle: 1,
    },
  },
  {
    tile: 29,
    biome: 'colorless',
    fame: {
      per: 'thistle',
      score: 2,
    },
  },
  {
    tile: 30,
    biome: 'colorless',
    fame: {
      per: 'stone',
      score: 2,
    },
  },
  {
    tile: 31,
    biome: 'colorless',
    fame: {
      per: 'chimera',
      score: 2,
    },
  },
  {
    tile: 32,
    biome: 'colorless',
    fame: {
      per: 'clue',
      score: 2,
    },
  },
  {
    tile: 33,
    biome: 'colorless',
    clue: true,
    fame: {
      per: 'colorSet',
      score: 4,
    },
  },
  {
    tile: 34,
    biome: 'green',
    fame: {
      per: 'night',
      score: 1,
    },
  },
  {
    tile: 35,
    biome: 'colorless',
    wonders: {
      stone: 1,
    },
    fame: {
      per: 'night',
      score: 1,
    },
  },
  {
    tile: 36,
    biome: 'colorless',
    wonders: {
      chimera: 1,
    },
    fame: {
      per: 'clue',
      score: 1,
    },
  },
  {
    tile: 37,
    biome: 'colorless',
    wonders: {
      stone: 1,
    },
    fame: {
      per: 'clue',
      score: 1,
    },
  },
  {
    tile: 38,
    biome: 'colorless',
    clue: true,
    fame: {
      per: 'clue',
      score: 1,
    },
  },
  {
    tile: 39,
    biome: 'colorless',
    wonders: {
      stone: 1,
    },
    fame: {
      per: 'stone',
      score: 1,
    },
  },
  {
    tile: 40,
    biome: 'colorless',
    wonders: {
      chimera: 1,
    },
    fame: {
      per: 'chimera',
      score: 1,
    },
  },
  {
    tile: 41,
    biome: 'colorless',
    wonders: {
      thistle: 1,
    },
    fame: {
      per: 'thistle',
      score: 1,
    },
  },
  {
    tile: 42,
    biome: 'red',
    night: true,
  },
  {
    tile: 43,
    biome: 'colorless',
    night: true,
    wonders: {
      stone: 1,
    },
  },
  {
    tile: 44,
    biome: 'colorless',
    night: true,
    wonders: {
      chimera: 1,
    },
  },
  {
    tile: 45,
    biome: 'colorless',
    night: true,
    wonders: {
      thistle: 1,
    },
  },
  // expansion from here and below
  {
    tile: 46,
    biome: 'colorless',
    wonders: {
      stone: 2,
    },
  },
  {
    tile: 47,
    biome: 'colorless',
    clue: true,
    fame: {
      per: 'wonderSet',
      score: 3,
    },
  },
  {
    tile: 48,
    biome: 'colorless',
    wonders: {
      chimera: 1,
    },
    fame: {
      per: 'colorless',
      score: 1,
    },
  },
  {
    tile: 49,
    biome: 'colorless',
    wonders: {
      thistle: 1,
    },
    fame: {
      per: 'colorless',
      score: 1,
    },
  },
  {
    tile: 50,
    biome: 'green',
    fame: {
      per: 'wonderSet',
      score: 3,
    },
  },
  {
    tile: 51,
    biome: 'blue',
    fame: {
      per: 'colorless',
      score: 2,
    },
  },
  {
    tile: 52,
    biome: 'yellow',
    night: true,
    fame: {
      per: 'colorless',
      score: 1,
    },
  },
  {
    tile: 53,
    biome: 'red',
    fame: {
      per: 'wonderSet',
      score: 3,
    },
  },
];
