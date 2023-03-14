import { State } from 'scripts/scene/state/State';

export const FPS = 10;

export const FIELD_SIZE = { verticalCells: 8, horizontalCells: 8 };

export const HANDLE_EVENT = new Phaser.Events.EventEmitter();

export const ELEMENTS = {
    wheat: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    chicken: [10, 11, 12, 13],
    cow: [14, 15, 16, 17, 18, 42],
};

export const IS_DEBUG = process.env.NODE_ENV === 'development' ? true : false;

// Имя типа SCENES может несколько сбить с толку, когда оно фигурирует в объявлении типа, 
// т.к. оно больше похоже на имя коллекции сцен
// Например: loadScene (scene: SCENES)
// SCENE_NAME / SCENE?
//
// То же относится к другим перечислениям
export enum SCENES {
    BOOT = 'Boot',
    GAME = 'Game',
}

export enum EVENTS {
    LOADING = 'loading',
    LOADED = 'loaded',
    START_SCENE = 'start_scene',
    TEST = 'test',
}

export enum COLORS {
    BLUE = 0xfff,
    SALAD = 0xff00,
    BLACK = 0x000,
    ELlOW = 0xffff00,
    LITE_BLUE = 0xffff,
    WHITE = 0xffffff,
}

export const FRAMES = {
    chicken: {
        idle: 'chicken_idle',
        prefix: 'chicken_',
        frames: 3,
    },
    wheat: {
        idle: 'wheat_0',
        prefix: 'wheat_',
        frames: 2,
    },
    cow: {
        idle: 'cow_idle',
        prefix: 'cow_',
        frames: 4,
    },
} as const;

export const WIDTH = 1920;
export const HEIGHT = 1080;
export const CENTER_X = WIDTH / 2;
export const CENTER_Y = HEIGHT / 2;

// Глобальный стейт (создается в начале, доступен из всех сцен)
// Обычно неплохая идея - инжектить стейт внутрь тех модулей, где он нужен, чтобы
// кто попало не мог в него зайти и что-то случайно испортить.
//
// Если реализовать архитектуру через контроллеры доступа к стейту (см. коммент в BasketMilk.ts),
// то как раз удобно прокинуть стейт только в них.
export const state = new State();
