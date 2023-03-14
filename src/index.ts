import Phaser from 'phaser';
import 'phaser/plugins/spine/dist/SpinePlugin';
import Boot from 'scripts/scene/Boot';
import Game from 'scripts/scene/Game';
import { COLORS, FPS, HEIGHT, WIDTH } from 'scripts/util/global';

const config = {
    type: Phaser.WEBGL,
    parent: 'phaser-game',
    width: WIDTH,
    height: HEIGHT,
    scene: [Boot, Game],
    scale: {
        parent: 'game-container',
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_VERTICALLY,
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { x: 0, y: 0 },
            fps: FPS,
        },
        render: {
            pixelArt: false,
        },
    },
    plugins: {
        scene: [
            { key: 'SpinePlugin', plugin: window.SpinePlugin, mapping: 'spine' },
            { plugins: Phaser.Loader.LoaderPlugin },
        ],
    },

    autoRound: true,
    desynchronized: true,
    powerPreference: 'high-performance',
    saveDrawingBuffer: true,
    backgroundColor: COLORS.LITE_BLUE,
};
export const game = new Phaser.Game(config);
