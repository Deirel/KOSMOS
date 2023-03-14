import { state } from 'scripts/util/global';
import { BasketSell } from './Basket';

export default class BasketMilk extends BasketSell {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y);

        this.setTitle('Milk');
        this.setText(state.value_milk.value);

        const setText = this.setText.bind(this);

        state.value_milk.add_observer({
            on_state_update({ value }) {
                setText(value);
            },
        });
    }

    protected message() {
        super.message();

        if (state.value_milk.value === 0) return;

        const money = state.value_milk.value * state.cow.price;
        state.value_milk.value = 0;
        this.setText(state.value_milk.value);
        state.value_money.value = state.value_money.value += money;
    }
}
