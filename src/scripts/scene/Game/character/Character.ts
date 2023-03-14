import Cell from '../field/Cell';

type Status = 'wait' | 'process' | 'complete';

type Pointer = Phaser.Input.Pointer;
export type ConfigAnimate = {
    speed: number;
    prefix: string;
    frames: number;
    idle: string;
};

export default class Character extends Phaser.GameObjects.Sprite {
    private config: ConfigAnimate;
    private _status: Status;
    private parent: Cell;

    constructor(scene: Phaser.Scene, parent: Cell, configAnim: ConfigAnimate) {
        super(scene, 0, 0, 'game');

        this.setScale(0.35);
        this.config = configAnim;
        this.parent = parent;
        parent.filled = true;
        parent.add(this);
        this.init();
        this.setEvents();
        this.status = 'wait';
    }

    private init() {
        const { prefix, speed, frames } = this.config;

        this.anims.create({
            key: 'start',
            frames: this.anims.generateFrameNames('game', {
                prefix,
                start: 0,
                end: frames - 1,
            }),
            repeat: 0,
            duration: speed * 1000,
        });

        this.on('animationcomplete', this.completeAnimation, this);
    }

    protected completeAnimation() {
        this.setFrame(`${this.config.prefix}${this.config.frames}`);

        this.status = 'complete';
    }

    private setEvents() {
        this.setInteractive();
        this.scene.input.setDraggable(this);
        this.scene.input.dragTimeThreshold = 100;

        this.on('pointerdown', this.message, this);
        this.on('dragstart', this.dragStart, this);
        this.on('drag', this.drag, this);
        this.on('dragend', this.dragEnd, this);
    }

    private dragStart(pointer: Pointer, t: any, q: any, y: any) {
        this.parent.parentContainer.bringToTop(this);

        this.setScale(this.scale * 1.2);

        this.parent.remove(this.setPosition(pointer.x, pointer.y), false);

        this.parent.filled = false;
    }

    private dragEnd(pointer: Pointer) {
        this.setScale(0.35);

        const cells = this.parent.parentContainer.getAll() as Cell[];
        let newParent: undefined | Cell = undefined;

        cells.forEach((container) => {
            const position = container.getBounds();
            const value = position.contains(pointer.x, pointer.y);

            if (value && container instanceof Cell) newParent = container;
        });

        this.x = 0;
        this.y = 0;

        const instance = newParent instanceof Cell;

        if (!instance || newParent.filled) {
            this.parent.add(this);
            this.parent.filled = true;
            return;
        }

        this.parent = newParent;

        newParent.filled = true;
        newParent.add(this);
    }

    private drag(pointer: Pointer) {
        this.y = pointer.y;
        this.x = pointer.x;
    }

    get status() {
        return this._status;
    }

    set status(status: Status) {
        this._status = status;
    }

    public start() {
        this.scene.anims.play('start', this);
        const { scale } = this;
        const { speed } = this.config;

        const repeat = (speed * 1000) / 800;

        this.scene.tweens.add({
            targets: this,
            scale: { from: scale, to: scale * 0.9 },
            yoyo: true,
            duration: 400,
            repeat,
        });
    }

    protected setIdle() {
        this.setFrame(this.config.idle);
    }

    protected message() {
        if (this.status === 'process') return;
        return;
    }

    protected tween() {
        const { width } = this.scene.scale;

        this.scene.tweens.add({
            targets: this,
            x: { from: this.x, to: width },
            duration: 500,
            scale: { from: this.scale, to: 0 },
            yoyo: true,
        });
    }
}
