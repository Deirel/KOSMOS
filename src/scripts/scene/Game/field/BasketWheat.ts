import { state } from 'scripts/util/global';
import { Basket } from './Basket';

export default class BasketWheat extends Basket {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y);

        this.setTitle('Wheat');
        this.setText(state.value_wheat.value);

        const setText = this.setText.bind(this);

        state.value_wheat.add_observer({
            on_state_update({ value }) {
                setText(value);
            },
        });
    }
}
