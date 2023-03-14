import { state } from 'scripts/util/global';
import { Basket } from './Basket';

export default class BasketMoney extends Basket {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y);

        this.setTitle('Money');
        this.setText(state.value_money.value);

        const setText = this.setText.bind(this);

        state.value_money.add_observer({
            on_state_update({ value }) {
                setText(value);
            },
        });
    }
}
