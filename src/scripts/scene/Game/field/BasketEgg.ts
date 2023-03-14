import { state } from 'scripts/util/global';
import { BasketSell } from './Basket';

export default class BasketEgg extends BasketSell {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y);

        this.setTitle('Egg');
        this.setText(state.value_egg.value);

        const setText = this.setText.bind(this);

        state.value_egg.add_observer({
            on_state_update({ value }) {
                setText(value);
            },
        });
    }

    protected message() {
        super.message();

        if (state.value_egg.value === 0) return;

        const money = state.value_egg.value * state.chicken.price;
        state.value_egg.value = 0;
        this.setText(state.value_egg.value);
        state.value_money.value = state.value_money.value += money;
    }
}
