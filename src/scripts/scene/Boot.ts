import Sprite from 'assets/atlas.json';
import { SCENES } from '../util/global';
import LoadingProgress from './Boot/LoadingProgress';

export default class Boot extends Phaser.Scene {
    public loader: LoadingProgress;
    constructor() {
        super(SCENES.BOOT);
    }

    public init() {
        this.loader = new LoadingProgress(this);
    }

    public preload() {
        this.loadAtlas();

        this.load.on('progress', (value: number) => this.loadProgress(value));

        this.load.on('complete', () => this.changeScene(SCENES.GAME));
    }

    private loadAtlas() {
        Sprite.forEach(({ key, json, png }) => {
            this.load.atlas(key, png, json);
        });
    }

    private loadProgress(value: number) {
        this.loader.updateProgress(value);
    }

    private changeScene(scene: SCENES) {
        this.time.delayedCall(50, () => {
            this.loader.changeVisible(false);
            this.game.scene.start(scene);
        });
    }
}
