import { state } from 'scripts/util/global';
import Cell from '../field/Cell';
import Character, { ConfigAnimate } from './Character';
import { SKIN } from './interface';

export default class Chicken extends Character {
    constructor(scene: Phaser.Scene, parent: Cell, config: ConfigAnimate) {
        super(scene, parent, config);

        this.name = SKIN.CHICKEN;
        this.status = 'wait';
        this.setIdle();
    }

    protected message(): void {
        super.message();

        if (this.status === 'process') return;

        if (this.status === 'complete') {
            this.tween();
            state.value_egg.value += state.chicken.value_sum;
            // Похоже, что анимация привязана к статусу:
            //     'wait' => setIdle(),
            //     'process' => start(),
            //     'complete' => последний кадр
            // 
            // При этом нигде не гарантируется такая связь. Это значит, что
            // можно установить стейт без анимации, и наоборот.
            // Потенциально это может привести к багам отсутствующей анимации, если кто-то забудет дописать ее вызов.
            // 
            // Предложение - перенести всю логику работы с состояниями в базовый класс, оставив в наследниках только
            // отличающиеся детали.
            this.setIdle();
            this.status = 'wait';
            return;
        }

        // Те же замечания, что в классах Basket*
        const have = state.value_wheat.value;
        const need = state.chicken.need;

        if (have < need) return;

        state.value_wheat.value -= need;
        this.status = 'process';

        this.start();
    }
}
