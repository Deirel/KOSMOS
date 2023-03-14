import { FIELD_SIZE, SCENES } from '../util/global';
import BasketEgg from './Game/field/BasketEgg';
import BasketMilk from './Game/field/BasketMilk';
import BasketMoney from './Game/field/BasketMoney';
import BasketWheat from './Game/field/BasketWheat';
import Cell from './Game/field/Cell';
import Field, { ConfigField } from './Game/field/Field';
import GameCreator from './Game/GameCreator';

export default class Game extends Phaser.Scene {
    public field: Field;
    public cells: Cell[] = [];
    public playSetting: GameCreator;

    constructor() {
        super(SCENES.GAME);
    }

    public init() {
        this.game.scene.stop(SCENES.BOOT);
    }

    public preload() {
        const { width, height } = this.scale;

        const optionField: ConfigField = {
            x: width * 0.4,
            y: height * 0.5,
            ...FIELD_SIZE,
        };

        this.field = new Field(this, optionField);
        this.cells = this.field.getCells;
    }

    public create() {
        const { width } = this.scale;
        const x = width * 0.9;

        new BasketMoney(this, x, 150);
        new BasketEgg(this, x, 400);
        new BasketWheat(this, x, 650);
        new BasketMilk(this, x, 900);

        new GameCreator(this, this.cells);
    }
}
