import { FRAMES, state } from 'scripts/util/global';
import Cell from '../field/Cell';
import Chicken from './Chicken';
import Cow from './Cow';
import { SKIN } from './interface';
import Wheat from './Wheat';

export type TCharacter = Chicken | Cow | Wheat;
export default class FactoryCharacter {
    private scene: Phaser.Scene;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
    }

    public create(name: SKIN, parent: Cell): TCharacter {
        // `if (name === ...)`
        // Стоит избегать подобного хардкода, так как он чреват ошибками и очень плох для расширения.
        // Для унификации создания character'ов подошла бы абстрактная фабрика.
        if (name === 'chicken') {
            const config = {
                ...FRAMES.chicken,
                speed: state.chicken.speed,
            };
            return new Chicken(this.scene, parent, config);
        }

        if (name === 'wheat') {
            const config = {
                ...FRAMES.wheat,
                speed: state.wheat.speed,
            };
            return new Wheat(this.scene, parent, config);
        }

        if (name === 'cow') {
            const config = {
                ...FRAMES.cow,
                speed: state.cow.speed,
            };
            return new Cow(this.scene, parent, config);
        }
    }
}
