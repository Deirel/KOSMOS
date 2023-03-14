import { COLORS } from 'scripts/util/global';

export interface ConfigCell {
    x: number;
    y: number;
    width: number;
    height: number;
    id: number;
}
export default class Cell extends Phaser.GameObjects.Container {
    private _id: number;
    private _filled: boolean = false;

    constructor(scene: Phaser.Scene, config: ConfigCell) {
        const { x, y, width, height, id } = config;
        super(scene, x, y);

        this.width = width;
        this.height = height;
        this._id = id;

        const rectangle = scene.add
            .rectangle(0, 0, width * 0.9, height * 0.9, COLORS.WHITE)
            .setDepth(-1);

        this.add(rectangle);
    }

    get getId() {
        return this._id;
    }

    get checkChild() {
        return this.getAll().length - 1;
    }

    get filled() {
        return this._filled;
    }

    set filled(value: boolean) {
        this._filled = value;
    }
}
