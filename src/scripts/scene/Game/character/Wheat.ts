import { state } from 'scripts/util/global';
import Cell from '../field/Cell';
import Character, { ConfigAnimate } from './Character';
import { SKIN } from './interface';

export default class Wheat extends Character {
    constructor(scene: Phaser.Scene, parent: Cell, config: ConfigAnimate) {
        super(scene, parent, config);

        this.name = SKIN.WHEAT;
        this.start();
    }

    protected message(): void {
        super.message();

        // У пшеницы нет стейта `process`. Это не очевидно на фоне того, как работают коровы и курицы.
        if (this.status !== 'complete') return;

        this.status = 'wait';
        state.value_wheat.value += state.wheat.value_sum;

        this.tween();
        this.start();
    }
}
