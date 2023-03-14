import Cell, { ConfigCell } from './Cell';

export interface ConfigField {
    x: number;
    y: number;
    verticalCells: number;
    horizontalCells: number;
}

const SIZE_FIELD = {
    width: 1000,
    height: 1000,
};

export default class Field extends Phaser.GameObjects.Container {
    private verticalCells: number;
    private horizontalCells: number;
    private content: Phaser.GameObjects.GameObject[] = [];

    constructor(scene: Phaser.Scene, configField: ConfigField) {
        const { x, y, verticalCells, horizontalCells } = configField;
        super(scene, x, y);
        this.verticalCells = verticalCells;
        this.horizontalCells = horizontalCells;
        this.scene = scene;
        this.width = SIZE_FIELD.width;
        this.height = SIZE_FIELD.height;

        this.add(this.scene.add.rectangle(0, 0, this.width, this.height, 0x000));

        this.createCells();

        scene.add.existing(this);
    }

    private createCells() {
        const { width, height, horizontalCells, verticalCells, scene } = this;
        const sumCell = horizontalCells * verticalCells;
        const widthCell = width / horizontalCells;
        const heightCell = height / verticalCells;

        const start_x = width / 2;
        const start_y = height / 2;

        let step_x = 0;
        let step_y = 0;
        let id = 0;

        for (let i = 0; i <= sumCell - 1; i++) {
            if (step_x % horizontalCells === 0 && !!step_x) {
                step_x = 0;
                step_y += 1;
            }

            const distance_x = -start_x + widthCell / 2 + widthCell * step_x;

            const distance_y = -start_y + heightCell / 2 + heightCell * step_y;

            const config: ConfigCell = {
                x: distance_x,
                y: distance_y,
                width: widthCell,
                height: heightCell,
                id,
            };

            const container = new Cell(scene, config);

            id++;

            this.content.push(container);

            this.add(container);

            step_x += 1;
        }
    }

    get getCells(): Cell[] {
        return this.content as Cell[];
    }
}
